import { PopoverPage } from './../popover/popover';
//import { ServicePage } from './../service/service';
import { Component } from '@angular/core';
import { NavController,PopoverController } from 'ionic-angular';
//import {NewticketPage}  from'../newticket/newticket'
import {ListagencePage}  from'../listagence/listagence'
import {MarketingPage} from '../marketing/marketing'
import {Parametre} from '../parametre/parametre'
import {TranslateService} from '@ngx-translate/core';

@Component({
  selector: 'page-home',
  templateUrl: 'home.html',



})
export class HomePage {

  constructor(public navCtrl: NavController,translate: TranslateService,public popoverCtrl: PopoverController) {

  }
 private passnew(){
this.navCtrl.push(ListagencePage);
    console.log("test");
  } /*
   private parametreshow(){
this.navCtrl.push(Parametre);
    console.log("test");
  }
  private showServices() {
  //  this.navCtrl.push(ServicePage);
  }*/
private showMarketing() {
    this.navCtrl.push(MarketingPage);
  }
  presentPopover(myEvent) {
    let popover = this.popoverCtrl.create(PopoverPage);
    popover.present({
      ev: myEvent
    });
  }

}
