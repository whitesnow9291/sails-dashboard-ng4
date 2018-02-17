import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  templateUrl: 'update.component.html'
})
export class UpdateComponent {

  message: String;
  constructor( ) { }
  updateAccount() {
    alert('successfully updated');
  }
}
