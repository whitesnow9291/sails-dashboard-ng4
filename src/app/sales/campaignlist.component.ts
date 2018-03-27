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

  // Datepicker

  // Datepicker

  bsRangeValue: any = [new Date(), new Date()];
  updatedCampaign: any;
  stores: any;
  storeoptions: any[];
  campaigns: any[];
  test: any
  constructor(public elRef: ElementRef, public salesdata: SalesDataService) { }
  ngOnInit() {
    this.campaigns = []
    this.storeoptions = []
    this.stores = this.salesdata.stores
    this.stores.forEach(element => {
      const temp = {name: element.name, value: element.store_id, checked: false}
      this.storeoptions.push(temp)
    });
    const params = {
      'command': 'getCampaigns',
    }
    this.salesdata.getCampaigns(params)
    .subscribe(data => {
      this.campaigns = data
    });
  }
  removeCampaign(index) {
    if(confirm('Are you sure?')) {
      const params = {
        'command': 'removeCampaign',
        'id': this.campaigns[index].id,
      }
      this.salesdata.removeCampaign(params)
      .subscribe(data => {

      this.test = data
        if (data) {
          this.campaigns.splice(index, 1)
        } else {
          alert('Server error!')
        }
      });
    }
  }
  createCampaign(primaryModal) {
    this.updatedCampaign = {
      id: 0,
      name: '',
      sku: 0,
      start_at: new Date(),
      end_at: new Date(),
      stores: '',
      sales: 0,
      sold: 0
    }
    this.bsRangeValue = [new Date(), new Date()];
    this.storeoptions.forEach(element => {
      element.checked = false
    });
    primaryModal.show()
  }
  updateCampaign(item, index, primaryModal) {
    for (let i = 0; i < this.campaigns.length; i++) {
      if (this.campaigns[i].name === item.name && i !== index) {
        alert('Duplicated campaign already exist!')
        return
      }
    }
    this.updatedCampaign = item
    this.bsRangeValue = [new Date(this.updatedCampaign.start_at), new Date(this.updatedCampaign.end_at)];
    console.log(this.updatedCampaign.stores)
    const current_checkboxs = this.updatedCampaign.stores.split(',');
    current_checkboxs.forEach(cc => {
      this.storeoptions.forEach(so => {
        if (cc === so.value) {
          so.checked = true
        }
      });
    });
    primaryModal.show()
  }
  saveChange(modal) {
    if (!this.updatedCampaign.id) {
      for (let i = 0; i < this.campaigns.length; i++) {
        if (this.campaigns[i].name === this.updatedCampaign.name) {
          alert('Duplicated campaign already exist!')
          return
        }
      }
    }
    let storestr = ''
    this.storeoptions.forEach(element => {
      if (element.checked) {
        storestr += element.value + ','
      }
    });
    this.updatedCampaign.start_at = this.bsRangeValue[0]
    this.updatedCampaign.end_at = this.bsRangeValue[1]
    this.updatedCampaign.stores = storestr
    const params = {
      'command': 'saveCampaign',
      'campaign': this.updatedCampaign,
    }
    this.salesdata.saveCampaign(params)
    .subscribe(data => {
      if (!this.updatedCampaign.id) { // create mode
        const temp = {
          id: data.id,
          sales: data.sales,
          sold: data.sold,
          start_at: data.start_at,
          end_at: data.end_at,
          stores: ''
        }
        this.campaigns.push(temp)
      } else {
        for (let i = 0; i < this.campaigns.length; i++) {
          if (this.campaigns[i].id === this.updatedCampaign.id) {
            this.campaigns[i].sales = data.sales
            this.campaigns[i].sold = data.sold
            this.campaigns[i].start_at = data.start_at
            this.campaigns[i].end_at = data.end_at
          }
        }
      }
    });
    modal.hide();
  }
}

