import { Parametre } from './../parametre/parametre';
import { Component } from '@angular/core';
import { NavController, NavParams, ViewController } from 'ionic-angular';

/*
  Generated class for the Popover page.

  See http://ionicframework.com/docs/v2/components/#navigation for more info on
  Ionic pages and navigation.
*/
@Component({
  selector: 'page-popover',
  templateUrl: 'popover.html'
})
export class PopoverPage {

  constructor(public navCtrl: NavController, public navParams: NavParams,public viewCtrl: ViewController) {}

  ionViewDidLoad() {
    console.log('ionViewDidLoad PopoverPage');
  }
   close() {
    this.viewCtrl.dismiss();
  }
  openparametre(){

    this.navCtrl.push(Parametre);
    this.viewCtrl.dismiss();
  }

}
