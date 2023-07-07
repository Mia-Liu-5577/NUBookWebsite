import { Component, OnInit } from '@angular/core';
import { LoginService } from '../login/login.service';
import { FormGroup } from '@angular/forms';
import {Router} from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  constructor(private loginService: LoginService, private router: Router) { }
  formLogin;

  accountFormControl;
  passwordFormControl;
  registeredUserList: string[];
  ngOnInit() {
    this.loginService.getRegisteredJson().subscribe(response => {this.registeredUserList = response['registered_user']});
    this.accountFormControl = this.loginService.getAccountControl();
    this.passwordFormControl = this.loginService.getPasswpordControl();
    this.formLogin = new FormGroup({
      accountControl: this.accountFormControl,
      passwordControl: this.passwordFormControl
    });
  }

  /** check if accountName and password are in registered list **/
  isRegistered() {
    this.loginService.isRegistered(this.formLogin.value.accountControl, this.formLogin.value.passwordControl);
  }

  /** login with facebook **/
  GoogleLogin() {
    window.location.href = 'https://nubook-liun1.herokuapp.com/login/auth/google';
  }

}
