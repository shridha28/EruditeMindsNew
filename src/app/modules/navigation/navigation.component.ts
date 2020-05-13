import { Component, OnInit } from '@angular/core';
import {AuthenticationService} from '../../shared/services/authentication.service';
import { Router, ActivatedRoute } from '@angular/router';

@Component({
  selector: 'em-navigation',
  templateUrl: './navigation.component.html',
  styleUrls: ['./navigation.component.scss']
})
export class NavigationComponent implements OnInit {

  constructor(public loginService:AuthenticationService,
    private router: Router) { }

  ngOnInit(): void {
  }
   logout(){
    this.loginService.logOut();
    this.router.navigateByUrl('/');
   }
}
