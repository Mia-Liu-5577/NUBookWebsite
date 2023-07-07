import { Component, OnInit } from '@angular/core';
import { RegistrationService } from '../registration/registration.service';
import { AdapterService } from '../../adapter.service';
import { FormGroup } from '@angular/forms';
import {Router} from '@angular/router';
import {HttpClient} from '@angular/common/http';

@Component({
  selector: 'app-registration',
  templateUrl: './registration.component.html',
  styleUrls: ['./registration.component.css']
})
export class RegistrationComponent implements OnInit {
  constructor(private registerService: RegistrationService, private adapterService: AdapterService, private router: Router) { }
  formRegister;

  accountFormControl;
  displayFormControl;
  emailFormControl;
  birthdayFormControl;
  phonenumFormControl;
  zipcodeFormControl;
  passwordFormControl;
  passwordconfirmFormControl;

  ngOnInit() {
    this.accountFormControl = this.registerService.getAccountControl();
    this.displayFormControl = this.registerService.getDisplayControl();
    this.emailFormControl = this.registerService.getEmailControl();
    this.birthdayFormControl = this.registerService.getBirthdayControl();
    this.phonenumFormControl = this.registerService.getPhonenumControl();
    this.zipcodeFormControl = this.registerService.getZipcodeControl();
    this.passwordFormControl = this.registerService.getPasswordControl();
    this.passwordconfirmFormControl = this.registerService.getPasswordconfirmControl();
    this.formRegister = new FormGroup({
      accountControl: this.accountFormControl,
      displayControl: this.displayFormControl,
      emailControl: this.emailFormControl,
      birthdayControl: this.birthdayFormControl,
      phonenumControl: this.phonenumFormControl,
      zipcodeControl: this.zipcodeFormControl,
      passwordControl: this.passwordFormControl,
      passwordconfirmControl: this.passwordconfirmFormControl
    });
  }

  jsonStr: string;
  submitForm() {
    var accountName = this.formRegister.value.accountControl;
    var displayName = this.formRegister.value.displayControl;
    var emailAddress = this.formRegister.value.emailControl;
    var selectedDate = new Date(this.formRegister.value.birthdayControl);
    var birthday =  selectedDate.getFullYear() + "-" + (selectedDate.getMonth() + 1) + "-" + selectedDate.getDate();
    var phoneNumber = this.formRegister.value.phonenumControl;
    var zipCode = this.formRegister.value.zipcodeControl;
    var password = this.formRegister.value.passwordControl;
    this.jsonStr = '{"profile":[' + '{"accountName":"' + accountName + '","displayName":"' + displayName + '","emailAddress":"' +
      emailAddress + '","birthday":"' + birthday + '","phoneNumber":"' + phoneNumber + '","zipCode":"' + zipCode + '","password":"' + password +
      '","avatar":"' +  "https://tomli.blog/wp-content/plugins/stronger-github-widget//img/octocat_big.png" +
      '","headline":"'+ "I'm a new user, cool." + '"}' + ']}';
    console.log(this.jsonStr);
    this.adapterService.setJson(this.jsonStr);

    /** send register info to db **/
    this.registerService.registerInfo2DB(accountName, displayName, emailAddress, birthday, phoneNumber, zipCode, password);

    // this.router.navigate(["/main"]); // new user can not log in
  }

  isAdult() {
    var selectedDate = new Date(this.formRegister.value.birthdayControl);
    var birthYear = selectedDate.getFullYear();
    var birthMonth = selectedDate.getMonth() + 1;
    var birthDay = selectedDate.getDate();

    var curTime = new Date();
    var curYear = curTime.getFullYear();
    var curMonth = curTime.getMonth() + 1;
    var curDay = curTime.getDate();

    if (curYear - birthYear < 18) {
      return false;
    }
    else if (curYear - birthYear === 18) {
      if (curMonth - birthMonth  < 0) {
        return false
      }
      else if (curMonth - birthMonth === 0) {
        if (curDay - birthDay < 0) {
          return false;
        }
      }
    }
    return true;
  }

  passwordMatch() {
    var password1 = this.formRegister.value.passwordControl;
    var password2 = this.formRegister.value.passwordconfirmControl;
    if (password1 !== password2) {
      return false;
    }
    return true;
  }



}
