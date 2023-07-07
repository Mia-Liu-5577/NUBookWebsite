import { Injectable } from '@angular/core';
import { FormControl, Validators } from '@angular/forms';
import {Router} from '@angular/router';
import {HttpClient} from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class RegistrationService {
  accountFormControl = new FormControl('', [
    Validators.required,
    Validators.pattern(/^(?![0-9])[a-zA-Z0-9]+$/)]);

  displayFormControl = new FormControl('', []);

  emailFormControl = new FormControl('', [
    Validators.required,
    Validators.pattern(/^[a-zA-Z0-9_-]+@[a-zA-Z0-9_-]+(\.[a-zA-Z0-9_-]+)+$/)]);

  birthdayFormControl = new FormControl('', [
    Validators.required]);

  phonenumFormControl = new FormControl('', [
    Validators.required,
    Validators.pattern(/^\(?([0-9]{3})\)?[-. ]?([0-9]{3})[-. ]?([0-9]{4})$/)]);

  zipcodeFormControl = new FormControl('', [
    Validators.required,
    Validators.pattern(/[0-9]{5}(-[0-9]{4})?/)]);

  passwordFormControl = new FormControl('', [
    Validators.required]);

  passwordconfirmFormControl = new FormControl('', [
    Validators.required]);

  constructor(private http: HttpClient) { }

  getAccountControl(): FormControl {
    return this.accountFormControl;
  }

  getDisplayControl(): FormControl {
    return this.displayFormControl;
  }

  getEmailControl(): FormControl {
    return this.emailFormControl;
  }

  getBirthdayControl(): FormControl {
    return this.birthdayFormControl;
  }

  getPhonenumControl(): FormControl {
    return this.phonenumFormControl;
  }

  getZipcodeControl(): FormControl {
    return this.zipcodeFormControl;
  }

  getPasswordControl(): FormControl {
    return this.passwordFormControl;
  }

  getPasswordconfirmControl(): FormControl {
    return this.passwordconfirmFormControl;
  }

  registerInfo2DB(accountName, displayName, emailAddress, birthday, phoneNumber, zipCode, password) {
    const body = {accountName: accountName,
                  displayName: displayName,
                  emailAddress: emailAddress,
                  birthday: birthday,
                  phoneNumber: phoneNumber,
                  zipCode: zipCode,
                  password: password,
                  avatar: "https://wallpapers.wallhaven.cc/wallpapers/full/wallhaven-710595.png",
                  headline: "I'm a new user, cool."};
    this.http.post('https://nubook-liun1.herokuapp.com/register', body).subscribe(response => {});
  }
}
