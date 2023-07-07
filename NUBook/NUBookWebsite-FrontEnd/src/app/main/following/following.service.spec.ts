import { TestBed } from '@angular/core/testing';

import { FollowingService } from './following.service';
import {HttpClientModule} from '@angular/common/http';
import {AdapterService} from '../../adapter.service';

describe('FollowingService', () => {
  beforeEach(() => TestBed.configureTestingModule({
    imports: [HttpClientModule]
  }));

  // const registeredUserList = [{"accountName": "hd25", "password": "password-hd25"},
  //   {"accountName": "ed75", "password": "password-ed75"},
  //   {"accountName": "qw35", "password": "password-qw35"},
  //   {"accountName": "wg74", "password": "password-wg74"}];
  //
  // const allPosts = [{"author":"hd25", "content":"test1"},
  //   {"author":"ed75", "content":"test2"},
  //   {"author":"hd25", "content":"test3"},
  //   {"author":"wg74", "content":"test4"},
  //   {"author":"qw35", "content":"test5"},
  //   {"author":"hd25", "content":"test6"}];
  //
  // it('should add articles when adding a follower', function () {
  //   const service: FollowingService = TestBed.get(FollowingService);
  //   const adapterService: AdapterService = TestBed.get(AdapterService);
  //   const name = "ed75";
  //   const followersList = [
  //     {"name":"hd25", "text":"test"},
  //     {"name":"qw35", "text":"test"}
  //   ];
  //
  //   const postBeforeAdd = [
  //     {"author":"hd25", "content":"test1"},
  //     {"author":"hd25", "content":"test3"},
  //     {"author":"qw35", "content":"test5"},
  //     {"author":"hd25", "content":"test6"}
  //   ];
  //
  //   adapterService.setFollowersList(followersList);
  //   adapterService.setPostsList(postBeforeAdd);
  //
  //   const expectPost = [
  //     {"author":"ed75", "content":"test2"},
  //     {"author":"hd25", "content":"test1"},
  //     {"author":"hd25", "content":"test3"},
  //     {"author":"qw35", "content":"test5"},
  //     {"author":"hd25", "content":"test6"}
  //   ];
  //
  //   service.addFollower(name, followersList, registeredUserList, allPosts);
  //   const postAfterAdd = adapterService.getPostsList();
  //
  //   // console.log(expectPost);
  //   // console.log(postAfterAdd);
  //
  //   for (var i = 0; i < expectPost.length; i ++) {
  //     expect(expectPost[i].author).toBe((Object)(postAfterAdd[i]).author);
  //     expect(expectPost[i].content).toBe((Object)(postAfterAdd[i]).content);
  //   }
  // });
  //
  // it('should remove articles when removing a follower', () => {
  //   const service: FollowingService = TestBed.get(FollowingService);
  //   const adapterService: AdapterService = TestBed.get(AdapterService);
  //   const name = "ed75";
  //   const followersList = [
  //     {"name":"hd25", "text":"test"},
  //     {"name":"qw35", "text":"test"}
  //   ];
  //
  //   const postBeforeRemove = [
  //     {"author":"ed75", "content":"test2"},
  //     {"author":"hd25", "content":"test1"},
  //     {"author":"hd25", "content":"test3"},
  //     {"author":"qw35", "content":"test5"},
  //     {"author":"hd25", "content":"test6"}
  //   ];
  //
  //   adapterService.setFollowersList(followersList);
  //   adapterService.setPostsList(postBeforeRemove);
  //
  //   const expectPost = [
  //     {"author":"hd25", "content":"test1"},
  //     {"author":"hd25", "content":"test3"},
  //     {"author":"qw35", "content":"test5"},
  //     {"author":"hd25", "content":"test6"}
  //   ];
  //
  //   service.removeFollower(name, followersList);
  //   const postAfterRemove = adapterService.getPostsList();
  //
  //   for (var i = 0; i < expectPost.length; i ++) {
  //     expect(expectPost[i].author).toBe((Object)(postAfterRemove[i]).author);
  //     expect(expectPost[i].content).toBe((Object)(postAfterRemove[i]).content);
  //   }
  //
  // });

  // it('should be created', () => {
  //   const service: FollowingService = TestBed.get(FollowingService);
  //   expect(service).toBeTruthy();
  // });
});
