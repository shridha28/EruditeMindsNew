import { Component, OnInit, Inject } from '@angular/core';
import { HttpHeaders } from '@angular/common/http';
import { Router, ActivatedRoute } from '@angular/router';
import { DataService } from '../../../shared/services/data-service.service';
import { MatDialog } from '@angular/material/dialog';
import { ForgotPasswordDialog } from './forgotpassword.component';
import { HttpService } from '../../../shared/services/http.service';
import { environment } from '../../../../environments/environment';
import { FormGroup, FormBuilder, Validators, FormArray } from '@angular/forms';

@Component({

  templateUrl: '../pages/loginsignup.component.html',
  styleUrls: ['../loginsignup.component.css']
})
export class LoginsignupComponent implements OnInit {
  response: any;
  loginError: any;
  authenticated: boolean;
  toggle1: boolean = false;
  toggle2: boolean = false;
  toggle3: boolean = false;
  signUpForm: FormGroup;


  signupModel: SignUpViewModel = {
    username: '',
    password: '',
    emailid: ''
  }

  constructor(private router: Router, private _route: ActivatedRoute, private transferService: DataService,
    private dialog: MatDialog, private httpService: HttpService, private formBuilder: FormBuilder) {

    transferService.setData(this.signupModel.emailid);
  }

  signupCustomer(): void {
    let url = `${environment.Url}/api/signup`;
    this.httpService.post(url, this.signupModel).subscribe(
      res => {
        this.transferService.setData(this.signupModel.emailid);
        this.response = JSON.parse(JSON.stringify(res));
        if (this.response.error == null || this.response.error == "")
          this.router.navigateByUrl('/editProfile');
      },
      err => {
        alert("Sorry an error occured");
      });
  }

  public showPassword(input_password, num) {
    if (input_password.type == 'password') {
      input_password.type = 'text';
    } else {
      input_password.type = 'password';
    }
    if (num == 1) {
      this.toggle1 = !this.toggle1;
    } else if (num == 2) {
      this.toggle2 = !this.toggle2;
    } else {
      this.toggle3 = !this.toggle3;
    }

  }
  //Reactive form Changes

  ngOnInit(): void {
    this.signUpForm = this.formBuilder.group({
      username: ['', Validators.required],
      emailId: ['', Validators.required, Validators.email],
      password: ['', Validators.required],
      confirm_password: ['', Validators.required]

    });

    this.signUpForm.valueChanges.subscribe((data) => {
      this.logValidationErrors(this.signUpForm);
    });

  }
  signUpErrorMessages = {

    'username': {
      'required': 'Username is required',

    },

    'emailId': {
      'required': 'Email-Id is required',

    },
    'password':
    {

      'required': 'Password is required',

    },
    'confirm_password':
    {
      'required': 'Confirm your password',

    }

  };
  signUpFormErrors = {
    'username': '',
    'emailId': '',
    'password': '',
    'confirm_password': ''
  };
  
  logValidationErrors(group: FormGroup): void {
    debugger;
    Object.keys(group.controls).forEach((key: string) => {
      const abstractControl = group.get(key);
      if (abstractControl instanceof FormGroup) {
        this.logValidationErrors(abstractControl);
      }
      else {
        this.signUpFormErrors[key] = '';
        if (abstractControl && !abstractControl.valid &&
          (abstractControl.touched || abstractControl.dirty)) {
          const messages = this.signUpErrorMessages[key];
          for (const errorKey in abstractControl.errors) {
            if (errorKey) {
              this.signUpFormErrors[key] += messages[errorKey] + ' ';
            }
            
          }
        }
      }
    });

  }
 




}

export interface SignUpViewModel {
  username: string,
  password: string,
  emailid: string
}
