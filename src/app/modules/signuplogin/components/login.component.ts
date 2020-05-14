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
  selector: 'em-login',
  templateUrl: '../pages/login.component.html',
  styleUrls: ['../css/login.component.css']
})
export class LoginComponent implements OnInit {

  response: any;
  loginError: any;
  submitted=false;
  authenticated: boolean;
  toggle1: boolean = false;
  toggle2: boolean = false;
  toggle3: boolean = false;
  loginForm: FormGroup;

  constructor(private router: Router, private _route: ActivatedRoute, private transferService: DataService,
    private dialog: MatDialog, private httpService: HttpService, private formBuilder: FormBuilder) {

    //transferService.setData(this.loginForm.value.emailId);
  }

  ngOnInit(): void {
    this.loginForm = this.formBuilder.group({
      emailId: ['', Validators.required],
      password: ['', Validators.required]
    });

    this.loginForm.valueChanges.subscribe((data) => {
      this.logValidationErrors(this.loginForm);
    });
  }


  loginFormErrors = {
    'emailId': '',
    'password': '',

  };



  loginErrorMessages = {
    'emailId': {
      'required': 'Please enter a valid email address',

    },
    'password':
    {
      'required': 'Please enter your password',

    }

  };

  openDialog() {
    const dialogRef = this.dialog.open(ForgotPasswordDialog, {
      width: '400px',
      disableClose: true,
      data: {},
      backdropClass: 'backdropBackground'
    });

    dialogRef.afterClosed().subscribe(result => {
      console.log('The dialog was closed');
      console.log('Dialog closed');
    });
  }

  
  login(): void {
    this.submitted = true;
    let url = `${environment.Url}/api/login`;
    const headers = new HttpHeaders(this.loginForm.value ? {
      authorization: 'Basic ' + btoa(this.loginForm.value.emailId + ':' + this.loginForm.value.password)
    } : {});

    this.httpService.getWithHeaders(url, headers).subscribe(response => {
      if (response != null && response.status == 200)
        this.router.navigateByUrl('/activities');
    }, error => {
      this.loginError = "Invalid Credentials.Please try again."
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

  logValidationErrors(group: FormGroup): void {
    Object.keys(group.controls).forEach((key: string) => {
      const abstractControl = group.get(key);
      if (abstractControl instanceof FormGroup) {
        this.logValidationErrors(abstractControl);
      }
      else {

        this.loginFormErrors[key] = '';
        
        if (abstractControl && !abstractControl.valid &&
          (abstractControl.touched || abstractControl.dirty)) {
          const messages = this.loginErrorMessages[key];
          for (const errorKey in abstractControl.errors) {
            if (errorKey) {
              this.loginFormErrors[key] += messages[errorKey] + ' ';
            }
            
          }
          console.log(this.loginFormErrors);
        }
      }
    });

      
  }
}

