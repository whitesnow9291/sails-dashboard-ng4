import { Component, ElementRef } from '@angular/core';
import { Router } from '@angular/router';

import { stores, years, months } from '../shared/constants';
declare var jquery: any;
declare var $: any;
@Component({
  templateUrl: 'storesales.component.html'
})
export class StoreComponent {
  stores = stores
  years = years
  months = months
  current_target = ''
  constructor(public elRef: ElementRef) { }
  actionChanged ($event, action) {
    this.current_target = action
    if (action === 'actuals') {
      console.log(action)
      $('.actuals_btn').removeClass('btn-outline-success')
      $('.actuals_btn').addClass('btn-success')
      $('.targets_btn').removeClass('btn-primary')
      $('.targets_btn').addClass('btn-outline-primary')
      $event.target.classList.add('btn-success')
    } else {
      console.log(action)
      $('.actuals_btn').addClass('btn-outline-success')
      $('.actuals_btn').removeClass('btn-success')
      $('.targets_btn').addClass('btn-primary')
      $('.targets_btn').removeClass('btn-outline-primary')
    }
  }
  storeChanged ($event, store) {
    $('.store_btn').addClass('btn-outline-primary')
    $('.store_btn').removeClass('btn-primary')
    $event.target.classList.remove('btn-outline-primary')
    $event.target.classList.add('btn-primary')
  }
  yearChanged ($event, year) {
    $('.year_btn').addClass('btn-outline-primary')
    $('.year_btn').removeClass('btn-primary')
    $event.target.classList.remove('btn-outline-primary')
    $event.target.classList.add('btn-primary')
  }
  monthChanged ($event, month) {
    $event.target.classList.toggle('btn-outline-primary')
    $event.target.classList.toggle('btn-primary')
  }
  saveTargets () {
    alert('target saved!')
  }
}
