import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { ResetComponent } from "./components/reset.component";
import { LoginsignupComponent } from "./components/loginsignup.component";
import { EditprofileComponent } from './components/editprofile.component';
import { ActivitiesComponent } from './components/activities.component';

const routes: Routes = [
    {
    path:'',
    component:LoginsignupComponent
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
]

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class SignupRoutingModule { }
