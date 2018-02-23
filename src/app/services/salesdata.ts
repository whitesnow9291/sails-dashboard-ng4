import { Injectable } from '@angular/core';

import { Observable } from 'rxjs/Observable';
import 'rxjs/add/observable/of';
import 'rxjs/add/operator/do';
import 'rxjs/add/operator/delay';
import { HttpClient, HttpParams } from '@angular/common/http';
import { HttpHeaders } from '@angular/common/http';
class Group {
  id: String;
  title: String;
}
@Injectable()
export class SalesDataService {
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
  getGroups(): Group[] {
    return this.groups
  }
  getStores(): Observable<any> {
    return Observable.of(true).delay(1000).do(val =>  true);
  }

  getActuals(): Observable<any> {
    return Observable.of(true).delay(1000).do(val =>  true);
  }

  getActualvsTarget(): Observable<any> {
    return Observable.of(true).delay(1000).do(val =>  true);
  }
  getTargets(): Observable<any> {
    return Observable.of(true).delay(1000).do(val =>  true);
  }
  getReseller(): Observable<any> {
    return Observable.of(true).delay(1000).do(val =>  true);
  }
  setTarget(): Observable<any> {
    return Observable.of(true).delay(1000).do(val =>  true);
  }
}


/*
Copyright 2017-2018 Google Inc. All Rights Reserved.
Use of this source code is governed by an MIT-style license that
can be found in the LICENSE file at http://angular.io/license
*/
