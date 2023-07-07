import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { FollowingService } from './following.service';
import {FormGroup} from '@angular/forms';
import {AdapterService} from '../../adapter.service';
import {PostsService} from '../posts/posts.service';

@Component({
  selector: 'app-following',
  templateUrl: './following.component.html',
  styleUrls: ['./following.component.css']
})
export class FollowingComponent implements OnInit {
  constructor(private http: HttpClient, private followingService: FollowingService, private adapterService: AdapterService, private postService: PostsService) { }
  accountName: string;
  followersList: Object[] = [];
  registeredUserList: string[];
  postsList: string[] = [];

  formAddfollower;
  followernameFormControl;

  addfollower_clear:string = '';

  ngOnInit() {
    this.http.get('https://nubook-liun1.herokuapp.com/accountname', {withCredentials: true}).subscribe( response => {
      localStorage.setItem("accountName", response['accountName']);

      if (localStorage.getItem("accountName") !== null) {
        this.accountName = localStorage.getItem("accountName");
      }

      this.loadFollower();

      // this.followingService.getFollowerJson().subscribe(response => {
      //   this.followersList = response['followers'];
      // });
      // this.followingService.getFollowerJson().subscribe(response => {
      //   this.adapter.setFollowersList(response['followers']);
      // });
      // this.followingService.getRegisteredJson().subscribe(response => {this.registeredUserList = response['registered_user']});
      // this.followingService.getPostJson().subscribe(response => {this.postsList = response['articles']});
    });

    this.followernameFormControl = this.followingService.getFollowernameControl();
    this.formAddfollower = new FormGroup({
      followernameControl: this.followernameFormControl
    });

  }

  loadFollower() {
    this.http.get('https://nubook-liun1.herokuapp.com/following/' + this.accountName, {withCredentials: true}).subscribe(response => {
      var following = response['following'].join(',');
      if (following === null || following === "") {
        this.followersList = [];
      }
      else {
        this.http.get('https://nubook-liun1.herokuapp.com/avatar/' + following, {withCredentials: true}).subscribe(response_avatar => {
          this.http.get('https://nubook-liun1.herokuapp.com/headlines/' + following, {withCredentials: true}).subscribe(response_headline => {
            this.followersList = this.followingService.makeFollowerList(response_avatar['avatar'], response_headline['headline']);
          });
        });
      }
    });
  }

  checkFollower() {
    return this.followingService.checkFollower(this.formAddfollower.value.followernameControl, this.followersList);
  }

  /** Add new follower **/
  addFollower() {
    this.followingService.addFollower(this.accountName, this.formAddfollower.value.followernameControl, this.followersList).subscribe(response => {
      if (response['status'] === 404) {
        return;
      }

      var user2Add = this.formAddfollower.value.followernameControl;
      var follower = {};
      follower['accountName'] = user2Add;
      this.http.get('https://nubook-liun1.herokuapp.com/avatar/' + user2Add, {withCredentials: true}).subscribe(response => {
        follower['avatar'] = response['avatar'][0]['avatar'];
      });

      this.http.get('https://nubook-liun1.herokuapp.com/headlines/' + user2Add, {withCredentials: true}).subscribe(response => {
        follower['headline'] = response['headline'][0]['headline'];
      });
      this.followersList.push(follower);

      this.loadFollower();

      /** reload articles **/
      this.http.get('https://nubook-liun1.herokuapp.com/articles/' + this.accountName, {withCredentials: true}).subscribe(response => {
        this.postsList = response['articles'];
        this.postsList.forEach(post => {
          post['editable'] = false;
          post['comments'].forEach(comment => {
            comment['editable'] = false;
          });
        });
        this.adapterService.setPostsList(this.postsList);
      });
    });

    /** Clear input area after adding follower **/
    this.addfollower_clear = '';
  }

  /** sort posts by time **/
  sort() {
    this.postsList.sort(function (post1, post2) {
      return (post1['date'] < post2['date']) ? 1 : -1;
    });
  }

  /** Delete follower from followerList **/
  removeFollower(user2Delete) {
    this.followingService.removeFollower(this.accountName, user2Delete, this.followersList).subscribe(response => {
      this.loadFollower();
    });

    /** update post list cache **/
    var postsList = this.adapterService.getPostsList();
    for (var i = 0; i < postsList.length; ) {
      if (postsList[i]['author'] === user2Delete) {
        postsList.splice(i, 1);
      } else {
        i ++;
      }
    }
    this.adapterService.setPostsList(postsList);

    // this.adapter.shouldUpdatePosts = true;
  }

}
