import { Component, OnInit } from '@angular/core';
import { ProfileService} from './profile.service';
import { AdapterService } from '../adapter.service';
import { FormGroup } from '@angular/forms';
import {Router} from '@angular/router';
import {HttpClient} from '@angular/common/http';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent implements OnInit {
  constructor(private profileService: ProfileService, private adapterService: AdapterService, private router: Router, private http: HttpClient) { }
  formUpdate;
  accountFormControl;
  displayFormControl;
  emailFormControl;
  birthdayFormControl;
  phonenumFormControl;
  zipcodeFormControl;
  passwordFormControl;

  accountName: string;
  displayName: string;
  emailAddress: string;
  birthday: string;
  phoneNumber: string;
  zipCode: string;
  password: string;
  avatar: string;

  jsonStr: string;

  account_clear:string = '';
  display_clear:string = '';
  email_clear:string = '';
  birthday_clear:string = '';
  phone_clear:string = '';
  zipcode_clear:string = '';
  password_clear:string = '';

  profileList: string;

  ngOnInit() {

    this.http.get('https://nubook-liun1.herokuapp.com/accountname', {withCredentials: true}).subscribe( response => {
      localStorage.setItem("accountName", response['accountName']);

      if (localStorage.getItem("accountName") !== null) {
        this.accountName = localStorage.getItem("accountName");
      }

      this.http.get('https://nubook-liun1.herokuapp.com/avatar/' + this.accountName, {withCredentials: true}).subscribe(response => {
        this.avatar = response['avatar'][0]['avatar'];
      });

      this.http.get('https://nubook-liun1.herokuapp.com/display/' + this.accountName, {withCredentials: true}).subscribe(response => {
        this.displayName = response['displayName'];
      });

      this.http.get('https://nubook-liun1.herokuapp.com/email/' + this.accountName, {withCredentials: true}).subscribe(response => {
        this.emailAddress = response['emailAddress'];
      });

      this.http.get('https://nubook-liun1.herokuapp.com/dob/' + this.accountName, {withCredentials: true}).subscribe(response => {
        this.birthday = response['birthday'];
      });

      this.http.get('https://nubook-liun1.herokuapp.com/phone/' + this.accountName, {withCredentials: true}).subscribe(response => {
        this.phoneNumber = response['phoneNumber'];
      });

      this.http.get('https://nubook-liun1.herokuapp.com/zipcode/' + this.accountName, {withCredentials: true}).subscribe(response => {
        this.zipCode = response['zipCode'];
      });

      this.http.get('https://nubook-liun1.herokuapp.com/password/' + this.accountName, {withCredentials: true}).subscribe(response => {
        this.password = response['password'];
      });
    });

    /** From control part **/
    this.accountFormControl = this.profileService.getAccountControl();
    this.displayFormControl = this.profileService.getDisplayControl();
    this.emailFormControl = this.profileService.getEmailControl();
    this.birthdayFormControl = this.profileService.getBirthdayControl();
    this.phonenumFormControl = this.profileService.getPhonenumControl();
    this.zipcodeFormControl = this.profileService.getZipcodeControl();
    this.passwordFormControl = this.profileService.getPasswordControl();

    this.formUpdate = new FormGroup({
      accountControl: this.accountFormControl,
      displayControl: this.displayFormControl,
      emailControl: this.emailFormControl,
      birthdayControl: this.birthdayFormControl,
      phonenumControl: this.phonenumFormControl,
      zipcodeControl: this.zipcodeFormControl,
      passwordControl: this.passwordFormControl,
    });
  }

  submitForm() {
    if (this.formUpdate.value.accountControl !== "") {
      this.accountName = this.formUpdate.value.accountControl;
      this.account_clear = '';
    }

    if (this.formUpdate.value.displayControl !== "") {
      this.displayName = this.formUpdate.value.displayControl;
      this.display_clear = '';
    }

    if (this.formUpdate.value.emailControl !== "") {
      const body = {accountName: this.accountName, emailAddress: this.formUpdate.value.emailControl};
      this.http.put('https://nubook-liun1.herokuapp.com/email/', body, {withCredentials: true}).subscribe( response => {
        this.emailAddress = response['emailAddress'];
      });
      this.email_clear = '';
    }

    if (this.formUpdate.value.birthdayControl !== "") {
      var selectedDate = new Date(this.formUpdate.value.birthdayControl);
      var birthday =  selectedDate.getFullYear() + "-" + (selectedDate.getMonth() + 1) + "-" + selectedDate.getDate();
      this.birthday = birthday;
      this.birthday_clear = '';
    }

    if (this.formUpdate.value.phonenumControl !== "") {
      this.phoneNumber = this.formUpdate.value.phonenumControl;
      this.phone_clear = '';
    }

    if (this.formUpdate.value.zipcodeControl !== "") {
      const body = {accountName: this.accountName, zipCode: this.formUpdate.value.zipcodeControl};
      this.http.put('https://nubook-liun1.herokuapp.com/zipcode/', body, {withCredentials: true}).subscribe( response => {
        this.zipCode = response['zipCode'];
      });
      this.zipcode_clear = '';
    }

    if (this.formUpdate.value.passwordControl !== "") {
      const body = {accountName: this.accountName, password: this.formUpdate.value.passwordControl};
      this.http.put('https://nubook-liun1.herokuapp.com/password/', body, {withCredentials: true}).subscribe( response => {
        this.password = response['password'];
      });
      this.password_clear = '';
    }

    /** Store changed info to Json adapter **/
    var accountName = this.accountName;
    var displayName = this.displayName;
    var emailAddress = this.emailAddress;
    var selectedDate = new Date(this.birthday);
    var birthday =  selectedDate.getFullYear() + "-" + (selectedDate.getMonth() + 1) + "-" + selectedDate.getDate();
    var phoneNumber = this.phoneNumber;
    var zipCode = this.zipCode;
    var password = this.password;
    this.jsonStr = '{"profile":[' + '{"accountName":"' + accountName + '","displayName":"' + displayName + '","emailAddress":"' + emailAddress + '","birthday":"' + birthday + '","phoneNumber":"' + phoneNumber + '","zipCode":"' + zipCode + '","password":"' + password + '"}' + ']}';
    this.adapterService.setJson(this.jsonStr);
  }

  toMain() {
    this.router.navigate(["/main"]);
  }

  postImg(event:any) {
    if (event.target.files && event.target.files[0]) {
      var reader = new FileReader();
      reader.onload = (event:any) => {
        var result = event.target.result;
        this.profileService.postImg(result).subscribe(response => {
          this.avatar = response['url'];

          /** update database **/
          const body = {accountName: this.accountName, avatar: this.avatar};
          this.http.put('https://nubook-liun1.herokuapp.com/avatar/', body, {withCredentials: true}).subscribe( response => {});
        });
      };
      reader.readAsDataURL(event.target.files[0]);
    }
  }

  link(accountName, password) {
    const body = {accountName: accountName, password: password};
    this.http.post('https://nubook-liun1.herokuapp.com/link/', body, {withCredentials: true}).subscribe( response => {
      this.http.put('https://nubook-liun1.herokuapp.com/logout', {}, {withCredentials: true}).subscribe(response => {});
      this.router.navigate(["/auth"]);
    });
  }

  unlink() {
    this.http.get('https://nubook-liun1.herokuapp.com/unlink/', {withCredentials:true}).subscribe( response => {
      this.http.put('https://nubook-liun1.herokuapp.com/logout', {}, {withCredentials: true}).subscribe(response => {});
      this.router.navigate(["/auth"]);
    });
  }

}
