import { Component } from '@angular/core';

import { NavController } from 'ionic-angular';
 import {Restservice} from '../../app/restservice/restservice'
//import {ServicesPage}  from'../services/services'
//import {ListagencePage}  from'../listagence/listagence'
import {MarketingEntitie} from'../../app/entitie/marketingEntite'


@Component({
  selector: 'page-marketing',
  templateUrl: 'marketing.html',
   providers:[Restservice]
})
export class MarketingPage {
Marckic: MarketingEntitie[];
  constructor(public navCtrl: NavController,private restservice:Restservice) {

  }
  ngOnInit() {
    console.log('cool ')
   // this.getMarketic();
  }
  getMarketic(){
      console.log("point 2");
    this.restservice.getAllbranches().subscribe(Marckic =>{

          console.log('data '+Marckic)
        //Marckic= this.Marckic=Marckic;
        // var a=data.results
       //   console.log("resultat"+Marckic.url)
          ,error=>alert  (error+'erreur')
      })
    }
}
