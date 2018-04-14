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
  postUrl = 'https://gswdev.com/sales_targets/router.php';
  groups: Group[] = [
    {
      id: '6',
      title: '30000'
    },
    {
      id: '2',
      title: '13000'
    },
    {
      id: '4',
      title: '3500'
    },
    {
      id: '5',
      title: '1500'
    },
    {
      id: '0',
      title: 'All groups'
    }
  ];
  stores: any = [
    {store_id: '1', code: 'en', website_id: '1', group_id: '1', name: 'Online'},
    {store_id: '5', code: 'retail_en', website_id: '3', group_id: '3', name: 'Retail'},
    {store_id: '6', code: 'reseller_en', website_id: '2', group_id: '4', name: 'Reseller'},
    {store_id: '7', code: 'pos_en', website_id: '4', group_id: '5', name: 'POS'},
    {store_id: '9', code: 'dropship_en', website_id: '7', group_id: '7', name: 'Dropship'},
    {store_id: '11', code: 'facebook_en', website_id: '8', group_id: '9', name: 'Facebook'},
    {store_id: '12', code: 'divanah_en', website_id: '9', group_id: '10', name: 'Divanah'}
]
  admin_roles: any = [{
    'id' : 1,
    'name' : 'Admin'
  }, {
    'id' : 2,
    'name' : 'Supervisor'
  }, {
    'id' : 3,
    'name' : 'Staff'
  }]
  constructor(
    private http: HttpClient) {
  }
  getGroups(): Group[] {
    return this.groups
  }
  getStores(params): Observable<any> {
    return this.stores
  }
  getRoles(): Observable<any> {
    return this.admin_roles
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
  setTargetOfStaff(params): Observable<any> {
    return this.http.post<any>(this.postUrl, params, httpOptions)
  }
  getUserList(params): Observable<any> {
    return this.http.post<any>(this.postUrl, params, httpOptions)
  }
  removeUser(params): Observable<any> {
    return this.http.post<any>(this.postUrl, params, httpOptions)
  }
  updateUser(params): Observable<any> {
    return this.http.post<any>(this.postUrl, params, httpOptions)
  }
  saveCampaign(params): Observable<any> {
    return this.http.post<any>(this.postUrl, params, httpOptions)
  }
  getCampaigns(params): Observable<any> {
    return this.http.post<any>(this.postUrl, params, httpOptions)
  }
  removeCampaign(params): Observable<any> {
    return this.http.post<any>(this.postUrl, params, httpOptions)
  }
  getSoldAndSalesOfStore(params): Observable<any> {
    return this.http.post<any>(this.postUrl, params, httpOptions)
  }
}


/*
Copyright 2017-2018 Google Inc. All Rights Reserved.
Use of this source code is governed by an MIT-style license that
can be found in the LICENSE file at http://angular.io/license
*/
