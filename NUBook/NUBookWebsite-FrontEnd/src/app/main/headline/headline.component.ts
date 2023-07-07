import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import {HeadlineService} from './headline.service';

@Component({
  selector: 'app-headline',
  templateUrl: './headline.component.html',
  styleUrls: ['./headline.component.css']
})
export class HeadlineComponent implements OnInit {
  avatar: string;
  accountName: string;
  headlineContent: string;

  headline_clear:string = '';
  constructor(private http: HttpClient, private headlineService: HeadlineService) { }

  ngOnInit() {
    /** get account name from local storage **/
    this.http.get('https://nubook-liun1.herokuapp.com/accountname', {withCredentials: true}).subscribe( response => {
      localStorage.setItem("accountName", response['accountName']);

      if (localStorage.getItem("accountName") !== null) {
        this.accountName = localStorage.getItem("accountName");
      }

      /** get avatar from db **/
      // this.avatar = "https://tomli.blog/wp-content/plugins/stronger-github-widget//img/octocat_big.png";
      this.http.get('https://nubook-liun1.herokuapp.com/avatar/' + this.accountName, {withCredentials: true}).subscribe(response => {
        this.avatar = response['avatar'][0]['avatar'];
      });

      /** get headline from db according to account name **/
      this.http.get('https://nubook-liun1.herokuapp.com/headlines/' + this.accountName, {withCredentials: true}).subscribe(response => {
        this.headlineContent = response['headline'][0]['headline'];
      });
    });


  }

  /** Update headline value **/
  updateHeadline(newHeadline) {
    if (newHeadline !== null && newHeadline !== "") {
      this.headlineContent = newHeadline;
      this.headlineService.updateHeadline(this.accountName, this.headlineContent);

      /** Clear input area after updating. **/
      this.headline_clear = '';
    }
  }
}
