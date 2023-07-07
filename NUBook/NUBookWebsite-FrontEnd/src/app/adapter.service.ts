import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})

/** This service is used to store profile info as Json string. **/
export class AdapterService {
  shouldUpdatePosts = false;
  shouldUpdateFollowers = false;
  userLogin = "";
  jsonStr: string;
  postsList: string[] = [];
  followersList: string[];
  searchPostsList: string[] = [];
  afterSearch = false;
  constructor() { }

  /** Set login user **/
  setUser(userLogin) {
    this.userLogin = userLogin;
  }

  /** Get login user **/
  getUser() {
    return this.userLogin;
  }

  /** Set Json info **/
  setJson(jsonStr) {
    this.jsonStr = jsonStr;
  }

  /** Get Json info **/
  getJson() {
    return this.jsonStr;
  }

  /** Set post list **/
  setPostsList(postsList) {
    this.postsList = postsList;
  }

  /** Get post list **/
  getPostsList() {
    return this.postsList;
  }

  /** Set followers list **/
  setFollowersList(followersList) {
    this.followersList = followersList;
  }

  /** Get followers list **/
  getFollowersList() {
    return this.followersList;
  }

  /** Set search posts list **/
  setSearchPostsList(searchPostsList) {
    this.searchPostsList = searchPostsList;
    this.afterSearch = true;
  }

  /** Get sarch post list **/
  getSearchPostsList() {
    return this.searchPostsList;
  }


}
