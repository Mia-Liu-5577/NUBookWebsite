import { TestBed } from '@angular/core/testing';

import { PostsService } from './posts.service';
import {AdapterService} from '../../adapter.service';
import {HttpClientModule} from '@angular/common/http';

describe('PostsService', () => {
  beforeEach(() => TestBed.configureTestingModule({
    imports: [HttpClientModule]
  }));

  // it('should fetch articles for current logged in user', () => {
  //   const service: PostsService = TestBed.get(PostsService);
  //   const allPosts = [
  //     {"author":"hd25", "content":"test1"},
  //     {"author":"ed75", "content":"test2"},
  //     {"author":"hd25", "content":"test3"},
  //     {"author":"wg74", "content":"test4"},
  //     {"author":"qw35", "content":"test5"},
  //     {"author":"hd25", "content":"test6"}
  //   ];
  //   const name = "hd25";
  //   const myPosts = [
  //     {"author":"hd25", "content":"test1"},
  //     {"author":"hd25", "content":"test3"},
  //     {"author":"hd25", "content":"test6"}
  //   ];
  //   const fetchedPosts = service.fetchUsersPost(name, allPosts);
  //   for (var i = 0; i < myPosts.length; i ++) {
  //     expect(myPosts[i].author).toBe(fetchedPosts[i].author);
  //   }
  // });
  //
  // // Test Article: should update the search keyword	3
  // // Test Article: should filter displayed articles by the search keyword	3
  //
  // it('should update search keyword && filter displayed articles by the search keyword', () => {
  //   const service: PostsService = TestBed.get(PostsService);
  //   const adapterService: AdapterService = TestBed.get(AdapterService);
  //
  //   var allPosts = [
  //     {"author":"hd25", "text":"test1"},
  //     {"author":"ed75", "text":"test2"},
  //     {"author":"hd25", "text":"test3"},
  //     {"author":"wg74", "text":"test4"},
  //     {"author":"qw35", "text":"test5"},
  //     {"author":"hd25", "text":"test6"}
  //   ];
  //   var allPosts_dummy = allPosts;
  //
  //   var keyWord1 = "hd25";
  //   service.search(keyWord1, allPosts, allPosts_dummy);
  //   var searchResult1 = adapterService.getSearchPostsList();
  //   // console.log(searchResult);
  //   var expectResult1 = [
  //     {"author":"hd25", "text":"test1"},
  //     {"author":"hd25", "text":"test3"},
  //     {"author":"hd25", "text":"test6"}
  //   ];
  //
  //   for (var i = 0; i < expectResult1.length; i ++) {
  //     expect((Object)(searchResult1[i]).author).toBe(expectResult1[i].author);
  //     expect((Object)(searchResult1[i]).text).toBe(expectResult1[i].text);
  //   }
  //
  //   var keyWord2 = "test2";
  //   service.search(keyWord2, allPosts, allPosts_dummy);
  //   var searchResult2 = adapterService.getSearchPostsList();
  //   var expectResult2 = [
  //     {"author":"ed75", "text":"test2"}
  //   ];
  //
  //   for (var i = 0; i < expectResult2.length; i ++) {
  //     expect((Object)(searchResult2[i]).author).toBe(expectResult2[i].author);
  //     expect((Object)(searchResult2[i]).text).toBe(expectResult2[i].text);
  //   }
  //
  //
  // });

  // it('should be created', () => {
  //   const service: PostsService = TestBed.get(PostsService);
  //   expect(service).toBeTruthy();
  // });
});
