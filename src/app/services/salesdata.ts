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
class Group {
  id: String;
  title: String;
}
@Injectable()
export class SalesDataService {
  postUrl = 'http://gswdev.com/sales_targets/router.php';
  groups: Group[] = [
    {
      id: '2',
      title: '30000'
    },
    {
      id: '4',
      title: '13000'
    },
    {
      id: '5',
      title: '3500'
    },
    {
      id: '6',
      title: '1500'
    }
  ];

  constructor(
    private http: HttpClient) {
  }
  getGroups(): Group[] {
    return this.groups
  }
  getStores(params): Observable<any> {
    return this.http.post<any>(this.postUrl, params, httpOptions)
  }

  getActuals(params): Observable<any> {
    return this.http.post<any>(this.postUrl, params, httpOptions)
  }

  getActualvsTarget(params): Observable<any> {
    return this.http.post<any>(this.postUrl, params, httpOptions)
  }
  getTargets(params): Observable<any> {
    return this.http.post<any>(this.postUrl, params, httpOptions)
  }
  getReseller(params): Observable<any> {
    return this.http.post<any>(this.postUrl, params, httpOptions)
  }
  setTarget(params): Observable<any> {
    return this.http.post<any>(this.postUrl, params, httpOptions)
  }
}


/*
Copyright 2017-2018 Google Inc. All Rights Reserved.
Use of this source code is governed by an MIT-style license that
can be found in the LICENSE file at http://angular.io/license
*/
