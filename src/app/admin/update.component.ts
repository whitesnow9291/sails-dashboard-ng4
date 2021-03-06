import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { SalesDataService } from '../services/salesdata';

@Component({
  templateUrl: 'update.component.html'
})
export class UpdateComponent implements OnInit {

  message: String;
  stores: any;
  roles: any;

  // ngmodel

  user: any
  constructor(private route: ActivatedRoute,
    private router: Router, public salesdata: SalesDataService ) {
      this.route
      .queryParams
      .subscribe(params => {
        // Defaults to 0 if no query param provided.
        this.user = {
          'username': params.display_name,
          'email': params.email,
          'password': '',
          'password_conf': '',
          'role': params.role_id,
          'store': params.store_ids,
          'user_id': params.user_id,
          'editable': params.editable
        }
        console.log(this.user)
      });
  }
  ngOnInit () {
    this.message = 'Update your account'
    const params = {
      'command': 'getStores'
    }
    this.stores = this.salesdata.getStores(params)
    this.roles = this.salesdata.getRoles()

  }
  onRoleChange(newValue) {
    this.user.role = newValue;  // don't forget to update the model here
  }
  onStoreChange(newValue) {
    this.user.store = newValue;  // don't forget to update the model here
  }
  onEditableChange(newValue) {
    this.user.editable = newValue;  // don't forget to update the model here
  }
  updateAccount() {
    this.message = 'Trying to update account ...';
    if (this.validateForm()) {
      const params = {
        'user': this.user,
        'command': 'updateUser'
      }
      this.salesdata.updateUser(params).subscribe((result) => {
        if (result.result === false) {
          this.message = result.error
        } else {
          this.message = 'successfully updated'
          alert('successfully updated');
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
    if (password.length > 0 && password.length < 6) {
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
