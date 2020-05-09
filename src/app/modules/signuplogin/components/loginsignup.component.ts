import { Component, OnInit, Inject } from '@angular/core';
import { HttpHeaders } from '@angular/common/http';
import { Router, ActivatedRoute } from '@angular/router';
import { DataService } from '../../../shared/services/data-service.service';
import { MatDialog } from '@angular/material/dialog';
import { ForgotPasswordDialog } from './forgotpassword.component';
import { HttpService } from '../../../shared/services/http.service';
import { environment } from '../../../../environments/environment';

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

  signupModel: SignUpViewModel = {
    username: '',
    password: '',
    emailid: ''
  }

  loginModel: LoginViewModel = {
    emailId: '',
    password: ''
  }

<<<<<<< HEAD
  constructor(private router: Router, private _route: ActivatedRoute, private transferService: DataService,
    private dialog: MatDialog, private httpService: HttpService) {
=======
  constructor(private router: Router, private _route:ActivatedRoute,private transferService:DataService,
    private dialog: MatDialog,private httpService:HttpService) { 
    private dialog: MatDialog,private loginsignupservice:LoginsignupService) {
>>>>>>> eaa39b7da782d4528606e8120a21392c4740478b

    transferService.setData(this.signupModel.emailid);
  }

  login(): void {
    let url = `${environment.Url}/api/login`;
    const headers = new HttpHeaders(this.loginModel ? {
      authorization: 'Basic ' + btoa(this.loginModel.emailId + ':' + this.loginModel.password)
    } : {});

    this.httpService.getWithHeaders(url, headers).subscribe(response => {
      if (response != null && response.status == 200)
        this.router.navigateByUrl('/activities');
    }, error => {
      this.loginError = "Invalid Credentials.Please try again."
    });
  }

  signupCustomer(): void {
    let url = `${environment.Url}/api/signup`;
<<<<<<< HEAD
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
=======
    this.httpService.post(url,this.signupModel).subscribe(
      res =>  {
      this.transferService.setData(this.signupModel.emailid);
      this.response = JSON.parse(JSON.stringify(res));
        if(this.response.error==null || this.response.error=="")
           this.router.navigateByUrl('/editProfile');
         },
      err=> {alert("Sorry an error occured");
     });
   }

   public showPassword(input_password, num) {
    if(input_password.type=='password') {
>>>>>>> eaa39b7da782d4528606e8120a21392c4740478b
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




  ngOnInit(): void {
  }

}

export interface SignUpViewModel {
  username: string,
  password: string,
  emailid: string
}


export interface LoginViewModel {
  emailId: string,
  password: string
}
