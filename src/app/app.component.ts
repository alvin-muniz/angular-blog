import {Component, OnDestroy, OnInit} from '@angular/core';
import {UserModel} from './api-interface/user.model';
import {Subscription} from 'rxjs';
import {UserService} from './service/user.service';
import {PostService} from './service/post.service';
import {PostModel} from './api-interface/post.model';
import {ContentComponent} from './content/content.component';
import {AdminComponent} from './admin/admin.component';
import {Router} from '@angular/router';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit, OnDestroy{
  title = 'The Intuitive Programmer';

  // postList?: PostModel[] | null = null;
  // currentPost?: PostModel | null = null;
  user: UserModel | null = null;
  userEventsSubscription: Subscription | null = null;
  // currentPostListEventsSubscription: Subscription | null = null;
  public constructor(private userService: UserService,
                     private postService: PostService,
                     private router: Router) {
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
