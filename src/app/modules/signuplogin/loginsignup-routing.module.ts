import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { ResetComponent } from "./components/reset.component";
import { LoginsignupComponent } from "./components/loginsignup.component";
import { EditprofileComponent } from './components/editprofile.component';
import { ActivitiesComponent } from './components/activities.component';
import { LoginComponent } from './components/login.component';
import { componentFactoryName } from '@angular/compiler';

const routes: Routes = [
    {
    path:'',
    component:LoginComponent
   },
     {
       path:'reset',
       component:ResetComponent
     },
     {
       path:'editProfile',
       component:EditprofileComponent
     },
     {
       path:'activities',
       component:ActivitiesComponent
     },
     {
        path:'login',
        component :LoginComponent

     }
]

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class SignupRoutingModule { }
