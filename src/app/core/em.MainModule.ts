import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { AuthenticationService } from './../shared/services/authentication.service';
import { AppRoutingModule } from './em-routing.module';
import { AppComponent } from './em.component';
import {HomeModule} from './../modules/home/home.module';
import {LoginSignUpModule} from './../modules/signuplogin/loginsignup.module';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import {NavigationComponent} from './../modules/navigation/navigation.component';


@NgModule({
  declarations: [
    AppComponent,
    NavigationComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HomeModule,
    LoginSignUpModule,
    BrowserAnimationsModule
  
  ],
  providers: [AuthenticationService],
  bootstrap: [AppComponent]
})
export class AppModule { }
