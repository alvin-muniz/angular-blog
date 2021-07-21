import { TestBed } from '@angular/core/testing';

import { JwtInterceptor } from './jwt.interceptor';
import {HttpHandler, HttpRequest} from '@angular/common/http';

describe('JwtInterceptor', () => {
  beforeEach(() => TestBed.configureTestingModule({
    providers: [
      JwtInterceptor
      ]
  }));

  it('should be created', () => {
    const interceptor: JwtInterceptor = TestBed.inject(JwtInterceptor);
    expect(interceptor).toBeTruthy();
  });

  it('should do nothing if no jwt token', ()=>{
    const jwtService = new JwtInterceptor();
    const req = new HttpRequest('GET', '/');
    const next = jasmine.createSpyObj<HttpHandler>('HttpHandler',['handle']);
    jwtService.intercept(req, next);
    const nextReq = (next.handle as jasmine.Spy).calls.argsFor(0)[0] as HttpRequest<unknown>;
    expect(nextReq.headers.get('Authorization')).toBeNull();
  });

  it('should set a jwt token', () => {
    const jwtService = new JwtInterceptor();
    const req = new HttpRequest('GET', '/');
    const next = jasmine.createSpyObj<HttpHandler>('HttpHandler',['handle']);
    jwtService.setJwtToken('token');
    jwtService.intercept(req, next);
    const nextReq = (next.handle as jasmine.Spy).calls.argsFor(0)[0] as HttpRequest<unknown>;
    expect(nextReq.headers.get('Authorization')).toEqual('Bearer token');
  });

  it('should remove a jwt token', () => {
    const jwtService = new JwtInterceptor();
    const req = new HttpRequest('GET', '/');
    const next = jasmine.createSpyObj<HttpHandler>('HttpHandler',['handle']);
    jwtService.setJwtToken('token');
    jwtService.removeJwtToken();
    jwtService.intercept(req, next);
    const nextReq = (next.handle as jasmine.Spy).calls.argsFor(0)[0] as HttpRequest<unknown>;
    expect(nextReq.headers.get('Authorization')).toBeNull();
  });




});
