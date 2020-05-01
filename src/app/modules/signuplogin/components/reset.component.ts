    /*
    @author=Shreya Jalihal;
    */

    import { Component, OnInit,ChangeDetectorRef } from '@angular/core';
    import { HttpClient,HttpHeaders, HttpParams } from '@angular/common/http';
    import {Router, ActivatedRoute} from '@angular/router';
    import {DataService} from '../../../shared/services/data-service.service';
    import {environment} from '../../../../environments/environment'
    import {HttpService} from '../../../shared/services/http.service';
    @Component({
      selector: 'app-reset',
      templateUrl: '../pages/reset.component.html',
      styleUrls: ['../loginsignup.component.css']
    })
    export class ResetComponent implements OnInit {
      response:any;
      isHidden: boolean = true;
      code:any;
      reSendMessage: string;
      emailid:string;
      message:string;
      error:any=[];
      toggle1: boolean = false;
      toggle2: boolean = false;

      resetPassword:ResetPassword={
        code:'',
        password:'',
        emailid:''
      }

      constructor(private transferService:DataService,private httpService:HttpService,
        private router: Router){
          this.emailid = transferService.getData();
        }

        ngOnInit():void {
        }

        //function call to verify the code sent to the customer's email and display form for generating new possword
        verifyCode():void{
          let params = new HttpParams();
          params = params.append('code', this.code);
          params = params.append('emailId', this.emailid);

          let url=`${environment.Url}/resetform`;
          
          this.httpService.getWithParams(url,params).subscribe(
            res =>  {
              this.response = JSON.parse(JSON.stringify(res));
              if(this.response.error==null || this.response.error=="")
                 this.isHidden = false;
              else
                 this.message=this.response.error;
            },
            err=> {
              console.error('error caught in component');
              console.log(err);
              this.error=err;
          });
        }
        resendCode(): void {

      this.resetPassword.emailid = this.emailid;
      console.log(this.resetPassword.emailid);
      let url = "http://localhost:8787/forgotPassword";
      this.http.post(url, this.resetPassword.emailid).subscribe(
          res => {
              this.response = JSON.parse(JSON.stringify(res));
              if (this.response.error == null || this.response.error == "") {
                  this.router.navigateByUrl('/reset');
                  this.reSendMessage = "We've sent you another code.";
              }
          },
          err => {
              alert("Sorry an error occured");
          });
  }

        //function call to save the new password of the customer to the database.
        saveNewPassword():void{
          this.resetPassword.code=this.code;
          this.resetPassword.emailid=this.emailid;
          console.log(this.resetPassword);

          let url = `${environment.Url}/reset`;
          this.httpService.post(url,this.resetPassword).subscribe(
            res =>  {
              this.response = JSON.parse(JSON.stringify(res));
              if(this.response.error==null || this.response.error=="")
                alert("Your password has been changed successfully");
                this.router.navigateByUrl('/loginsignup');
            },
            err=> {
              this.error=err;
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

      }

      export interface ResetPassword{
        code:any,
        password:string,
        emailid:string
      }
