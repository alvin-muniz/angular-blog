import {Component, OnChanges, OnDestroy, OnInit} from '@angular/core';
import {Router} from '@angular/router';
import {UserService} from '../../service/user.service';
import {Subscription} from 'rxjs';
import {UserModel} from '../../api-interface/user.model';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit, OnDestroy, OnChanges {

  authenticationFailed = false;

  user: UserModel | null = null;
  userEventsSubscription: Subscription | null = null;


  loginRequest = {
    username: '',
    password: ''
  };


  constructor(private userService: UserService, private router: Router) { }

  ngOnInit(): void {
    this.userEventsSubscription = this.userService.userEvents
      .subscribe(user => (this.user = user));

    console.log(this.user, 'current user in session shoudl be null');
  }

  ngOnChanges(): void {
    console.log(this.user, 'on changes');
  }

  ngOnDestroy(): void {
    this.userEventsSubscription?.unsubscribe();
  }

  loginUser(): void {
    this.userService.loginUser(
      {
        username: this.loginRequest.username,
        password: this.loginRequest.password
      }
    )
      .subscribe(response => {
          const currentUser = {
            username: this.loginRequest.username,
            token: response.jwt,
            id: response.id
          };
          this.userService.storeLoggedInUser(currentUser);
          this.userService.userEvents.next(currentUser);
          this.router.navigate(['admin']);
        },
        error => {
          this.authenticationFailed = true;
          console.log('ERROR!');
        }
      );
  }

  authenticate(): void {
    this.userService.authenticate({
      username: this.loginRequest.username,
      password: this.loginRequest.password
    })
      .subscribe(response => {
        this.router.navigate(['admin']);
      },
        error => {
        this.authenticationFailed = true;
        }
        );
  }

}
