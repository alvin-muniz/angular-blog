import { TestBed } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { AppComponent } from './app.component';
import {PostDetailViewComponent} from './post-detail-view/post-detail-view.component';
import {HttpClientTestingModule} from '@angular/common/http/testing';
import {UserService} from './service/user.service';
import {BehaviorSubject, Subject} from 'rxjs';
import {UserModel} from './api-interface/user.model';
import {Router} from '@angular/router';
import {By} from '@angular/platform-browser';
import {PostService} from './service/post.service';
import {LoginComponent} from './admin/login/login.component';

describe('AppComponent', () => {

  /* faking the user service and adding methods to test against it.
  *  We are saying, explicitly what we want the UserService to be and
  * are going to be testing against that.
  * The methods can be blank as they are just stubs of actual implementation */

  const fakeUserService = {
    userEvents: new BehaviorSubject<UserModel | null>(null),
    logout: () => {},
    retrieveUser: () => {}
  } as UserService;
  const fakePostService = {
    retrievePosts: () => {}
  } as PostService;
  const fakeRouter = {} as Router;
  // const fakeRouter = jasmine.createSpyObj<Router>('Router', ['navigate']);

  beforeEach( () => {
    TestBed.configureTestingModule({
      imports: [
        RouterTestingModule,
        HttpClientTestingModule
      ],
      declarations: [
        AppComponent, PostDetailViewComponent
      ],
      providers: [{provide: UserService, useValue: fakeUserService}]
    }).compileComponents();
  });

  it('should create the app', () => {
    const fixture = TestBed.createComponent(AppComponent);
    const app = fixture.componentInstance;
    expect(app).toBeTruthy();
  });

  it(`should have as title 'The Intuitive Programmer'`, () => {
    const fixture = TestBed.createComponent(AppComponent);
    const app = fixture.componentInstance;
    expect(app.title).toEqual('The Intuitive Programmer');
  });

  it('should listen to userEvents in ngOnInit', () => {
    const component = new AppComponent(fakeUserService, fakePostService, fakeRouter);
    component.ngOnInit();

    const user = {username: 'login', id: 1, token: 'eyJhbGciOiJIUzI1NiJ9.eyJ1c2VySWQiOjF9.5cAW816GUAg3OWKWlsYyXI4w3fDrS5BpnmbyBjVM7lo'} as UserModel;

    fakeUserService.userEvents.next(user);

    fakeUserService.userEvents.subscribe(() => {
      expect(component.user).toBe(user);
    });

  });

  describe('User logged in', () => {
    beforeEach(() => {
      const component = new LoginComponent(fakeUserService, fakeRouter);
      component.ngOnInit();

      const user = {username: 'login', id: 1, token: 'eyJhbGciOiJIUzI1NiJ9.eyJ1c2VySWQiOjF9.5cAW816GUAg3OWKWlsYyXI4w3fDrS5BpnmbyBjVM7lo'} as UserModel;

      fakeUserService.userEvents.next(user);
    });

    it('should display the logged in user', () => {
      const fixture = TestBed.createComponent(AppComponent);

      const component = fixture.componentInstance;

      fixture.detectChanges();

      // this accesses the elements in the dom for query selection
      const element = fixture.nativeElement;

      const userInfo = element.querySelector('.login-display');
      expect(userInfo).not.toBeNull();

    });

    it('should display the logged in user', () => {
      const fixture = TestBed.createComponent(AppComponent);

      const component = fixture.componentInstance;

      component.user = {username: 'login', id: 1, token: 'eyJhbGciOiJIUzI1NiJ9.eyJ1c2VySWQiOjF9.5cAW816GUAg3OWKWlsYyXI4w3fDrS5BpnmbyBjVM7lo'} as UserModel;

      fixture.detectChanges();
      // this accesses the elements in the dom for query selection
      const element = fixture.nativeElement;

      const userInfo = element.querySelector('.login-display');
      expect(userInfo).not.toBeNull();

    });

    it('should display a logout button', () => {
      const fixture = TestBed.createComponent(AppComponent);
      const component = fixture.componentInstance;
      component.user = {username: 'login', id: 1, token: 'eyJhbGciOiJIUzI1NiJ9.eyJ1c2VySWQiOjF9.5cAW816GUAg3OWKWlsYyXI4w3fDrS5BpnmbyBjVM7lo'} as UserModel;
      spyOn(component, 'logout');
      const element = fixture.nativeElement;
      fixture.detectChanges();
      const logoutBtn = element.querySelector('#logout-btn');

      expect(logoutBtn).not.toBeNull();

      logoutBtn.dispatchEvent(new Event('click'));


      expect(fixture.componentInstance.logout).toHaveBeenCalled();

    });
  });





});

function displayLoggedInUser(): void {
  const fixture = TestBed.createComponent(AppComponent);

  const component = fixture.componentInstance;
  component.user =     component.user = {username: 'alvin', password: 'hello', id: 1, token: '12345'} as UserModel;
  fixture.detectChanges();
}
