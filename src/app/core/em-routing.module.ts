import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import {HomeComponent} from './../modules/home/components/home.component';
import {LoginsignupComponent} from './../modules/signuplogin/components/loginsignup.component';
import {ResetComponent} from './../modules/signuplogin/components/reset.component';
const routes: Routes = [
  {
    path:'',
    component:HomeComponent
  },
  {
    path:'loginsignup',
    component:LoginsignupComponent
  },
  {
    path:'reset',
    component:ResetComponent
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
