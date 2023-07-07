import { Injectable } from '@angular/core';
import {Router} from '@angular/router';
import {AdapterService} from '../adapter.service';

@Injectable({
  providedIn: 'root'
})
export class MainService {

  constructor(private adapterService: AdapterService) { }

  toProfile(router) {
    router.navigate(["/profile"]);
  }

  toAuth(router) {
    this.adapterService.setUser("");
    router.navigate(["/auth"]);
  }

  logOut() {
    this.adapterService.setUser("");
  }
}
