import { Component, OnInit, Inject } from '@angular/core';
import { HttpClient,HttpHeaders } from '@angular/common/http';
import {Router, ActivatedRoute} from '@angular/router';
import {DataService} from '../../../shared/services/data-service.service';
import {MatDialog} from '@angular/material/dialog';
import {ForgotPasswordDialog} from './forgotpassword.component';
import {LoginsignupService} from '../../../shared/services/loginsignup.service';


@Component({
  
  templateUrl: '../pages/loginsignup.component.html',
  styleUrls: ['../loginsignup.component.css']
})
export class LoginsignupComponent implements OnInit {
     response:any;
     loginError:any;
     authenticated:boolean;
     toggle1: boolean = false;
     toggle2: boolean = false;

  signupModel:SignUpViewModel={
    username:'',
    password:'',
    emailid:''
  }

  loginModel:LoginViewModel={
    emailId:'',
    password:''
  }

  constructor(private http:HttpClient,
    private router: Router, private _route:ActivatedRoute,private transferService:DataService,
    private dialog: MatDialog,private loginsignupservice:LoginsignupService) { 

      transferService.setData(this.signupModel.emailid);
    }

  login():void{
    let url = "http://localhost:8787/api/login";
    const headers = new HttpHeaders(this.loginModel ? {
      authorization : 'Basic ' + btoa(this.loginModel.emailId + ':' + this.loginModel.password)
  } : {});

  this.http.get(url, {headers: headers,observe:'response'}).subscribe(response => {
      if(response!=null && response.status==200)
        this.router.navigateByUrl('/activities');
  },error=>{
    this.loginError = "Invalid Credentials.Please try again."
  });
  }

  signupCustomer():void{
    this.loginsignupservice.signupCustomer(this.signupModel).subscribe(res =>  {
 
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
      input_password.type = 'text';
    } else {
      input_password.type = 'password';
    }
    if(num==1) {
      this.toggle1 = !this.toggle1;
    } else {
      this.toggle2 = !this.toggle2;
    }

  }


  openDialog(){
    const dialogRef = this.dialog.open(ForgotPasswordDialog, {
      width: '400px',
      disableClose : true,
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

export interface SignUpViewModel{
  username:string,
  password:string,
  emailid:string
}


export interface LoginViewModel{
  emailId:string,
  password:string
}
