import { Injectable } from '@angular/core';
import {FormControl} from '@angular/forms';
import { HttpClient } from '@angular/common/http';
import {AdapterService} from '../../adapter.service';

@Injectable({
  providedIn: 'root'
})
export class FollowingService {
  followernameFormControl = new FormControl('', []);
  postsList: string[] = [];

  constructor(private http: HttpClient, private adapterService: AdapterService) { }
  getFollowernameControl() {
    return this.followernameFormControl;
  }

  getFollowerJson() {
    return this.http.get('assets/follower.json');
  }

  getRegisteredJson() {
    return this.http.get('assets/registered_user.json');
  }

  getPostJson() {
    return this.http.get('assets/articles.json');
  }

  makeFollowerList(avatars, headlines) {
    var followerList = [];
    for (var i = 0 ; i < avatars.length; i ++) {
      var follower = {};
      follower['accountName'] = avatars[i]['accountName'];
      follower['avatar'] = avatars[i]['avatar'];
      follower['headline'] = headlines[i]['headline'];
      followerList.push(follower);
    }
    return followerList;
  }

  checkFollower(name, followersList) {
    if (name === "") return true;
    if (followersList == null) return true;

    /** check if to-be-added user already exists in followersList **/
    for (var i = 0; i < followersList.length; i++) {
      if (followersList[i]['accountName'] === name)
        return false;
    }

    return true;
  }

  addFollower(accountName, user2Add, followersList) {
    if (!this.checkFollower(user2Add, followersList)) {
      return;
    }
    if (user2Add === null || user2Add === "") {
      return ;
    }

    // var follower = {};
    // follower['accountName'] = user2Add;
    // this.http.get('https://nubook-liun1.herokuapp.com/avatar/' + user2Add, {withCredentials: true}).subscribe(response => {
    //   follower['avatar'] = response['avatar'][0]['avatar'];
    // });
    //
    // this.http.get('https://nubook-liun1.herokuapp.com/headlines/' + user2Add, {withCredentials: true}).subscribe(response => {
    //   follower['headline'] = response['headline'][0]['headline'];
    // });
    // followersList.push(follower);

    return this.http.put('https://nubook-liun1.herokuapp.com/following/' + user2Add + ',' + accountName, {}, {withCredentials: true});
  }

  removeFollower(accountName, user2Delete, followersList) {
    for (var i = 0; i < followersList.length; i++) {
      if (followersList[i]['accountName'] === name) {
        if (followersList.length === 1) {
          followersList = [];
        }
        else {
          followersList.splice(i, 1);
        }
        break;
      }
    }

    return this.http.delete('https://nubook-liun1.herokuapp.com/following/' + user2Delete + ',' + accountName, {withCredentials: true});

    // var postsList = this.adapterService.getPostsList();
    // for (var i = 0; i < postsList.length;) {
    //   if (postsList[i]['author'] === name) {
    //     postsList.splice(i, 1);
    //     this.adapterService.afterSearch = false;
    //   }
    //   else {
    //     i++;
    //   }
    // }
    // this.adapterService.setPostsList(postsList);

  }
}
