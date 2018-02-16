import { Component, ElementRef } from '@angular/core';
import { Router } from '@angular/router';

import { groups, years, months } from '../shared/constants';
declare var jquery: any;
declare var $: any;
@Component({
  templateUrl: 'resellersales.component.html'
})
export class ResellerComponent {
  groups = groups
  years = years
  months = months
  current_target = ''
  current_group = 'Choose group'
  constructor(public elRef: ElementRef) { }
  actionChanged ($event, action) {
    this.current_target = action
    $('.action_btn').addClass('btn-outline-primary')
    $('.action_btn').removeClass('btn-primary')
    $event.target.classList.remove('btn-outline-primary')
    $event.target.classList.add('btn-primary')
  }
  groupChanged ($event, group) {
    this.current_group = group
    $('.group_btn').addClass('btn-outline-primary')
    $('.group_btn').removeClass('btn-primary')
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

