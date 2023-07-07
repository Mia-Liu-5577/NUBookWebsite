import { TestBed } from '@angular/core/testing';

import { MainService } from './main.service';
import {HttpClientModule} from '@angular/common/http';
import {AdapterService} from '../adapter.service';

describe('MainService', () => {
  beforeEach(() => TestBed.configureTestingModule({
    imports: [HttpClientModule]
  }));

  // it('should log out a user', function () {
  //   const service: MainService = TestBed.get(MainService);
  //   const adapterService: AdapterService = TestBed.get(AdapterService);
  //
  //   adapterService.setUser("userLogin");
  //   service.logOut();
  //   expect(adapterService.getUser()).toBe("");
  // });

  // it('should be created', () => {
  //   const service: MainService = TestBed.get(MainService);
  //   expect(service).toBeTruthy();
  // });
});
