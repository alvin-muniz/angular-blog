import {ComponentFixture, fakeAsync, TestBed, tick} from '@angular/core/testing';

import { LoginComponent } from './login.component';
import {FormsModule} from '@angular/forms';
import {HttpClientTestingModule} from '@angular/common/http/testing';
import {RouterTestingModule} from '@angular/router/testing';

describe('LoginComponent', () => {

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [FormsModule, HttpClientTestingModule, RouterTestingModule],
      declarations: [ LoginComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {

  });

  it('should create', () => {
    const fixture = TestBed.createComponent(LoginComponent);
    const componentInstance = fixture.componentInstance;
    expect(componentInstance).toBeTruthy();
  });

  it('should have a title', () => {
    const fixture = TestBed.createComponent(LoginComponent);
    // triggering change detection after creating the component
    const element = fixture.nativeElement;
    expect(element.querySelector('h1')).withContext('The template should have an h1 tag').not.toBeNull();
    expect(element.querySelector('h1').textContent).withContext('The title should be `Log in`').toContain('Log in');
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


});
