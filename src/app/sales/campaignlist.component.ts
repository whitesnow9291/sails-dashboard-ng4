import { Component, ElementRef, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { SalesDataService } from '../services/salesdata';
import { years, months } from '../shared/constants';
import { Observable } from 'rxjs/Rx';
import { Subscription } from 'rxjs/Subscription';
import { Subject } from 'rxjs/Subject';

declare var jquery: any;
declare var $: any;
@Component({
  templateUrl: 'campaignlist.component.html'
})
export class CampaignlistComponent implements OnInit {
  // lineChart
  public lineChartData: Array<any> = [
    {data: [28, 48, 40, 19, 86, 27, 90], label: 'Series B'}
  ];
  public lineChartLabels: Array<any> = ['January', 'February', 'March', 'April', 'May', 'June', 'July'];
  public lineChartOptions: any = {
    animation: false,
    responsive: true
  };
  public lineChartColours: Array<any> = [
    { // dark grey
      backgroundColor: 'rgba(77,83,96,0.2)',
      borderColor: 'rgba(77,83,96,1)',
      pointBackgroundColor: 'rgba(77,83,96,1)',
      pointBorderColor: '#fff',
      pointHoverBackgroundColor: '#fff',
      pointHoverBorderColor: 'rgba(77,83,96,1)'
    }
  ];
  public lineChartLegend: boolean = true;
  public lineChartType: string = 'line';
  // Datepicker

  // Datepicker

  bsRangeValue: any = [new Date(2017, 7, 4), new Date(2017, 7, 20)];
  constructor(public elRef: ElementRef, public salesdata: SalesDataService) { }
  ngOnInit() {
  }
  saveChange(modal) {
    modal.hide();
  }
}

