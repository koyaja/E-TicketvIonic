import { HomePage } from './../home/home';
import { ToastController } from 'ionic-angular/components/toast/toast';
import { TimerObservable } from 'rxjs/observable/TimerObservable';
import { VisitStatusEntity } from './../../app/entitie/visit-status.entity';
//import { VisitEntity } from './../../app/entitie/visit.entity';
//import { timeout } from 'rxjs/operator/timeout';
//import { createIdentifierToken } from '@angular/compiler/src/identifiers';
import { Component } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';
import { NavController, NavParams, LoadingController, AlertController } from 'ionic-angular';
import { Restservice } from '../../app/restservice/restservice'
//import {TextToSpeech} from '@ionic-native/text-to-speech';
import { LocalNotifications } from '@ionic-native/local-notifications';
import { BackgroundMode } from '@ionic-native/background-mode';
import { Platform } from 'ionic-angular';
import { AppMinimize } from '@ionic-native/app-minimize';
@Component({
  selector: 'page-showticket',
  templateUrl: 'showticket.html',
  providers: [Restservice, LocalNotifications]



})
export class Showticket {
  ticketinfo: {};
  ticketNumber: number;
  idser: number;
  idbr: number;
  clientId: string;
  checksum: number;
  visitId: number;
  sernam: string;
  queueId: number;
  branchId: number;
  serviceId: number;
  branchename?: string;
  ticketencour: boolean;
  iscalled: boolean = false;
  isticketfinish: boolean = false;
  hilightSelcted: boolean = false;
  iserror: boolean = false;
  guichet: string;
  /**Queut info  */

  public servicePointName: string = "";
  public visitPosition: number;
  public waitingVisits: number;
  public index1: number;
  public upper: number;
  public lower: number;
  public prevWaitingVisits: number;
  public prevVisitPosition: number;
  public prevUpperBound: number;
  public prevLowerBound: number;

  public timer;
  loading: any;
  visitinfo: VisitStatusEntity = new VisitStatusEntity()
  tab: Array<any> = []
  items: number[] = [];
  fakeArray = new Array(1);
  istiketpresente: boolean = true;
  /**Translate service  */
  titlenotif: string = "Notification";
  titlecancel: string = "Annuler Visite";
  messagenotif: string = "C'est votre tour";
  okbuttonenotif: string = "ok";
  okbuttonecancel: string = "Oui";
  cancelbuttonnotif: string = "non";
  cancelbuttoncancel: string = "Non";
  messagecancel: string = "Voulez vous  annuler la visite";
  text: string = "cool";


  constructor(private appMinimize: AppMinimize,private toastCtrl: ToastController, public translate: TranslateService, private platform: Platform, private backgroundMode: BackgroundMode, private localNotifications: LocalNotifications, public navCtrl: NavController, private restservice: Restservice, private navParams: NavParams, public loadingCtrl: LoadingController, private alertCtrl: AlertController) {

    this.presentLoadingDefault();
    this.idser = navParams.get('id');
    this.idbr = navParams.get('idbr');
    this.branchename = navParams.get('branchename');
    this.sernam = navParams.get('sernam');
    this.getvisit(this.idser, this.idbr);
    this.backgroundMode.enable();

    this.platform.registerBackButtonAction(() => {
      console.log('go back')
      this.appMinimize.minimize().then(
        success => console.log('Closed'),
        err => console.log('Something went wrong')
      );

     /* if (this.istiketpresente === true) {
        this.backgroundMode.enable();
        this.presentToast();
        console.log("ticketinfo")
      } else {
        console.log("exte")
        this.platform.exitApp();
      }*/

      //

    }, 200);
    this.chargeTranslate();

  }

  ngOnInit() {


  }

  /*async sayText():Promise<any>{
    try{
      await this.tts.speak({text:this.text,locale:"fr-FR",rate:0.5}).then(res=>{
        console.log(res)
      }).catch(erro=>{
        console.log(erro)
      });
    }
    catch(e){
      console.log(e);
    }
  }*/
  //creer la visite (ticket)
  getvisit(idser, idbr) {
    console.log("Showticket.getvisit ");
    this.restservice.creatvisit(idser, idbr).subscribe(ticketinfo => {
      console.log('data showticket ' + ticketinfo)
      ticketinfo = this.ticketinfo = ticketinfo;
      // var a=data.results
      this.ticketNumber = ticketinfo.ticketNumber;
      this.branchId = ticketinfo.branchId;
      this.queueId = ticketinfo.queueId;
      this.checksum = ticketinfo.checksum;
      this.serviceId = ticketinfo.serviceId;
      this.visitId = ticketinfo.visitId;
      this.queueId = ticketinfo.queueId;
      // setInterval(console.log(this.loading), 5000);
      console.log(ticketinfo)

      if (this.visitId != null) {
        setTimeout(() => { this.gevisitstatus(this.branchId, this.visitId, this.checksum) }, 3000);
      }
      this.loadingfinish();
      console.log(ticketinfo)
    }, error => {
      this.loadingfinish();
      // alert(error + 'erreur')
    }
    )
  }

  /**pop retour */
  Cancelvisite() {
    console.log("Showticket.Cancelvisite ");
    this.istiketpresente = false;
    let alert = this.alertCtrl.create({
      title: this.titlecancel,
      message: this.messagecancel,
      buttons: [
        {
          text: this.cancelbuttoncancel,
          role: 'cancel',
          handler: () => {
            this.istiketpresente = true;
            setTimeout(() => { this.gevisitstatus(this.branchId, this.visitId, this.checksum) }, 3000);
            console.log('Cancel clicked');
          }
        },
        {
          text: this.okbuttonecancel,
          handler: () => {

            this.SuprimerTicket();
            this.navCtrl.setRoot(HomePage)
            console.log('Buy clicked');
          }
        }
      ]
    });
    alert.present();
    //this.navCtrl.pop();
  }

  //Animation des positions
  public animatePosition(index): boolean {
    if (this.hilightSelcted && index !== this.visitPosition) {
      return false;
    }
    /*/ else if (this.index === this.upper && this.upper > this.prevUpperBound) {
         return true;
 }*/
    return true;
  }


  /** fonction etat visite */
  gevisitstatus(idbr, idse, cheksum) {
   console.log("Showticket.gevisitstatus ");

    this.restservice.getcurentvisitstat(idbr, idse, cheksum).then(ticketviststatus => {
      this.visitinfo = ticketviststatus;

      //verifier la connexion
    /*  if (typeof  this.visitinfo == 'undefined' ) {
        console.log('connection perdu')
        this.toastError();
        setTimeout(() => { this.gevisitstatus(this.branchId, this.visitId, this.checksum) }, 10000);
        return;
      }*/


      if (this.iscalled) {
        // Verifier le statut pour savoir lorsque le ticket passe au status END
        setTimeout(() => { this.teststatut(ticketviststatus) }, 3000);
      }
      else {
        //
        this.visitPosition = this.visitinfo.position;
        this.servicePointName = this.visitinfo.servicePointName;
        // Trier  de rang
        this.fakeArray = (() => {
          let startFromZero = false;
          let array = Array(this.visitinfo.queueSize);

          for (let i = 0; i < array.length; i++) {
            array[i] = i + (startFromZero ? 0 : 1);
          }

          return array.sort(function (a, b) {
            return b - a;
          });
        })();

        /* Appel de test status */
        setTimeout(() => { this.teststatut(ticketviststatus) }, 3000);


      }
      console.log(ticketviststatus)
      this.iserror = false;
    }, error => {

      console.log(error)
      console.log(' error ===> debug:')
      console.debug(error)

      // if(error.status==404 && error._body.message==="New visits are not available until visitsOnBranchCache is refreshed"){
      if(error.status==404 && this.iscalled){
         this.isticketfinish = true
      }else{
      this.iserror = true;
      }
    })
/*    .catch(error => {
      console.log('Une erreur est survenue ' + error)
      console.log(error)
    })*/
  }


  //**looding  chargemet  */
  presentLoadingDefault() {
    this.loading = this.loadingCtrl.create({
      content: 'Chargement en cours...'
    });
    this.loading.present();
  }

  /**Chageme,t terminé  */
  loadingfinish() {
    setTimeout(() => {
      this.loading.dismiss();
    }, 3000);
    // this.ecoute=true;
    //this.Rrefreshe();
  }
  /**voir si la position est superieur 10 */
  showrang(): any {
    if (this.visitPosition > 10) {
      return false;
    }
    else {
      return true;
    }
  }

  /**visite position index du client  */

  public SelctedPosition(index): boolean {
    // console.log("inexdex")
    // console.log(index)
    if (index === this.visitPosition) {
      this.hilightSelcted = true;
      return true;
    }
    return false;
  }

  /** Voir la status du client  */

  private teststatut(Viststate: VisitStatusEntity) {
    console.log('test status')
    if (typeof Viststate == 'undefined' && this.iscalled) {
      console.log('ticket fini' + Viststate)
      this.isticketfinish = true
    } else {

      if (Viststate.currentStatus === 'IN_QUEUE' && this.istiketpresente) {
        if (this.queueId != Viststate.queueId) {
          this.sernam = Viststate.queueName;
        }
        this.timer = TimerObservable.create(5000, 5000);
        if (!this.showrang()) {
          setTimeout(() => { console.log('10'); this.gevisitstatus(this.branchId, this.visitId, this.checksum) }, 10000)
        } else {
          console.log('verifie')
          setTimeout(() => { this.gevisitstatus(this.branchId, this.visitId, this.checksum) }, 3000)
        }

      } else if (Viststate.currentStatus === 'CALLED') {
        // this.istiketpresente = false;
        if (this.iscalled) {
          setTimeout(() => { this.gevisitstatus(this.branchId, this.visitId, this.checksum) }, 3000)
        } else {
          this.guichet = Viststate.servicePointName;
          this.notification();
          this.presentAlert()
          setTimeout(() => { this.gevisitstatus(this.branchId, this.visitId, this.checksum) }, 3000)
        }
        //this.text="Vous ete attendu";
        // this.sayText();
        console.log('called')
      }
    }
  }
  /**Alert de ticket  */
  presentAlert() {
    let alert = this.alertCtrl.create({
      title: this.titlenotif,
      subTitle: this.messagenotif + this.servicePointName,
      buttons: [{
        text: this.okbuttonenotif,
        handler: () => {
          // this.navCtrl.setRoot(HomePage)
          console.log('Buy clicked');
        }
      }]
    });
    alert.present();
  }
  /**Confimation annuler ticket */
  presentConfirm() {
    let alert = this.alertCtrl.create({
      title: this.titlenotif,
      message: this.messagenotif + this.servicePointName,
      buttons: [
        {
          text: this.cancelbuttonnotif,
          role: 'cancel',
          handler: () => {
            console.log('Cancel clicked');
          }
        },
        {
          text: this.okbuttonenotif,
          handler: () => {
            this.navCtrl.setRoot(HomePage)
            console.log('Buy clicked');
          }
        }
      ]
    });
    alert.present();
  }
  /**Notification  */
  notification() {
    this.iscalled = true;
    this.localNotifications.schedule({
      id: 1,
      text: 'Vous ete appele',
      // sound: '../../assets/YourTurn.wav',
      data: { secret: "nonif" }
    });

  }
  /**Annuler Ticket */
  SuprimerTicket() {
    this.presentLoadingDefault()
    this.restservice.cancelvisit(this.branchId, this.visitId, this.checksum).then(ticketsuprime => {
      this.loadingfinish();
      console.log(ticketsuprime)

    }, error => {
      console.log('erreur ' + error);
      this.loadingfinish();
    }
    )
  }
  /**charger les translation  */
  getTranslante(id): any {
    this.translate.get(id).subscribe((res: string) => {
      return res;
    });
  }

  chargeTranslate() {
    // this.titlenotif = this.getTranslante('Showticketpage.dialog.titleTicketCall');
    // this.titlecancel =  this.getTranslante('Dialogue.titlecancel');

    this.translate.get('Showticketpage.dialog.titleTicketCall').subscribe((res: string) => {
      this.titlenotif = res;
    });
    this.translate.get('Dialogue.titlecancel').subscribe((res: string) => {
      this.titlecancel = res;
    });
    this.translate.get('Dialogue.massagenofif').subscribe((res: string) => {
      this.messagenotif = res;
    });
    this.translate.get('Dialogue.massagecancel').subscribe((res: string) => {
      this.messagecancel = res;
    });
    this.translate.get('Dialogue.oknotif').subscribe((res: string) => {
      this.okbuttonenotif = res;
    });
    this.translate.get('Dialogue.okcancel').subscribe((res: string) => {
      this.okbuttonecancel = res;
    });
    this.translate.get('Dialogue.cancelbuttonnotif').subscribe((res: string) => {
      this.cancelbuttonnotif = res;
    });

  }

  /**Tosat en cas d'erreur */
  presentToast() {
    let toast = this.toastCtrl.create({
      message: 'Appuyer sur la touche du milieu ou annuler le ticket',
      duration: 3000,
      position: 'bottom'
    });

    toast.onDidDismiss(() => {
      console.log('Dismissed toast');
    });

    toast.present();
  }

  toastError() {
    this.toast("Problème de connexion");
  }

  toast(msg) {
    let toast = this.toastCtrl.create({
      message: msg,
      duration: 3000,
      position: 'bottom'
    });

    toast.onDidDismiss(() => {
      console.log('Dismissed toast');
    });

    toast.present();
  }
  /***retour home */
  home() {
    this.istiketpresente=false;
    this.navCtrl.setRoot(HomePage)
  }
}
