import {Injectable} from '@angular/core';
import {JwtInterceptor} from '../jwt.interceptor';
import {HttpClient} from '@angular/common/http';
import {BehaviorSubject, Observable} from 'rxjs';
import {UserModel} from '../api-interface/user.model';
import {tap} from 'rxjs/operators';
import {LoginResponse, LoginRequestModel} from '../api-interface/login-request.model';

@Injectable({
  providedIn: 'root'
})
export class UserService {
  userEvents = new BehaviorSubject<UserModel | null>(null);

  BASE_URL = 'http://localhost:9092';

  // injecting the client and the interceptor
  constructor(private http: HttpClient, private httpInterceptor: JwtInterceptor) {

  }

  authenticate(loginRequest: LoginRequestModel): Observable<LoginResponse> {
    return this.http.post<LoginResponse>(`http://localhost:9092/auth/users/login`, loginRequest);
  }

  loginUser(loginRequest: LoginRequestModel): Observable<LoginResponse>  {
   return this.http
      .post<LoginResponse>(`${(this.BASE_URL)}/auth/users/login`, loginRequest);
  }

  storeLoggedInUser(user: UserModel): void {
    this.userEvents.next(user);
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

}
