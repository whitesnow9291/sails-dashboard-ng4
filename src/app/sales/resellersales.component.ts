import { Component, ElementRef, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { SalesDataService } from '../services/salesdata';
import { years, months } from '../shared/constants';
import { Observable } from 'rxjs/Rx';
import { Subscription } from 'rxjs/Subscription';
import { Subject } from 'rxjs/Subject';
import { Angular2Csv } from 'angular2-csv/Angular2-csv';

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
  message = '&nbsp;'
  searchname: Subject<String> = new Subject<String>();
  current_group_title = 'Choose Group'

  current_group: Subject<number> = new Subject<number>();
  current_year: Subject<number> = new Subject<number>();
  current_months: Subject<number[]> = new Subject<number[]>();
  optionsSub: Subscription;

  resellerdata: any;
  resellerSearchResult: any;
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
    ).debounceTime(300).subscribe(([current_group, current_year, current_months]) => {
      if (current_group == null || current_year == null || current_months == null || !current_months.length) {
        this.resellerdata = null
        this.resellerSearchResult = null
        return
      }
        this.message = 'loading data ...'
        const params = {
          'command': 'getReseller',
          'group_id': current_group,
          'year': current_year,
          'months': current_months
        }
        this.salesdata.getReseller(params)
        .subscribe(data => {
          this.resellerdata = data;
          this.resellerSearchResult = data;
          this.message = '&nbsp;'
        });
    });
    const self = this
    this.searchname.debounceTime(200).subscribe((searchTerm) => {
      searchTerm = searchTerm.toLowerCase()
      self.resellerSearchResult = self.resellerdata.filter(function(record){
        if (record.profile.customer_firstname.toLowerCase().indexOf(searchTerm) > -1
          || record.profile.customer_lastname.indexOf(searchTerm) > -1 ) {
          return true
        } else {
          return false
        }
      })
    });
  }
  getGroupYearTotal () {
    let yearGroupTotal = 0
    if (!this.resellerSearchResult) {
      return yearGroupTotal
    }
    for (let i = 0; i < this.resellerSearchResult.length; i++) {
      const record = this.resellerSearchResult[i]
      yearGroupTotal = yearGroupTotal + Number(record.yeartotal)
    }
    return yearGroupTotal
  }
  getGroupSubTotal(month) {
    let yearsubtotal = 0
    if (!this.resellerSearchResult) {
      return yearsubtotal
    }
    for (let i = 0; i < this.resellerSearchResult.length; i++) {
      const record = this.resellerSearchResult[i]
      yearsubtotal = yearsubtotal + Number(this.getSubTotal(month.no, record.subtotals))
    }
    return yearsubtotal
  }
  getSubTotal(month, subtotals) {
    for (let i = 0; i < subtotals.length; i++) {
      if (Number(subtotals[i].month) === month) {
        return subtotals[i].subtotal;
      }
    }
    return 0
  }
  getGroups () {
    this.groups = this.salesdata.getGroups()
  }
  groupChanged ($event, group) {
    this.current_group_title = group.title
    // reset year/month
    this.current_year.next(null)
    this.current_months.next([])
    this.current_group.next(group.id)
    $('.year_btn').addClass('btn-outline-primary')
    $('.year_btn').removeClass('btn-primary')
    $('.month_btn').addClass('btn-outline-primary')
    $('.month_btn').removeClass('btn-primary')
    for (let i = 0; i < 12; i ++) {
      this.months_status[i] = false
    }
    // reset end
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
    const temp: number[] = []
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

