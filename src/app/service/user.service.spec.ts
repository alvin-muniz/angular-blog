import { TestBed } from '@angular/core/testing';

import { UserService } from './user.service';
import {HttpClientTestingModule, HttpTestingController} from '@angular/common/http/testing';
import {JwtInterceptor} from '../jwt.interceptor';
import {UserModel} from '../api-interface/user.model';


describe('UserService', () => {
  let userService: UserService;

  // test the http client
  let http: HttpTestingController;

  // will intercept the incoming requests and apply proper header to them
  let jwtInterceptor: JwtInterceptor;

  const user = {
    id: 1,
    username: 'alvin',
    password: '12345',
    token: 'eyJhbGciOiJIUzI1NiJ9.eyJ1c2VySWQiOjF9.5cAW816GUAg3OWKWlsYyXI4w3fDrS5BpnmbyBjVM7lo'
  };

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule]
    });
  });

  beforeEach(() => {
    userService = TestBed.inject(UserService);
    http = TestBed.inject(HttpTestingController);
    jwtInterceptor = TestBed.inject(JwtInterceptor);
  });

  // makes sure there are no outstanding http calls in our tests
  afterAll(() => http.verify());

  it('should be created', () => {
    expect(userService).toBeTruthy();
  });

  it('should authenticate a user', () => {
    // check that the method that stores the user is called
    spyOn(userService, 'storeLoggedInUser');
    const loginRequest = {username: 'alvin', password: '12345'};
    let actualUser: UserModel | undefined;
    userService.authenticate(loginRequest).subscribe(authToken =>
    {
      actualUser = {
        username: loginRequest.username,
        password: loginRequest.password,
        token: authToken,
        id: 1
      } as UserModel;
    });

    const req = http.expectOne({method: 'POST', url: 'http://localhost:9092/auth/users/login'});
    expect(req.request.body).toEqual(loginRequest);
    req.flush('eyJhbGciOiJIUzI1NiJ9.eyJ1c2VySWQiOjF9.5cAW816GUAg3OWKWlsYyXI4w3fDrS5BpnmbyBjVM7lo');
    expect(actualUser).withContext('The observable should emit the user').toEqual(user);
    expect(userService.storeLoggedInUser).toHaveBeenCalledWith(user);
  });

  it('should store the logged in user', () => {
    // the observable
    spyOn(userService.userEvents, 'next');
    // the default ts method for local storage
    spyOn(Storage.prototype, 'setItem');
    // spying on the interceptor
    spyOn(jwtInterceptor, 'setJwtToken');

    userService.storeLoggedInUser(user);

    expect(userService.userEvents.next).toHaveBeenCalledWith(user);
    expect(Storage.prototype.setItem).toHaveBeenCalledWith('loggedInUser', JSON.stringify(user));
    expect(jwtInterceptor.setJwtToken).toHaveBeenCalledWith(user.token);
  });

  it('should retrieve a user if one is stored', () => {
    spyOn(Storage.prototype, 'getItem');
    spyOn(jwtInterceptor, 'setJwtToken');
    spyOn(userService.userEvents, 'next');

    userService.storeLoggedInUser(user);

    userService.retrieveUser();
    expect(Storage.prototype.getItem).toHaveBeenCalledWith('loggedInUser');
    expect(userService.userEvents.next).toHaveBeenCalledWith(user);
    expect(jwtInterceptor.setJwtToken).toHaveBeenCalledWith(user.token);
  });

  it('should retrieve no user is none is stored', () => {
    spyOn(Storage.prototype, 'getItem');
    spyOn(jwtInterceptor, 'setJwtToken');
    spyOn(userService.userEvents, 'next');

    userService.retrieveUser();

    expect(Storage.prototype.getItem).toHaveBeenCalledWith('loggedInUser');
    expect(jwtInterceptor.setJwtToken).not.toHaveBeenCalled();
    expect(userService.userEvents.next).not.toHaveBeenCalled();
  });

  it('should log out a user', () => {
    spyOn(Storage.prototype, 'removeItem');
    spyOn(jwtInterceptor, 'removeJwtToken');
    spyOn(userService.userEvents, 'next');

    userService.logout();

    expect(Storage.prototype.removeItem).toHaveBeenCalledWith('loggedInUser');
    expect(userService.userEvents.next).toHaveBeenCalledWith(null);
    expect(jwtInterceptor.removeJwtToken).toHaveBeenCalled();

  });


});
