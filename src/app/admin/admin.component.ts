import {Component, OnDestroy, OnInit} from '@angular/core';
import {Subscription} from 'rxjs';
import {UserModel} from '../api-interface/user.model';
import {UserService} from '../service/user.service';
import {Router} from '@angular/router';

@Component({
  selector: 'app-admin',
  templateUrl: './admin.component.html',
  styleUrls: ['./admin.component.scss']
})
export class AdminComponent implements OnInit, OnDestroy {

  user: UserModel | null = null;
  userEventsSubscription: Subscription | null = null;

  constructor(private userService: UserService) {

  }

  ngOnInit(): void {
    this.userEventsSubscription = this.userService.userEvents.subscribe(user => (this.user = user));
    this.userService.retrieveUser();
  }

  ngOnDestroy(): void {
    this.userEventsSubscription?.unsubscribe();
  }

}
