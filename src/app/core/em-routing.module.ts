import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import {HomeComponent} from './../modules/home/components/home.component';
import {LoginsignupComponent} from '../modules/signuplogin/components/loginsignup.component';
const routes: Routes = [
  {
    path:'',
    component:HomeComponent
  },
  {
    path:'login',
    loadChildren: './../modules/signuplogin/loginsignup.module#LoginSignUpModule'
  },
  {
    path:'loginsignup',
    component:LoginsignupComponent
  },

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
