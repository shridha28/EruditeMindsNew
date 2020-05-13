import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class AuthenticationService {

  constructor() { }

  isUserLoggedIn() {
    let token = sessionStorage.getItem('token');
    return !(token === null)
  }

  logOut() {
    sessionStorage.removeItem('token');
  }
}
