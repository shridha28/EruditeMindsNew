import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {LoginsignupComponent} from '../signuplogin/components/loginsignup.component';
import {ResetComponent} from '../signuplogin/components/reset.component';
import {EditprofileComponent} from '../signuplogin/components/editprofile.component';
import {FormsModule} from '@angular/forms';
import { MatDialogModule} from '@angular/material/dialog';
import { MatFormFieldModule} from '@angular/material/form-field';
import { MatButtonModule} from '@angular/material/button';
import { MatInputModule } from '@angular/material/input';
import {ForgotPasswordDialog} from '../signuplogin/components/forgotpassword.component';
import {HttpClientModule,HTTP_INTERCEPTORS} from '@angular/common/http';
import { GlobalHttpInterceptorService} from '../../core/interceptors/global-http-interceptor.service';
import {SignupRoutingModule} from './loginsignup-routing.module';
import { HttpService } from '../../shared/services/http.service';
import {ActivitiesComponent} from '../signuplogin/components/activities.component';
import {MatChipsModule} from '@angular/material/chips';
import {ConfirmEqualValidatorDirective} from '../../shared/directives/confirm-equal-validator.directive';
import {PasswordValidatorDirective} from '../../shared/directives/confirm-equal-validator.directive';
import { MatIconModule } from '@angular/material/icon';



@NgModule({
  declarations: [
    LoginsignupComponent,
    ResetComponent,
    ForgotPasswordDialog,
    EditprofileComponent,
    ActivitiesComponent
    ConfirmEqualValidatorDirective,
    PasswordValidatorDirective
  ],
  imports: [
    MatChipsModule,
    CommonModule,
    FormsModule,
    MatButtonModule,
    MatDialogModule,
    MatInputModule,
    MatFormFieldModule,
    HttpClientModule,
    MatIconModule,
    MatChipsModule,
    SignupRoutingModule
  ],
  providers: [HttpService,{ provide: HTTP_INTERCEPTORS, useClass: GlobalHttpInterceptorService, multi: true  }],
  entryComponents: [ForgotPasswordDialog],
  bootstrap: [LoginsignupComponent]
})
export class LoginSignUpModule { }
