import { TestBed } from '@angular/core/testing';

import { LoginService } from './login.service';
import {HttpClientModule} from '@angular/common/http';

describe('LoginService', () => {
  beforeEach(() => TestBed.configureTestingModule({
    imports: [HttpClientModule]
  }));

  // const registeredUserList = [{"accountName": "hd25", "password": "password-hd25"},
  //   {"accountName": "qw36", "password": "password-qw36"},
  //   {"accountName": "kb96", "password": "password-kb96"},
  //   {"accountName": "aw23", "password": "password-aw23"},
  //   {"accountName": "ds74", "password": "password-ds74"},
  //   {"accountName": "ti76", "password": "password-ti76"},
  //   {"accountName": "lk63", "password": "password-lk63"},
  //   {"accountName": "ng66", "password": "password-ng66"},
  //   {"accountName": "hj36", "password": "password-hj36"},
  //   {"accountName": "ls24", "password": "password-ls24"}];
  //
  // it('should log in a user', () => {
  //   const service: LoginService = TestBed.get(LoginService);
  //   expect(service.isRegistered("hd25", "password-hd25", registeredUserList)).toBeTruthy();
  // });
  //
  // it('should update success message', () => {
  //   const service: LoginService = TestBed.get(LoginService);
  //   const isSuccess = service.isRegistered("hd25", "password-hd25", registeredUserList);
  //   if (isSuccess) {
  //     expect(service.showSuccessMessage()).toBe("Login Successfully");
  //   }
  // });
  //
  // it('should not log in an invalid user', () => {
  //   const service: LoginService = TestBed.get(LoginService);
  //   expect(service.isRegistered("ss22", "password-ss22", registeredUserList)).toBe(false);
  // });
  //
  // it('should update error message', () => {
  //   const service: LoginService = TestBed.get(LoginService);
  //   const isSuccess = service.isRegistered("ss22", "password-ss22", registeredUserList);
  //   if (!isSuccess) {
  //     expect(service.showFailMessage()).toBe("Login Failed");
  //   }
  // });

  // it('should be created', () => {
  //   const service: LoginService = TestBed.get(LoginService);
  //   expect(service).toBeTruthy();
  // });
});
