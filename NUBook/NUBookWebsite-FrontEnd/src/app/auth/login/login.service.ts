import { Injectable } from '@angular/core';
import { FormControl, Validators } from '@angular/forms';
import { HttpClient } from '@angular/common/http';
import {AdapterService} from '../../adapter.service';
import {Router} from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class LoginService {
  accountFormControl = new FormControl('', [
    Validators.required,
    Validators.pattern(/^(?![0-9])[a-zA-Z0-9]+$/)]);

  passwordFormControl = new FormControl('', [
    Validators.required]);

  constructor(private http: HttpClient, private adapter: AdapterService, private router: Router) {
    // this.http.get('assets/registered_user.json').subscribe(response => {this.registered_user = response['registered_user']});
  }

  getAccountControl(): FormControl {
    return this.accountFormControl;
  }

  getPasswpordControl(): FormControl {
    return this.passwordFormControl;
  }

  getRegisteredJson() {
    return this.http.get('assets/registered_user.json');
  }

  isRegistered(accountName, password) {
    const body = {accountName: accountName, password: password};
    this.http.post('https://nubook-liun1.herokuapp.com/login', body, {withCredentials: true}).subscribe(response => {
      localStorage.setItem("accountName", accountName);
      this.router.navigate(["/main"]);
    });
  }
}
