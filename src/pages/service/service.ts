import { GlobalVars } from './../../shared/global';
import { ToastController } from 'ionic-angular/components/toast/toast';

  import { Http } from '@angular/http';
  import { Component } from '@angular/core';
  import { NavController,NavParams,LoadingController,AlertController } from 'ionic-angular';
  import {Showticket}  from'../showticket/showticket'
  import {Restservice} from '../../app/restservice/restservice'



  @Component({
    selector: 'page-service',
    templateUrl: 'service.html',
    providers:[Restservice]
  })
  export class ServicePage {
  movies: Array<any>;
  Service:Array<any>;
  brancheName?:string ;
   loading: any;
   client?:string;
   iserror: boolean = false;
  id:number;
    constructor(private toastCtrl: ToastController,public loadingCtrl: LoadingController,private navParams: NavParams,public navCtrl: NavController,public alertCtrl: AlertController, private restservice:Restservice,private http:Http) {
      this.client=GlobalVars.getClient()
      this.id=navParams.get('id');
      this.brancheName=navParams.get('name');
      console.log("this.id "+this.id);
      this.getService(this.id);
    }

    ngOnInit() {
//this.getService(this.id);6
      //  this. searchMovieDB("mod");
         console.log('initializing ...... ag mode')
       //  this.getAllbranche();
   //    this.getHttpnative();
   //   this.getSecret();
  //     this. Listag();
         console.log('fin');
        //Called after the constructor, initializing input properties, and the first call to ngOnChanges.
        //Add 'implements OnInit' to the class.

    }
  getService(id){
    this.presentLoadingDefault();
      console.log("point 2");
    this.restservice.getServiceFromBranche(id).subscribe(Service =>{

          console.log('data a '+Service)
        Service= this.Service=Service;
        // var a=data.results
          console.log(Service)
          this.loadingfinish()
          this.iserror=false;
          },error=>{
            this.loadingfinish();
             this.iserror=true;
             this.presentToast();
             console.log("Service"+ error.status)}
      )
    }

  /**item taped */
  itemTaped(service){
    this.navCtrl.setRoot(Showticket,{id:service.serviceId,idbr:this.id,sernam:service.serviceName,branchename:this.brancheName});
      console.log("taped"+ service.serviceId);

  }
  //***************** */

//test
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

    //this.Rrefreshe();

  }
  presentToast() {
  let toast = this.toastCtrl.create({
    message: 'Problème de connexion',
    duration: 3000,
    position: 'bottom'
  });

  toast.onDidDismiss(() => {
    console.log('Dismissed toast');
  });

  toast.present();
}


  }
