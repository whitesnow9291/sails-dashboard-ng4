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
  templateUrl: 'storesales.component.html'
})
export class StoreComponent implements OnInit {
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
  current_store_val: number
  current_year_val: number
  current_year: Subject<number> = new Subject<number>();
  current_months: Subject<number[]> = new Subject<number[]>();
  canSave: Boolean = false
  optionsSub: Subscription;

  actualdata: any;
  targetdata: any;
  actualtargetdata: any;

  targetInputYearData: any;
  targetEmployeeInputYearData: any;

  current_user: any;
  constructor(public elRef: ElementRef, public salesdata: SalesDataService, public authservice: AuthService) { }
  ngOnInit() {
    const params = {
      'command': 'getStores'
    }
    this.all_store = {
      'store_id' : -1,
      'name' : 'All stores'
    }
    this.stores = this.salesdata.getStores(params)
    this.setOptions();
    for (let i = 0; i < 12; i ++) {
      this.months_status.push(false)
    }
    this.targetInputYearData = []
    for (let i = 0; i < 12; i ++) {
      this.targetInputYearData.push(0)
    }
    this.targetEmployeeInputYearData = []
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

  getUserRole() {
    return this.current_user.role_id
  }
  private setOptions() {
    this.optionsSub = Observable.combineLatest(
      this.current_store,
      this.current_year,
      this.current_months
    ).debounceTime(300).subscribe(([current_store, current_year, current_months]) => {
        if (current_store == null || current_year == null || current_months == null || !current_months.length) {
          this.canSave = false
          this.actualtargetdata = null
          this.targetdata = null
          this.actualdata = null
          return
        }
        this.current_year_val = current_year
        this.current_store_val = current_store
        this.message = 'loading data ...'
        if (this.current_target === 'actuals') {
          const params = {
            'command': 'getActuals',
            'store_id': current_store,
            'year': current_year,
            'months': current_months,
            'page': 1,
            'perPage': 100
          }
          this.salesdata.getActuals(params)
          .subscribe(data => {
            this.actualdata = data;
            this.message = '&nbsp;'
          });
        } else if (this.current_target === 'targets') {
          const params = {
            'command': 'getTargets',
            'store_id': current_store,
            'year': current_year,
            'months': current_months,
            'page': 1,
            'perPage': 100
          }
          this.salesdata.getTargets(params)
          .subscribe(data => {
            console.log(data)
            this.targetdata = data;
            this.setEmployeeTargetInputData();
            this.message = '&nbsp;'
          });
        }
        const params = {
          'command': 'getActualvsTarget',
          'store_id': current_store,
          'year': current_year,
          'months': current_months,
          'page': 1,
          'perPage': 100
        }
        this.salesdata.getActualvsTarget(params)
        .subscribe(data => {
          this.canSave = true
          this.actualtargetdata = data;
          this.setTargetInputData();
          this.message = '&nbsp;'
        });
    });
  }
  getYearTarget() {
    let yeartarget: Number = 0
    this.targetInputYearData.forEach(element => {
      yeartarget = Number(yeartarget) + Number(element)
    });
    return yeartarget
  }
  getYearEmployeeTarget(employee_id) {
    let yeartarget: Number = 0
    let employee
    this.targetEmployeeInputYearData.forEach(element => {
      if (element.employee.employee_id === employee_id) {
        employee = element
        return
      }
    });
    employee.subtotal.forEach(element => {
      yeartarget = Number(yeartarget) + Number(element)
    });
    return yeartarget
  }
  setEmployeeTargetInputData() {
    if (!this.targetdata) {
      return
    }
    this.targetEmployeeInputYearData = []

    for (let i = 0; i < this.targetdata.length; i++) {
      const subtotal = []
      for (let t = 0; t < 12; t++) {
        subtotal.push(0)
      }
      for (let j = 0; j < this.targetdata[i].subtotal.length; j++) {
        const subtotal_month = this.targetdata[i].subtotal[j]
        subtotal[subtotal_month.month - 1] = subtotal_month.target
      }
      const employee = this.targetdata[i].employee
      const inputData = {
        'employee': employee,
        'subtotal': subtotal
      }
      this.targetEmployeeInputYearData.push(inputData)
    }
  }
  setTargetInputData() {
    if (!this.targetdata || !this.actualtargetdata) {
      return
    }
    this.targetInputYearData = []
    for (let i = 0; i < 12; i ++) {
      this.targetInputYearData.push(0)
    }
    for (let i = 0; i < this.actualtargetdata.target.month_target.length; i++) {
      const target = this.actualtargetdata.target.month_target[i]
      this.targetInputYearData[target.month - 1] = target.target
    }
  }
  getSubTotal(month, subtotals) {
    for (let i = 0; i < subtotals.length; i++) {
      if (Number(subtotals[i].month) === month) {
        return subtotals[i].subtotal;
      }
    }
  }
  getTotalActualFromMonth(month, subtotals) {
    for (let i = 0; i < subtotals.length; i++) {
      if (Number(subtotals[i].month) === month) {
        return Number(subtotals[i].subtotal);
      }
    }
  }
  getVarianceActualTab(month) {
    const targets = this.actualtargetdata.target.month_target
    const actuals = this.actualtargetdata.actual.month_target
    for (let i = 0; i < targets.length; i++) {
      if (Number(targets[i].month) === month) {
        return actuals[i].subtotal - targets[i].target;
      }
    }
  }
  getTotalTargetFromMonth(month, subtotals) {
    for (let i = 0; i < subtotals.length; i++) {
      if (Number(subtotals[i].month) === month) {
        return Number(subtotals[i].target);
      }
    }
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
    this.actualtargetdata = null;

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
      'command': 'setTarget',
      'year': this.current_year_val,
      'store_id': this.current_store_val,
      'target_store': this.targetInputYearData,
      'target_employee': this.targetEmployeeInputYearData
    }
    this.salesdata.setTarget(params)
    .subscribe(data => {
      alert('successfully updated!')
    });
  }
}
