import { Component } from '@angular/core';
import { Router, NavigationExtras } from '@angular/router';

@Component({
  templateUrl: 'admin.component.html'
})
export class AdminComponent {

  constructor(public router: Router ) { }
  create() {
    const navigationExtras: NavigationExtras = {
      queryParamsHandling: 'preserve',
      preserveFragment: true
    };

    // Redirect the user
    this.router.navigate(['admin/create'], navigationExtras);
  }
  update() {
    const navigationExtras: NavigationExtras = {
      queryParamsHandling: 'preserve',
      preserveFragment: true
    };

    // Redirect the user
    this.router.navigate(['admin/update'], navigationExtras);
  }
  remove() {
    if (confirm('Are you sure?')) {
      alert('succeessfully removed')
    }
  }
}
