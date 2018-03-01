import { Injectable } from '@angular/core';

import { Observable } from 'rxjs/Observable';
import 'rxjs/add/observable/of';
import 'rxjs/add/operator/do';
import 'rxjs/add/operator/delay';

import { HttpClient, HttpParams } from '@angular/common/http';
import { HttpHeaders } from '@angular/common/http';
const httpOptions = {
  headers: new HttpHeaders({
    'Content-Type':  'application/json'
  })
};
@Injectable()
export class AuthService {
  isLoggedIn = false;

  postUrl = 'https://gswdev.com/sales_targets/router.php';
  // store the URL so we can redirect after logging in
  redirectUrl: string;
  constructor(
    private http: HttpClient) {
  }
  register(params): Observable<any> {
    return this.http.post<any>(this.postUrl, params, httpOptions)
  }

  login(params): Observable<any> {
    this.isLoggedIn = true
    return this.http.post<any>(this.postUrl, params, httpOptions)
  }

  logout(): void {
    this.isLoggedIn = false;
  }
}


/*
Copyright 2017-2018 Google Inc. All Rights Reserved.
Use of this source code is governed by an MIT-style license that
can be found in the LICENSE file at http://angular.io/license
*/
