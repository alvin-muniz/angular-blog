import { Injectable } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor
} from '@angular/common/http';
import { Observable } from 'rxjs';

// TODO: Provide the interceptor in root

interface JwtResponse {
  jwt: string;
}

@Injectable({providedIn: 'root'})
export class JwtInterceptor implements HttpInterceptor {

  // TODO token variables to store the results
  token: JwtResponse | null = null;

  constructor() {}

  intercept(request: HttpRequest<unknown>, next: HttpHandler): Observable<HttpEvent<unknown>> {
    // if a token is present, then set it to the header

    if ( this.token ) {
      console.log(this.token.jwt, 'print');
      const clone = request.clone({ setHeaders: {Authorization: `Bearer ${this.token.jwt}` } });
      console.log(clone, 'Interceptor Headers');
      return next.handle(clone);
    }
    return next.handle(request);
  }

  setJwtToken(token: string): void {
    const responseToken = {
      jwt: token
    } as JwtResponse;


    console.log(responseToken.jwt);
    this.token = responseToken;
  }

  removeJwtToken(): void {
    this.token = null;
  }

}


