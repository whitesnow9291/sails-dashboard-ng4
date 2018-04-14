import { Component, ElementRef, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { SalesDataService } from '../services/salesdata';
import { AuthService } from '../services/auth.service';
import { stores, years, months, Month } from '../shared/constants';
import { Observable } from 'rxjs/Rx';
import { Subscription } from 'rxjs/Subscription';
import { Subject } from 'rxjs/Subject';
import { Angular2Csv } from 'angular2-csv/Angular2-csv';

declare var jquery: any;
declare var $: any;
@Component({
  templateUrl: 'staffsales.component.html'
})
export class StaffComponent implements OnInit {
  months_status = []
  stores: any;
  years = years
  months = months
  current_target = ''
  message = '&nbsp;'
  btn_outline_class = 'btn-outline-primary'
  btn_fill_class = 'btn-primary'
  all_store: any;

  current_store: Subject<number> = new Subject<number>();

  current_staff: Subject<number> = new Subject<number>();
  current_year: Subject<number> = new Subject<number>();
  current_months: Subject<number[]> = new Subject<number[]>();
  current_store_val: number
  current_year_val: number
  current_staff_val: number

  canSave: Boolean = true
  optionsSub: Subscription;

  actualdata: any;
  targetdata: any;
  targetdatainput: number[];

  userdata: any
  current_user: any;
  constructor(public elRef: ElementRef, public salesdata: SalesDataService, public authservice: AuthService) { }
  ngOnInit() {
    let params = {
      'command': 'getStores'
    }
    this.all_store = {
      'store_id' : -1,
      'name' : 'All stores'
    }
    this.stores = this.salesdata.getStores(params)
    this.setOptions();
    this.targetdatainput = []
    for (let i = 0; i < 12; i ++) {
      this.months_status.push(false)
      this.targetdatainput.push(0)
    }
    params = {
      'command': 'getUserList'
    }
    this.salesdata.getUserList(params)
    .subscribe(data => {
      this.userdata = data
      for (let i = 0; i < this.userdata.length - 1; i++) {
        for (let j = i + 1; j < this.userdata.length; j++) {
          if ((this.userdata[i].display_name > this.userdata[j].display_name)) {
            const temp = this.userdata[i];
            this.userdata[i] = this.userdata[j]
            this.userdata[j] = temp
          }
        }
      }
    });
    this.current_user = this.authservice.current_user
  }
  printMap() {
    window.print()
  }
  toCSV() {
    if (!this.current_target) {
      alert ('No data to save')
      return
    }
    let data = []
    const trs = $('table.storesales_table tbody tr')
    for (let i = 0; i < trs.length; i ++ ) {
      const tds = $(trs[i]).children()
      let record = []
      for (let j = 0; j < tds.length; j ++ ) {
        const targetmodeinput = $(tds[j]).children('input')
        if (targetmodeinput.length) {
          record.push($(targetmodeinput).val().trim())
        } else {
          record.push($(tds[j]).text().trim())
        }
      }
      data.push(record)
    }
    new Angular2Csv(data, 'report-store');
  }
  private setOptions() {
    this.optionsSub = Observable.combineLatest(
      this.current_store,
      this.current_year,
      this.current_months,
      this.current_staff
    ).debounceTime(300).subscribe(([current_store, current_year, current_months, current_staff]) => {
        if (current_store == null || current_year == null || current_months == null || !current_months.length) {
          this.canSave = false
          this.targetdata = null
          this.actualdata = null
          return
        }
        this.canSave = true
        this.current_year_val = current_year
        this.current_store_val = current_store
        this.message = 'loading data ...'
        const params = {
          'command': 'getActualvsTargetOfStaff',
          'store_id': current_store,
          'staff_id': current_staff,
          'year': current_year,
          'months': current_months,
          'page': 1,
          'perPage': 100
        }
        this.salesdata.getActualvsTarget(params)
        .subscribe(data => {
          this.actualdata = data.actual
          this.targetdata = data.target
          this.setTargetInput();
          // console.log(this.actualdata)
          // console.log(this.targetdata)
          this.message = '&nbsp;'
        });
    });
  }
  setTargetInput() {
    this.targetdatainput = []
    for (let i = 0; i < 12; i ++) {
      this.targetdatainput.push(0)
    }
    if (this.targetdata) {
      for (let i = 0; i < this.targetdata.length; i++) {
        const record = this.targetdata[i]
        this.targetdatainput[Number(record.month) - 1] = record.target
      }
    }
  }
  getActualOfMonth(month) {
    if (this.actualdata) {
      for (let i = 0; i < this.actualdata.length; i++) {
        const record = this.actualdata[i]
        if (Number(record.month) === Number(month)) {
          return record.subtotal
        }
      }
    }
    return 0
  }
  getYearOfActual() {
    if (this.actualdata) {
      let temp = 0;
      for (let i = 0; i < this.actualdata.length; i++) {
        const record = this.actualdata[i]
        temp += Number(record.subtotal)
      }
      return temp
    }
    return 0
  }
  getYearTargetOfReal() {
    if (this.targetdata) {
      let temp = 0;
      for (let i = 0; i < this.targetdata.length; i++) {
        const record = this.targetdata[i]
        temp += Number(record.target)
      }
      return temp
    }
    return 0
  }
  getYearTargetOfInput() {
    if (this.targetdatainput) {
      let temp = 0;
      for (let i = 0; i < this.targetdatainput.length; i++) {
        const record = this.targetdatainput[i]
        temp += Number(record)
      }
      return temp
    }
    return 0
  }
  getTargetOfMonth(month) {
    if (this.targetdata) {
      for (let i = 0; i < this.targetdata.length; i++) {
        const record = this.targetdata[i]
        if (Number(record.month) === Number(month)) {
          return record.target
        }
      }
    }
    return 0
  }
  actionChanged ($event, action) {
    if ( this.current_target === action ) {
      return
    }
    this.current_store.next(null)
    this.current_year.next(null)
    this.current_months.next(null)
    this.current_target = action

    this.actualdata = null;
    this.targetdata = null;

    for (let i = 0; i < 12; i ++) {
      this.months_status[i] = false
    }
    if (action === 'actuals') {
      this.btn_outline_class = 'btn-outline-success'
      this.btn_fill_class = 'btn-success'
      $('.actuals_btn').addClass(this.btn_fill_class)
      $('.actuals_btn').removeClass(this.btn_outline_class)
      $('.targets_btn').addClass('btn-outline-primary')
      $('.targets_btn').removeClass('btn-primary')
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
    this.current_store_val = store.store_id
    this.current_store.next(store.store_id)
    // init year/month
    this.current_months.next(null)
    this.current_year.next(null)
    $('.year_btn').addClass(this.btn_outline_class)
    $('.year_btn').removeClass(this.btn_fill_class)
    for (let i = 0; i < 12; i ++) {
      this.months_status[i] = false
    }

    $('.month_btn').addClass(this.btn_outline_class)
    $('.month_btn').removeClass(this.btn_fill_class)
    // end init
    $('.store_btn').addClass(this.btn_outline_class)
    $('.store_btn').removeClass(this.btn_fill_class)
    $event.target.classList.remove(this.btn_outline_class)
    $event.target.classList.add(this.btn_fill_class)
  }
  staffChanged ($event, staff) {
    this.current_staff_val = staff.user_id
    this.current_staff.next(staff.user_id)
    $('.staff_btn').addClass(this.btn_outline_class)
    $('.staff_btn').removeClass(this.btn_fill_class)
    $event.target.classList.remove(this.btn_outline_class)
    $event.target.classList.add(this.btn_fill_class)
  }
  yearChanged ($event, year) {
    this.current_year.next(year)
    $('.year_btn').addClass(this.btn_outline_class)
    $('.year_btn').removeClass(this.btn_fill_class)
    $event.target.classList.remove(this.btn_outline_class)
    $event.target.classList.add(this.btn_fill_class)
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
    $event.target.classList.toggle(this.btn_outline_class)
    $event.target.classList.toggle(this.btn_fill_class)
  }
  saveTargets () {
    const params = {
      'command': 'setTargetOfStaff',
      'params': {
        'year': this.current_year_val,
        'store_id': this.current_store_val,
        'staff_id': this.current_staff_val,
        'targetOfStaff': this.targetdatainput
      }
    }
    this.salesdata.setTargetOfStaff(params)
    .subscribe(data => {
      if (data) {
        alert('successfully updated!')
      } else {
        alert('server error, please try again!')
      }
    });
  }
}
