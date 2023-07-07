import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { FormControl, FormGroup } from '@angular/forms';
import { PostsService } from './posts.service';
import {combineLatest} from 'rxjs';
import {AdapterService} from '../../adapter.service';
import {post} from 'selenium-webdriver/http';

@Component({
  selector: 'app-posts',
  templateUrl: './posts.component.html',
  styleUrls: ['./posts.component.css']
})
export class PostsComponent implements OnInit {
  accountName: string;
  img: string;
  avatar: string;
  postsList: Object[];
  postsList_dummy: Object[];
  formPost;
  postFormControl;

  postArea:string = '';
  constructor(private http: HttpClient, private postService: PostsService, private adapterService: AdapterService) { }

  ngOnInit() {
    this.http.get('https://nubook-liun1.herokuapp.com/accountname', {withCredentials: true}).subscribe( response => {
      localStorage.setItem("accountName", response['accountName']);

      if (localStorage.getItem("accountName") !== null) {
        this.accountName = localStorage.getItem("accountName");
      }

      this.loadPosts();

      /** get avatar from db **/
      // this.avatar = "https://tomli.blog/wp-content/plugins/stronger-github-widget//img/octocat_big.png";
      this.http.get('https://nubook-liun1.herokuapp.com/avatar/' + this.accountName, {withCredentials: true}).subscribe(response => {
        this.avatar = response['avatar'][0]['avatar'];
      });

      // console.log(this.postsList);

      // this.postService.getPostJson().subscribe(response => {
      //   this.postsList = response['articles'];
      //   this.postsList_dummy = this.postsList;
      // });
      //
      // this.postService.getPostJson().subscribe(response => {
      //   this.adapterService.setPostsList(response['articles']);
      // });


    });

    this.postFormControl = new FormControl();
    this.formPost = new FormGroup({
      postControl : this.postFormControl
    });

    // setInterval(() => {
    //   if (this.adapterService.shouldUpdatePosts === true) {
    //     console.log('hi');
    //     for (var i = 0; i < 10; i ++) {
    //       this.loadPosts();
    //     }
    //     this.adapterService.shouldUpdatePosts = false;
    //   }
    // }, 100);
    setInterval(() => { this.updatePostList(); }, 100);
    // setInterval(this.f(), 1000);
  }

  /** get posts list from db and sort by date **/
  loadPosts() {
    this.http.get('https://nubook-liun1.herokuapp.com/articles/' + this.accountName, {withCredentials: true}).subscribe(response => {
      this.postsList = response['articles'];
      this.postsList.forEach(post => {
        post['editable'] = false;

        post['comments'].forEach(comment => {
          comment['editable'] = false;
        });
      });
      console.log(this.postsList);
      this.adapterService.setPostsList(this.postsList);
    });

    // this.http.get('https://nubook-liun1.herokuapp.com/following/' + this.accountName, {withCredentials: true}).subscribe(response => {
    //   var temp = [];
    //   response['following'].forEach(following => {
    //     this.http.get('https://nubook-liun1.herokuapp.com/articles/' + following, {withCredentials: true}).subscribe(response_post => {
    //       temp = this.postService.loadPosts(response_post['articles'], temp);
    //       this.postsList = temp;
    //       this.sort();
    //       /** save posts list to cache **/
    //       this.adapterService.setPostsList(this.postsList);
    //     });
    //   });
    //
    // });
  }

  /** sort posts by time **/
  sort() {
    this.postsList.sort(function (post1, post2) {
      return (post1['date'] < post2['date']) ? 1 : -1;
    });
  }

  /** Add new post, including author, avatar, time, content **/
  addPosts() {
    this.postService.addPosts(this.accountName, this.avatar, this.img, this.formPost.value.postControl, this.postsList).subscribe( response => {
      this.loadPosts();
    });

    /** Clear the textarea after posting **/
    this.postArea = '';
  }

  /** Search posts by arthor or content **/
  search(keyWord) {
    this.postsList_dummy = this.postsList;
    this.postService.search(keyWord, this.postsList, this.postsList_dummy);
  }

  updatePostList() {
    if (this.adapterService.afterSearch) {
      this.postsList = this.adapterService.getSearchPostsList();
    } else {
      this.postsList = this.adapterService.getPostsList();
    }
  }

  postImg(event:any) {
    if (event.target.files && event.target.files[0]) {
      var reader = new FileReader();
      reader.onload = (event:any) => {
        var result = event.target.result;
        this.postService.postImg(result).subscribe(response => {
          this.img = response['url'];
        });
      };
      console.log(event.target.files[0]);
      reader.readAsDataURL(event.target.files[0]);
    }
  }

  can_edit(article) {
    article['editable'] = true;
  }

  submit_edit_post(article, text) {
    article['editable'] = false;
    const body = {_id: article._id, text: text};
    this.http.put('https://nubook-liun1.herokuapp.com/articles/' + article._id, body, {withCredentials: true}).subscribe(response => {});
  }

  post_comment(article, text) {
    const body = {commentId: -1, text: text};
    console.log(body);
    console.log(article);
    this.http.put('https://nubook-liun1.herokuapp.com/articles/' + article._id, body, {withCredentials: true}).subscribe(response => {
      this.loadPosts();
    });
  }

  can_edit_comment(comment) {
    comment['editable'] = true;
  }

  submit_edit_comment(commentId, article, comment, text) {
    comment['editable'] = false;
    const body = {commentId: commentId, text: text};
    this.http.put('https://nubook-liun1.herokuapp.com/articles/' + article._id, body, {withCredentials: true}).subscribe(response => {
      this.loadPosts();
    });
  }
}
