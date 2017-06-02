import { ToastController } from 'ionic-angular/components/toast/toast';
import { Component } from '@angular/core';
import { ServicePage } from './../service/service';
//import { BrancheEntity } from './../../app/entitie/branche';
import { Http } from '@angular/http';
import { NavController, LoadingController } from 'ionic-angular';
//import { Showticket } from '../showticket/showticket'
import { Restservice } from '../../app/restservice/restservice'

import { AlertController } from 'ionic-angular';
declare var MobileTicketAPI: any;
@Component({
  selector: 'page-listagence',
  templateUrl: 'listagence.html',

})
export class ListagencePage {
  movies: Array<any>;
  branche: Array<any>;
  loading: any;
  ecoute: boolean = false;
   iserror: boolean = false;


  constructor(private toastCtrl: ToastController,public loadingCtrl: LoadingController, public navCtrl: NavController, public alertCtrl: AlertController, private restservice: Restservice, private http: Http) {

  }

  ionViewDidLoad() {
    console.log('load enter')

    this.getAgence();
  }

  ngOnInit() {
    // this.presentLoadingDefault();
    //  this.getAgence();
    //  this. searchMovieDB("mod");
    console.log('initializing ...... ag mode')

    console.log('fin');

  }
  /**Chargement  */
  presentLoadingDefault() {
    this.loading = this.loadingCtrl.create({
      content: 'Chargement en cours...'
    });
    this.loading.present();


  }
  loadingfinish() {
    setTimeout(() => {
      this.loading.dismiss();
    }, 1000);
    this.ecoute = true;
    //this.Rrefreshe();

  }
  getRefreche() {
    this.restservice.getAllbranches().subscribe(Agences => {

      console.log('data a ' + Agences)
      Agences = this.branche = Agences;
      //this.loadingfinish();
      // var a=data.results
      console.log(Agences)
this.iserror=false;
       } , error => {
         this.iserror=true;
          alert(error + 'erreur')
          this.loadingfinish();
        }
      //

    )
  }
  getAgence() {
this.presentLoadingDefault();
    this.restservice.getAllbranches().subscribe(Agences => {

      console.log('data a ' + Agences)
      Agences = this.branche = Agences;
      console.log(Agences)
      this.loadingfinish()
      // var a=data.results
this.iserror=false;

          }, (error) => {
            this.iserror=true;
          this.loadingfinish();
          // alert(error+'erreur')
          console.log(error)
          this.presentToast();
           console.log("status "+error.status)
        }
      //this.loadingfinish();

  )

  }

  /**item taped */
  itemTaped(branche) {
    this.navCtrl.push(ServicePage, { id: branche.id,name:branche.name });
    console.log("taped" + branche.id);

  }
  //***************** */

  //test

presentToast() {
  let toast = this.toastCtrl.create({
    message: 'Problème de connexion',
    duration: 3000,
    position: 'top'
  });

  toast.onDidDismiss(() => {
    console.log('Dismissed toast');
  });

  toast.present();
}
}
