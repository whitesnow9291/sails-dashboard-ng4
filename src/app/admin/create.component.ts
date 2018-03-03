import { Component, OnInit } from '@angular/core';
import { Router, NavigationExtras } from '@angular/router';
import { AuthService } from '../services/auth.service'
import { SalesDataService } from '../services/salesdata';

@Component({
  templateUrl: 'create.component.html'
})
export class CreateComponent implements OnInit {

  message: String
  stores: any;
  roles: any;

  // ngmodel

  user: any
  constructor(public router: Router, public authService: AuthService, public salesdata: SalesDataService) { }
  ngOnInit () {
    this.message = 'Create your account'

    const params = {
      'command': 'getStores'
    }
    this.stores = this.salesdata.getStores(params)
    this.roles = this.salesdata.getRoles()
    this.user = {
      'username': '',
      'email': '',
      'password': '',
      'password_conf': '',
      'role': -1,
      'store': -1
    }
  }

  onRoleChange(newValue) {
    this.user.role = newValue;  // don't forget to update the model here
  }
  onStoreChange(newValue) {
    this.user.store = newValue;  // don't forget to update the model here
  }
  createAccount() {
    this.message = 'Trying to create account ...';
    if (this.validateForm()) {
      const params = {
        'user': this.user,
        'command': 'register'
      }
      this.authService.register(params).subscribe((result) => {
        if (result.result === false) {
          this.message = result.error
        } else {
          this.message = 'successfully created!'
          alert('successfully created!')
        }
      });
    }
  }
  validateForm() {
    const username = this.user.username
    const email = this.user.email
    const password = this.user.password
    const password_conf = this.user.password_conf
    const store = Number(this.user.store)
    const role = Number(this.user.role)

    if (username.length < 4) {
      this.message = 'Username must be at least 4 letters'
      return false
    }
    if (password.length < 6) {
      this.message = 'Password must be at least 6 letters'
      return false
    }
    if (password !== password_conf) {
      this.message = 'Password confirmation did not matched'
      return false
    }
    if (!this.validateEmail(email)) {
      this.message = 'Email validation faild'
      return false
    }
    if (role < 0 ) {
      this.message = 'Please choose role'
      return false
    }
    if (role === 3 && store < 0) {
      this.message = 'Please choose store'
      return false
    }
    return true
  }
  validateEmail(email) {
    var re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    return re.test(String(email).toLowerCase());
  }

}
