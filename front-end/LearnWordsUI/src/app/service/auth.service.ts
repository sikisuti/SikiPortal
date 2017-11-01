import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';

import { Observable } from 'rxjs/Observable';
import 'rxjs/Rx';

@Injectable()
export class AuthService {
  isLoggedIn = false;

  // store the URL so we can redirect after logging in
  redirectUrl: string;

  constructor(private http: HttpClient) {}

  isAuthenticated(): Observable<boolean> {
    return this.http.get('/authorization/check').map(body => {
      console.log(body);
      this.isLoggedIn = body['Authorized'];

      return body['Authorized'];
    });
  }

  login(username: string, password: string): Observable<object> {
    // console.log('username: ' + username + ' password: ' + password);
    const data = {
      'username': username,
      'password': password
    };

    const config = {
              headers : new HttpHeaders({ 'Content-Type': 'application/json' })
          };


    return this.http.post('/authorization/login', data, config).map(result => {
      this.isLoggedIn = true;
      return result;
    });
  }

  logout(): void {
  }
}
