import { Component, OnInit, Inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import {Router, ActivatedRoute} from '@angular/router';
import {DataService} from '../../../shared/services/data-service.service';
import {MatDialog,MAT_DIALOG_DATA,MatDialogRef} from '@angular/material/dialog';
import {environment} from '../../../../environments/environment'


@Component({

    selector: 'forgotcomponentdialog',
    templateUrl: '../pages/forgotPassword.component.html',
    styleUrls: ['../loginsignup.component.css']
  })
  export class ForgotPasswordDialog {
    response:any;
    message:string;
    email_id:string;
    constructor(
      public dialogRef: MatDialogRef<ForgotPasswordDialog>,
      private router: Router, private _route:ActivatedRoute,
      @Inject(MAT_DIALOG_DATA) public data: DialogData,private http:HttpClient,
      private transferService:DataService) {
      }

    onNoClick(): void {
      this.dialogRef.close();
    }

    onClick():void{

     let url=`${environment.Url}/forgotPassword`;

     this.http.post(url,this.data.emailid).subscribe(
      res =>  {
     this.response = JSON.parse(JSON.stringify(res));
     this.transferService.setData(this.data.emailid);
     if(this.response.error==null || this.response.error==""){
         this.router.navigateByUrl('/reset');
         this.dialogRef.close();
      }
     else
       this.message=this.response.error;
      },
     err=> {
       alert("Sorry an error occured");
    });
    }
  }

  export interface DialogData {
    emailid: string;
  }
