import { Component, OnInit } from '@angular/core';
import {DataService} from '../../../shared/services/data-service.service';

@Component({
  selector: 'app-activities',
  templateUrl: '../pages/activities.component.html',
  styleUrls: ['../loginsignup.component.css']
})
export class ActivitiesComponent implements OnInit {

  constructor(private transferService:DataService) { }

  ngOnInit(): void {
    if(localStorage.getItem('currentUser'))
    this.transferService.isUserLoggedIn.next(true);
  }

}
