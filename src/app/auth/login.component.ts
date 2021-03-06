import { Component, OnInit } from '@angular/core';
import { Router, NavigationExtras } from '@angular/router';
import { AuthService } from '../services/auth.service'
@Component({
  templateUrl: 'login.component.html'
})
export class LoginComponent implements OnInit {
  message: String;
  email: String
  password: String
  constructor(public router: Router, public authService: AuthService) { }
  ngOnInit() {
    this.message = 'Sign In to your account'
    // const params = {
    //   'email': 'admin@gmail.com',
    //   'password': '123123',
    //   'command': 'signin'
    // }
    // this.authService.login(params).subscribe((res) => {
    //   if (this.authService.isLoggedIn) {
    //     // Get the redirect URL from our auth service
    //     // If no redirect has been set, use the default
    //     // const redirect = this.authService.redirectUrl ? this.authService.redirectUrl : '/';
    //     const redirect = '/'
    //     // Set our navigation extras object
    //     // that passes on our global query params and fragment
    //     const navigationExtras: NavigationExtras = {
    //       queryParamsHandling: 'preserve',
    //       preserveFragment: true
    //     };

    //     // Redirect the user
    //     this.router.navigate([redirect], navigationExtras);
    //   } else {
    //     this.message = 'Wrong email or password.'
    //   }
    // });
  }
  setMessage() {
    this.message = 'Logged ' + (this.authService.isLoggedIn ? 'in' : 'out');
  }
  login() {
    this.message = 'Trying to log in ...';
    const params = {
      'email': this.email,
      'password': this.password,
      'command': 'signin'
    }
    this.authService.login(params).subscribe((res) => {
      if (this.authService.isLoggedIn) {
        // Get the redirect URL from our auth service
        // If no redirect has been set, use the default
        // const redirect = this.authService.redirectUrl ? this.authService.redirectUrl : '/';
        const redirect = '/'
        // Set our navigation extras object
        // that passes on our global query params and fragment
        const navigationExtras: NavigationExtras = {
          queryParamsHandling: 'preserve',
          preserveFragment: true
        };

        // Redirect the user
        this.router.navigate([redirect], navigationExtras);
      } else {
        this.message = 'Wrong email or password.'
      }
    });
  }

  logout() {
    this.authService.logout();
    this.setMessage();
  }
  register() {
    this.router.navigate(['auth/register']);
  }
}
