import { Component, ElementRef, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { SalesDataService } from '../services/salesdata';
import { groups, years, months } from '../shared/constants';
import { Observable } from 'rxjs/Rx';
import { Subscription } from 'rxjs/Subscription';
import { Subject } from 'rxjs/Subject';
import { BehaviorSubject } from 'rxjs/BehaviorSubject';

declare var jquery: any;
declare var $: any;
@Component({
  templateUrl: 'resellersales.component.html'
})
export class ResellerComponent implements OnInit {
  groups = null
  years = years
  months = months
  months_status = []

  current_group: Subject<number> = new Subject<number>();
  current_year: Subject<number> = new Subject<number>();
  current_months: Subject<number[]> = new Subject<number[]>();

  optionsSub: Subscription;
  constructor(public elRef: ElementRef, public salesdata: SalesDataService) { }
  ngOnInit() {
    this.getGroups();
    this.setOptions();
    for (let i = 0; i < 12; i ++) {
      this.months_status.push(false)
    }
  }
  private setOptions() {
    this.optionsSub = Observable.combineLatest(
      this.current_group,
      this.current_year,
      this.current_months
    ).subscribe(([current_group, current_year, current_months]) => {
        this.salesdata.getReseller()
        .subscribe(data => {
          console.log(data)
        });
    });
  }
  getGroups () {
    this.groups = this.salesdata.getGroups()
  }
  groupChanged ($event, group) {
    this.current_group.next(group.id)
    $('.group_btn').addClass('btn-outline-primary')
    $('.group_btn').removeClass('btn-primary')
    $event.target.classList.remove('btn-outline-primary')
    $event.target.classList.add('btn-primary')
  }
  yearChanged ($event, year) {
    this.current_year.next(year)
    $('.year_btn').addClass('btn-outline-primary')
    $('.year_btn').removeClass('btn-primary')
    $event.target.classList.remove('btn-outline-primary')
    $event.target.classList.add('btn-primary')
  }
  monthChanged ($event, month) {
    this.months_status[month.no - 1] = !this.months_status[month.no - 1]
    let temp: number[] = []
    for (let i = 0; i < 12; i ++) {
      if (this.months_status[i]) {
        temp.push(i + 1)
      }
    }
    this.current_months.next(temp)
    $event.target.classList.toggle('btn-outline-primary')
    $event.target.classList.toggle('btn-primary')
  }
}

