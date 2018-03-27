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
  templateUrl: 'campaigndashboard.component.html'
})
export class CampaigndashboardComponent implements OnInit {
    // ng2-select

  test: any
  message = '&nbsp;'

  searchCampaign: Subject<String> = new Subject<String>();
  searchDay: Subject<number> = new Subject<number>();
  optionsSub: Subscription;

  campaigns: any[];
  campaignOptions: any[]
  tabledata: any[];
  graphdata: any;
  seleteddate: number;
  current_campaign: any
  current_day: number
  current_store: number

  stores: any;
  // lineChart
  public lineChartData: Array<any> = [
    {data: [], label: ''}
  ];
  public lineChartLabels: Array<any> = [];
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
  public lineChartLegend: Boolean = true;
  public lineChartType: String = 'line';
  constructor(public elRef: ElementRef, public salesdata: SalesDataService) { }
  ngOnInit() {
    const params = {
      'command': 'getCampaigns',
    }
    this.current_day = 0
    this.stores = this.salesdata.stores
    this.salesdata.getCampaigns(params)
    .subscribe(data => {
      this.campaigns = data
      this.campaignOptions = data.map((res) => {
        return {
          text: res.name,
          id: res.id,
          stores: res.stores
        }
      })
    });
    this.tabledata = []
    this.setOptions()
    this.current_store = 0
  }
  changeday(event) {
    this.current_day = event
    this.searchDay.next(event)
  }
  storeName(store_id) {
    for (let i = 0; i < this.stores.length; i ++) {
      if (this.stores[i].store_id === store_id) {
        return this.stores[i].name
      }
    }
    return 'No Name'
  }
  private setOptions() {
    this.optionsSub = Observable.combineLatest(
      this.searchCampaign,
      this.searchDay,
    ).debounceTime(300).subscribe(([searchCampaign, searchDay]) => {
        this.message = 'loading data ...'
        const params = {
          'command': 'getSoldAndSalesOfStore',
          'compaign_id': searchCampaign,
          'dayrange': searchDay,
        }
        this.salesdata.getSoldAndSalesOfStore(params)
        .subscribe(data => {
          if (data.length === 0) {
            this.tabledata = []
            this.graphdata = {
              total: [],
              store: []
            }
          } else {
            this.tabledata = data.tabledata
            this.graphdata = data.graphdata
          }
          this.current_store = 0
          this.changeStore(0)
        });
    });
    this.searchCampaign.next('')
    this.searchDay.next(0)
  }
  public campaignSelected(value: any): void {
    for (let i = 0; i < this.campaigns.length; i ++) {
      if (this.campaigns[i].id === value.id) {
        this.current_campaign = this.campaigns[i]
        break
      }
    }
    this.searchCampaign.next(value.id)
  }
  getTotalSold() {
    let sum = 0
    this.tabledata.forEach(element => {
      sum += element.totalsold
    });
    return sum
  }
  getTotalSales() {
    let sum = 0
    this.tabledata.forEach(element => {
      sum += element.totalsales
    });
    return sum
  }
  getDayrangeSold() {
    let sum = 0
    this.tabledata.forEach(element => {
      sum += element.dayrangesold
    });
    return sum
  }
  getDayrangeSales() {
    let sum = 0
    this.tabledata.forEach(element => {
      sum += element.dayrangesales
    });
    return sum
  }
  changeStore(store_id) {
    this.current_store = store_id
    if (store_id === 0 ) { // all store
      this.lineChartLabels = this.graphdata.total.map((item) => {
        return item.sold_date
      })
      this.lineChartData[0].data = this.graphdata.total.map((item) => {
        return item.sold
      })
      this.lineChartData[0].label = 'ALL'
    } else {
      for (let i = 0; i < this.graphdata.store.length; i++) {
        if (store_id === this.graphdata.store[i].store_id) {
          this.lineChartLabels = this.graphdata.store[i].solddata.map((item) => {
            return item.sold_date
          })
          this.lineChartData[0].data = this.graphdata.store[i].solddata.map((item) => {
            return item.sold
          })
          this.lineChartData[0].label = this.storeName(store_id)
          break
        }
      }
    }
  }
  chartHovered($event) {

  }
  chartClicked($event) {
    
  }
}

