import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  templateUrl: 'create.component.html'
})
export class CreateComponent {

  constructor( ) { }
  createAccount() {
    alert('successfully created');
  }
}
