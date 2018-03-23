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

  public items: Array<string> = ['Amsterdam', 'Antwerp', 'Athens', 'Barcelona',
  'Berlin', 'Birmingham', 'Bradford', 'Bremen', 'Brussels', 'Bucharest',
  'Budapest', 'Cologne', 'Copenhagen', 'Dortmund', 'Dresden', 'Dublin', 'Düsseldorf',
  'Essen', 'Frankfurt', 'Genoa', 'Glasgow', 'Gothenburg', 'Hamburg', 'Hannover',
  'Helsinki', 'Leeds', 'Leipzig', 'Lisbon', 'Łódź', 'London', 'Kraków', 'Madrid',
  'Málaga', 'Manchester', 'Marseille', 'Milan', 'Munich', 'Naples', 'Palermo',
  'Paris', 'Poznań', 'Prague', 'Riga', 'Rome', 'Rotterdam', 'Seville', 'Sheffield',
  'Sofia', 'Stockholm', 'Stuttgart', 'The Hague', 'Turin', 'Valencia', 'Vienna',
  'Vilnius', 'Warsaw', 'Wrocław', 'Zagreb', 'Zaragoza'];

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
    // this.getGroups();
    // this.setOptions();
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
  public selected(value: any): void {
    console.log('Selected value is: ', value);
  }

  public removed(value: any): void {
    console.log('Removed value is: ', value);
  }

  public refreshValue(value: any): void {
    
  }
}

