import { Component, ElementRef, OnInit } from '@angular/core';
import { Router } from '@angular/router';

import { stores, years, months, Month } from '../shared/constants';
declare var jquery: any;
declare var $: any;
@Component({
  templateUrl: 'storesales.component.html'
})
export class StoreComponent implements OnInit {
  stores = stores
  years = years
  months = months
  current_target = ''
  selected_months: Object = {}
  btn_outline_class = 'btn-outline-primary'
  btn_fill_class = 'btn-primary'
  constructor(public elRef: ElementRef) { }
  ngOnInit() {
    for (let i = 1; i <= 12; i ++) {
      this.selected_months[i] = false
    }
  }
  actionChanged ($event, action) {
    this.current_target = action
    if (action === 'actuals') {
      this.btn_outline_class = 'btn-outline-success'
      this.btn_fill_class = 'btn-success'
      $('.actuals_btn').addClass(this.btn_fill_class)
      $('.actuals_btn').removeClass(this.btn_outline_class)
      $('.targets_btn').addClass('btn-outline-primary')
      $('.targets_btn').removeClass('btn-primary')
      for (let i = 1; i <= 12; i ++) {
        this.selected_months[i] = false
      }
    } else {
      this.btn_outline_class = 'btn-outline-primary'
      this.btn_fill_class = 'btn-primary'
      $('.actuals_btn').addClass('btn-outline-success')
      $('.actuals_btn').removeClass('btn-success')
      $('.targets_btn').addClass(this.btn_fill_class)
      $('.targets_btn').removeClass(this.btn_outline_class)
    }
  }
  storeChanged ($event, store) {
    $('.store_btn').addClass(this.btn_outline_class)
    $('.store_btn').removeClass(this.btn_fill_class)
    $event.target.classList.remove(this.btn_outline_class)
    $event.target.classList.add(this.btn_fill_class)
  }
  yearChanged ($event, year) {
    $('.year_btn').addClass(this.btn_outline_class)
    $('.year_btn').removeClass(this.btn_fill_class)
    $event.target.classList.remove(this.btn_outline_class)
    $event.target.classList.add(this.btn_fill_class)
  }
  monthChanged ($event, month) {
    $event.target.classList.toggle(this.btn_outline_class)
    $event.target.classList.toggle(this.btn_fill_class)
    if (this.current_target !== 'actuals') {
      this.selected_months[month.no] = !this.selected_months[month.no]
    }
  }
  saveTargets () {
    alert('target saved!')
  }
}
