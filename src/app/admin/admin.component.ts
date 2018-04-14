import { Component, ElementRef, OnInit } from '@angular/core';
import { Router, NavigationExtras } from '@angular/router';
import { SalesDataService } from '../services/salesdata';
import { AuthService } from '../services/auth.service';

@Component({
  templateUrl: 'admin.component.html'
})
export class AdminComponent implements OnInit {
  userdata: any = [];
  userrole: String [];
  current_user: any;
  constructor(public router: Router, public elRef: ElementRef, public salesdata: SalesDataService, public authservice: AuthService) { }
  ngOnInit() {
    const params = {
      'command': 'getUserList'
    }
    this.salesdata.getUserList(params)
    .subscribe(data => {
      // this.userdata = data
      this.userdata = data
      for (let i = 0; i < this.userdata.length - 1; i++) {
        for (let j = i + 1; j < this.userdata.length; j++) {
          if ((this.userdata[i].display_name > this.userdata[j].display_name)) {
            const temp = this.userdata[i];
            this.userdata[i] = this.userdata[j]
            this.userdata[j] = temp
          }
        }
      }
    });
    this.userrole = ['Admin', 'Supervisor', 'Staff', 'Staff']
    this.current_user = this.authservice.current_user
  }
  getRoleTitle (role_id) {
    const role_id_n = Number(role_id)
    return this.userrole[role_id_n - 1]
  }
  create() {
    const navigationExtras: NavigationExtras = {
      queryParamsHandling: 'preserve',
      preserveFragment: true
    };

    // Redirect the user
    this.router.navigate(['admin/create'], navigationExtras);
  }
  update(user) {
    const navigationExtras: NavigationExtras = {
      queryParamsHandling: 'preserve',
      preserveFragment: true,
      queryParams: user
    };
    // Redirect the user
    this.router.navigate(['admin/update'], { queryParams: user });
  }
  remove(user) {
    if (confirm('Are you sure?')) {
      const params = {
        'command': 'removeUser',
        'user_id': user.user_id
      }
      this.salesdata.removeUser(params)
      .subscribe(data => {
        if (data) {
          alert('succeessfully removed')
          for (let i = 0; i < this.userdata.length; i++) {
            const element = this.userdata[i]
            if (element.user_id === user.user_id) {
              this.userdata.splice(i, 1);
              return
            }
          }
        } else {
          alert('delete failed, please try again.')
        }
      });
    }
  }
}
