import {Component, OnDestroy, OnInit} from '@angular/core';
import {UserModel} from './api-interface/user.model';
import {Subscription} from 'rxjs';
import {UserService} from './service/user.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit, OnDestroy{
  title = 'The Intuitive Programmer';

  user: UserModel | null = null;
  userEventsSubscription: Subscription | null = null;

  public constructor(private userService: UserService,
                     private postService: PostService) {
  }

  ngOnInit(): void {
    this.userEventsSubscription = this.userService.userEvents.subscribe(user => (this.user = user));
    this.userService.retrieveUser();
  }

  ngOnDestroy(): void {
    this.userEventsSubscription?.unsubscribe();
  }

  logout(): void {
    this.userService.logout();
  }

}
