import {Injectable} from '@angular/core';
import {JwtInterceptor} from '../jwt.interceptor';
import {HttpClient} from '@angular/common/http';
import {BehaviorSubject, Observable} from 'rxjs';
import {UserModel} from '../api-interface/user.model';
import {tap} from 'rxjs/operators';
import {JwtResponse, LoginRequestModel} from '../api-interface/login-request.model';

@Injectable({
  providedIn: 'root'
})
export class UserService {
  userEvents = new BehaviorSubject<UserModel | null>(null);

  BASE_URL = 'http://localhost:9092';

  // injecting the client and the interceptor
  constructor(private http: HttpClient, private httpInterceptor: JwtInterceptor) {

  }

  authenticate(loginRequest: LoginRequestModel): Observable<JwtResponse> {
    return this.http.post<JwtResponse>(`http://localhost:9092/auth/users/login`, loginRequest);
  }

  loginUser(loginRequest: LoginRequestModel):  Observable<JwtResponse>  {
   return this.http
      .post<JwtResponse>(`${(this.BASE_URL)}/auth/users/login`, loginRequest);
     // .subscribe((response) => {
     //   console.log(response, 'by itself ');
     //
     //   // const currentUser = {
     //   //   username: loginRequest.username,
     //   //   token: response.jwt,
     //   // };
     //   this.storeLoggedInUser(currentUser);
     //   this.userEvents.next(currentUser);
     // }, error => console.log(error));
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
