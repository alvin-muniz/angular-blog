import { Injectable } from '@angular/core';
import {JwtInterceptor} from '../jwt.interceptor';
import {HttpClient} from '@angular/common/http';
import {BehaviorSubject, Observable} from 'rxjs';
import {UserModel} from '../api-interface/user.model';
import {tap} from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class UserService {
  userEvents = new BehaviorSubject<UserModel | null>(null);

  // injecting the client and the interceptor
  constructor(private http: HttpClient, private httpInterceptor: JwtInterceptor) {

  }

  authenticate(loginRequest: {username: string; password: string}): Observable<string> {
    return this.http.post<string>(`http://localhost:9092/auth/users/login`, loginRequest)
      .pipe(tap((authToken) => {

        const user = {
          username: loginRequest.username,
          password: loginRequest.password,
          token: authToken,
          id: 1
        } as UserModel;
        this.storeLoggedInUser(user);
        console.log(user.token);
      }));
  }

  storeLoggedInUser(user: UserModel): void {
    this.userEvents.next(user);
    console.log(user, 'storelogged in user');
    this.httpInterceptor.setJwtToken(user.token);
    window.localStorage.setItem('loggedInUser', JSON.stringify(user));
  }

  retrieveUser(): void {
    const userString = window.localStorage.getItem('loggedInUser');
    if (userString) {
      const user = JSON.parse(userString) as UserModel;
      this.userEvents.next(user);
      this.httpInterceptor.setJwtToken(user.token);
    }
  }

  logout(): void {
    this.userEvents.next(null);
    window.localStorage.removeItem('loggedInUser');
    this.httpInterceptor.removeJwtToken();
  }

  // authenticate
}
