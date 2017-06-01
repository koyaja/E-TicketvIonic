import { Parametre } from './../parametre/parametre';
import { Component } from '@angular/core';
import {  Splashscreen } from 'ionic-native';
import { HomePage } from '../home/home';
import { ContactPage } from '../contact/contact';
//import { PostticketPage } from '../posticket/posticket';

@Component({
  templateUrl: 'tabs.html'
})
export class TabsPage {
  // this tells the tabs component which Pages
  // should be each tab's root Page
  tab1Root: any = HomePage;
  tab2Root: any = Parametre;
  tab3Root: any = ContactPage;
  //tab4Root: any = PostticketPage;

  constructor() {
 Splashscreen.hide();
  }
}
