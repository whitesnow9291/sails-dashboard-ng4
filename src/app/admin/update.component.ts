import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  templateUrl: 'update.component.html'
})
export class UpdateComponent {

  constructor( ) { }
  updateAccount() {
    alert('successfully updated');
  }
}
