import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { Validator, NG_VALIDATORS, AbstractControl,FormGroup } from '@angular/forms';


@Injectable({
  providedIn: 'root'
})
export class UtilityService{

  toggle1: boolean = false;
  toggle2: boolean = false;
  toggle3: boolean = false;
  

  public matchPassword(group: AbstractControl): { [key: string]: any } | null {
    const passwordControl = group.get("password")
    const confirmPasswordControl = group.get("confirm_password");
    if (passwordControl.value === confirmPasswordControl.value || confirmPasswordControl.pristine) {
      return null;
    }
    
      return { "passwordMismatch": true }
    
  }

  public  passwordStrength(control:AbstractControl):{[key:string]:any}|null{
  
  const Regex_exp = /^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#\$%\^&\*])(?=.{8,})/;
    if(control.value ==='' || Regex_exp.test(control.value)){
        return null;
    }
    return {'invalidPassword':true};
  }


  public showPassword(input_password, num) {
    if (input_password.type == 'password') {
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

  constructor() { }
}
