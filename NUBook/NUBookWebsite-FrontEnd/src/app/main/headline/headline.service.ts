import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class HeadlineService {

  constructor(private http: HttpClient) { }

  getAvatar() {
    return this.http.get('http://localhost:3000/avatar/hd25', {withCredentials: true});
  }

  updateHeadline(accountName, headline) {
    const body = {accountName: accountName, headline: headline};
    this.http.put('https://nubook-liun1.herokuapp.com/headline/', body, {withCredentials: true}).subscribe(response => {});
  }

}
