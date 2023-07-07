import { Injectable } from '@angular/core';
import {FormControl, Validators} from '@angular/forms';
import { HttpClient } from '@angular/common/http';
import {AdapterService} from '../adapter.service';

@Injectable({
  providedIn: 'root'
})
export class ProfileService {
  accountFormControl = new FormControl('', [
    Validators.pattern(/^(?![0-9])[a-zA-Z0-9]+$/)]);

  displayFormControl = new FormControl('', []);

  emailFormControl = new FormControl('', [
    Validators.pattern(/^[a-zA-Z0-9_-]+@[a-zA-Z0-9_-]+(\.[a-zA-Z0-9_-]+)+$/)]);

  birthdayFormControl = new FormControl('', []);

  phonenumFormControl = new FormControl('', [
    Validators.pattern(/^\(?([0-9]{3})\)?[-. ]?([0-9]{3})[-. ]?([0-9]{4})$/)]);

  zipcodeFormControl = new FormControl('', [
    Validators.pattern(/[0-9]{5}(-[0-9]{4})?/)]);

  passwordFormControl = new FormControl('', []);

  constructor(private http: HttpClient, private adapterService: AdapterService) { }

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

  postImg(result) {
    var body = {"file": result, "upload_preset": "dyxq9b9o"};
    return this.http.post('https://api.cloudinary.com/v1_1/northeastern-university/image/upload', body);
  }

  getProfileJson() {
    return JSON.parse(this.adapterService.getJson()).profile[0];
  }
}
