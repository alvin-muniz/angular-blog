import {ComponentFixture, fakeAsync, TestBed, tick} from '@angular/core/testing';

import { LoginComponent } from './login.component';
import {FormsModule} from '@angular/forms';
import {HttpClientTestingModule} from '@angular/common/http/testing';
import {RouterTestingModule} from '@angular/router/testing';
import {UserModel} from '../../api-interface/user.model';
import {BehaviorSubject, Observable, of, Subject} from 'rxjs';
import {UserService} from '../../service/user.service';
import {Router} from '@angular/router';
import {LoginRequestModel, LoginResponse} from '../../api-interface/login-request.model';

describe('LoginComponent', () => {
  const fakeRouter = jasmine.createSpyObj<Router>('Router', ['navigate']);
  // const fakeUserService = jasmine.createSpyObj<UserService>
  const fakeUserService = {
    userEvents: new BehaviorSubject<UserModel | null>(null),
    logout: () => {},
    retrieveUser: () => {},
    storeLoggedInUser(user: UserModel): void {
    },
    loginUser(loginRequest: LoginRequestModel): Observable<LoginResponse> {
      return of({
        id: 1,
        jwt: 'eyJhbGciOiJIUzI1NiJ9.eyJ1c2VySWQiOjF9.5cAW816GUAg3OWKWlsYyXI4w3fDrS5BpnmbyBjVM7lo'
      }as LoginResponse);
    },
    authenticate(loginRequest: LoginRequestModel): Observable<LoginResponse> {
      return of({
        id: 1,
        jwt: 'eyJhbGciOiJIUzI1NiJ9.eyJ1c2VySWQiOjF9.5cAW816GUAg3OWKWlsYyXI4w3fDrS5BpnmbyBjVM7lo'
      }as LoginResponse);
    }
  } as UserService;

  beforeEach(() =>
      TestBed.configureTestingModule({
      imports: [FormsModule, HttpClientTestingModule, RouterTestingModule],
      declarations: [ LoginComponent ],
      providers: [
        {provide: UserService, useValue: fakeUserService},
        {provide: Router, useValue: fakeRouter }
      ]
    })
  );

  beforeEach(() => {
    fakeRouter.navigate.calls.reset();
    // fakeUserService.authenticate.calls.reset();
  });

  it('should create', () => {
    const fixture = TestBed.createComponent(LoginComponent);
    const componentInstance = fixture.componentInstance;
    expect(componentInstance).toBeTruthy();
  });

  it('should have loginRequest field', () => {
    const fixture = TestBed.createComponent(LoginComponent);

    // trigger change detection
    fixture.detectChanges();

    // we should have a field loginRequest
    const componentInstance = fixture.componentInstance;

    expect(componentInstance.loginRequest).withContext('Your component should have a field loginRquest intialized with an object')
      .not.toBeNull();
    expect(componentInstance.loginRequest.username)
      .withContext('Your loginRequest object should have a username field initialized and empty upon intialization')
      .toBe('');
    expect(componentInstance.loginRequest.password)
      .withContext('Your loginRequest object should have a password field initialized and empty upon intialization')
      .toBe('');

  });

  it('should be possible to log in if the form is complete', () => {
    const fixture = TestBed.createComponent(LoginComponent);

    fixture.detectChanges();

    const element = fixture.nativeElement;
    const loginInput = element.querySelector('input[name="username"]');
    expect(loginInput).withContext('You shoudl have an input with name `username`').not.toBeNull();
    loginInput.value = 'username';
    loginInput.dispatchEvent(new Event('input'));
    const passwordInput = element.querySelector('input[name="password"]');
    expect(passwordInput).withContext('You should have an input with name `password`').not.toBeNull();
    passwordInput.value = 'password';
    passwordInput.dispatchEvent(new Event('input'));

    // trigger the change detection above
    fixture.detectChanges();

    expect(element.querySelector('button').hasAttribute('disabled'))
      .withContext('The button should be enabled if the form is valid')
      .toBeFalse();

  });

  it('should disable the log in button if the form is incomplete', fakeAsync(() => {
    const fixture = TestBed.createComponent(LoginComponent);

    tick();
    fixture.detectChanges();
    tick();
    fixture.detectChanges();

    const element = fixture.nativeElement;

    expect(element.querySelector('button'))
      .withContext('should have a log in button').not.toBeNull();
    expect(element.querySelector('button').hasAttribute('disabled')).withContext('should be disabled if invalid')
      .toBe(true);
  }));

  it('should call the user service and redirect if successful', () => {
    const fixture = TestBed.createComponent(LoginComponent);
    fixture.detectChanges();
    const subject = new Subject<UserModel>();

    spyOn(fakeUserService, 'authenticate').and.callThrough();

    const componentInstance = fixture.componentInstance;
    componentInstance.loginRequest.username = 'login';
    componentInstance.loginRequest.password = 'password';

    componentInstance.authenticate();

    expect(fakeUserService.authenticate).toHaveBeenCalledWith(componentInstance.loginRequest);

    subject.next({} as UserModel );

    expect(componentInstance.authenticationFailed)
      .withContext('You should have a field `authenticationFailed` set to false if registration succeeded')
      .toBe(false);
    expect(fakeRouter.navigate).toHaveBeenCalledWith(['admin']);


  });

  it('should login the user and call user service', () => {
    const fixture = TestBed.createComponent(LoginComponent);
    fixture.detectChanges();
    const subject = new Subject<UserModel>();

    spyOn(fakeUserService, 'loginUser').and.callThrough();
    spyOn(fakeUserService, 'storeLoggedInUser').and.callThrough();
    spyOn(fakeUserService.userEvents, 'next').withArgs(({username: 'login', id: 1, token: 'eyJhbGciOiJIUzI1NiJ9.eyJ1c2VySWQiOjF9.5cAW816GUAg3OWKWlsYyXI4w3fDrS5BpnmbyBjVM7lo'})).and.callThrough();
    const componentInstance = fixture.componentInstance;
    componentInstance.loginRequest.username = 'login';
    componentInstance.loginRequest.password = 'password';

    componentInstance.loginUser();

    expect(fakeUserService.loginUser).toHaveBeenCalledWith(componentInstance.loginRequest);
    expect(fakeUserService.storeLoggedInUser).toHaveBeenCalledWith(
      {username: 'login', id: 1, token: 'eyJhbGciOiJIUzI1NiJ9.eyJ1c2VySWQiOjF9.5cAW816GUAg3OWKWlsYyXI4w3fDrS5BpnmbyBjVM7lo'}
    );

    expect(fakeUserService.userEvents.next).toHaveBeenCalledWith(
      ({username: 'login', id: 1, token: 'eyJhbGciOiJIUzI1NiJ9.eyJ1c2VySWQiOjF9.5cAW816GUAg3OWKWlsYyXI4w3fDrS5BpnmbyBjVM7lo'})
    );


    // subject.next({username: 'login', id: 1, token: 'eyJhbGciOiJIUzI1NiJ9.eyJ1c2VySWQiOjF9.5cAW816GUAg3OWKWlsYyXI4w3fDrS5BpnmbyBjVM7lo'} as UserModel );

    expect(componentInstance.user).toEqual({username: 'login', id: 1, token: 'eyJhbGciOiJIUzI1NiJ9.eyJ1c2VySWQiOjF9.5cAW816GUAg3OWKWlsYyXI4w3fDrS5BpnmbyBjVM7lo'});
    expect(componentInstance.authenticationFailed)
      .withContext('You should have a field `authenticationFailed` set to false if registration succeeded')
      .toBe(false);
    expect(fakeRouter.navigate).toHaveBeenCalledWith(['admin']);


  });

  it('should listen to userEvents in ngOnInit', () => {
    const component = new LoginComponent(fakeUserService, fakeRouter);
    component.ngOnInit();

    const user = {username: 'login', id: 1, token: 'eyJhbGciOiJIUzI1NiJ9.eyJ1c2VySWQiOjF9.5cAW816GUAg3OWKWlsYyXI4w3fDrS5BpnmbyBjVM7lo'} as UserModel;

    fakeUserService.userEvents.next(user);

    fakeUserService.userEvents.subscribe(() => {
      expect(component.user).withContext('Your component should listen to the `userEvents` observable').toEqual(user);
    });

  });

  it('should unsubscribe on destroy', () => {
    const component = new LoginComponent(fakeUserService, fakeRouter);
    component.ngOnInit();
    spyOn(component.userEventsSubscription!, 'unsubscribe');
    component.ngOnDestroy();

    expect(component.userEventsSubscription!.unsubscribe).toHaveBeenCalled();
  });

});
