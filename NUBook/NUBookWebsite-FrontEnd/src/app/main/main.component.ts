import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import {Router} from '@angular/router';
import {MainService} from './main.service';

@Component({
  selector: 'app-main',
  templateUrl: './main.component.html',
  styleUrls: ['./main.component.css']
})
export class MainComponent implements OnInit {
  constructor(private router: Router, private mainService: MainService, private http: HttpClient) { }

  ngOnInit() {
  }

  toProfile() {
    // this.router.navigate(["/profile"]);
    this.mainService.toProfile(this.router);
  }

  toAuth() {
    // this.router.navigate(["/auth"]);
    // this.mainService.toAuth(this.router);
    this.http.put('https://nubook-liun1.herokuapp.com/logout', {}, {withCredentials: true}).subscribe(response => {});
    this.router.navigate(["/auth"])
  }
}
