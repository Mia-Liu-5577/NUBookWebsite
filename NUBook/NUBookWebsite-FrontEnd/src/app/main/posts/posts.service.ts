import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import {AdapterService} from '../../adapter.service';
import {element} from 'protractor';

@Injectable({
  providedIn: 'root'
})
export class PostsService {

  constructor(private http: HttpClient, private adapterService: AdapterService) { }
  getPostJson() {
    return this.http.get('assets/articles.json');
  }

  loadPosts(posts, temp) {
    // temp = [];
    posts.forEach(post => {
      temp.push(post);
    });
    return temp;
  }

  addPosts(author, avatar, img, text, postsList) {
    if (!((text === null || text === "") && (img === null || img === ""))) {
      const body = {author: author, avatar: avatar, img: img, text: text};
      console.log(body);
      return this.http.post('https://nubook-liun1.herokuapp.com/article/', body, {withCredentials: true});
    }

  }

  fetchUsersPost(name, postsList) {
    /** add posts according to name **/
    var usersPost = [];
    for (var i = 0; i < postsList.length; i++) {
      if (postsList[i]['author'] === name) {
        usersPost.push(postsList[i]);
      }
    }
    return usersPost;
  }

  search(keyWord, postsList, postsList_dummy) {
    // console.log(postsList);
    var temp = postsList_dummy;
    postsList = postsList_dummy.filter(ariticle => ariticle['author'].indexOf(keyWord) !== -1 || ariticle['text'].indexOf(keyWord) !== -1);
    postsList_dummy = temp;
    this.adapterService.setSearchPostsList(postsList);
  }

  // upload image in post
  postImg(result) {
    var body = {"file": result, "upload_preset": "dyxq9b9o"};
    return this.http.post('https://api.cloudinary.com/v1_1/northeastern-university/image/upload', body);
  }
}
