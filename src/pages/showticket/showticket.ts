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
  /**Time manupule  */

  // private timerStart = 10 * 60 * 1000; //minutes
  //private timerGap = 1000;
  //private countDownreTimersource;
  //private serviceFecthTimerResource
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


  constructor(private toastCtrl: ToastController, public translate: TranslateService, private platform: Platform, private backgroundMode: BackgroundMode, private localNotifications: LocalNotifications, public navCtrl: NavController, private restservice: Restservice, private navParams: NavParams, public loadingCtrl: LoadingController, private alertCtrl: AlertController) {

    this.presentLoadingDefault();
    this.idser = navParams.get('id');
    this.idbr = navParams.get('idbr');
    this.branchename = navParams.get('branchename');
    this.sernam = navParams.get('sernam');
    this.getvisit(this.idser, this.idbr);
    this.backgroundMode.enable();
    if (this.visitId != null) {
      while (true) {
        console.log("check");
        this.gevisitstatus(this.branchId, this.visitId, this.checksum);
      }
      //
    }
    this.platform.registerBackButtonAction(() => {
      console.log('go back')
      if (this.istiketpresente === true) {
        this.backgroundMode.enable();
        this.presentToast();
        console.log("ticketinfo")
      } else {
        console.log("exte")
        this.platform.exitApp();
      }

      //

    }, 200);
    this.chargeTranslate();

  }

  ngOnInit() {
    if (this.visitId != null) {
      //
      console.log('init')
    }
    //Called after the constructor, initializing input properties, and the first call to ngOnChanges.
    //Add 'implements OnInit' to the class.
    // this.getAgence();
  }/**
  AfterViewInit() {
    if (this.visitId != null) {
      while (true) {
        console.log("check");
        this.gevisitstatus(this.branchId, this.visitId, this.checksum);
      }
      //
    }

  }*/

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
  getvisit(idser, idbr) {

    console.log("point 2 showticketPage");
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
            setTimeout(() => { this.gevisitstatus(this.branchId, this.visitId, this.checksum) }, 5000);
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
  /**Queut fonction
  public hilightSelctedPosition(): boolean {
    if (this.index1 === this.visitPosition) {
      return true;
    }
    return false;
  }
  public isEmptyQueueItem(): boolean {
    return !(this.index1 > 0);
  }


  public getQueueindex1(): any {
    if (this.hilightSelctedPosition()) {
      return this.index1;
    }
    return this.trimindex1(this.index1);
  }

  public trimindex1(index1: number): any {
    if (index1 && index1.toString().length > 3) {
      let a = index1.toString().substr((index1.toString().length - 2), (index1.toString().length));
      return '.' + a;
    }
    return index1;
  }
  */
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
    console.log("get visite state");

    this.restservice.getcurentvisitstat(idbr, idse, cheksum).then(ticketviststatus => {

      this.visitinfo = ticketviststatus;
      if (this.iscalled) {
        // Verifier le statut pour savoir lorsque le ticket passe au status END
        setInterval(this.teststatut(ticketviststatus), 3000);
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

        /**Apele de test status */
        setInterval(this.teststatut(ticketviststatus), 3000);

        //  this.Prosses(this.visitinfo.queueSize)
        // this.createRange(this.visitinfo.queueSize)
        // ticketviststatus= this.ticketinfo=ticketviststatus;
        // var a=data.results
        /*   this.ticketNumber=ticketinfo.ticketNumber;
           this.branchId=ticketinfo.branchId;
           this.queueId=ticketinfo.queueId;
           this.checksum=ticketinfo.checksum;
           this.serviceId=ticketinfo.serviceId;
           this.visitId=ticketinfo.visitId;*/
      }
      console.log(ticketviststatus)
      this.iserror = false;
    }, error => {

      console.log(error)
      this.iserror = true;
      // alert(error + 'erreur')
    }
    )
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
    console.log("inexdex")
    console.log(index)
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
    this.titlenotif = this.getTranslante('Showticketpage.dialog.titleTicketCall');
    // this.titlecancel =  this.getTranslante('Dialogue.titlecancel');

    /*    this.translate.get('Showticketpage.dialog.titleTicketCall').subscribe((res: string) => {
          this.titlenotif = res;
        });*/
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
  /***retour home */
  home() {
    this.navCtrl.setRoot(HomePage)
  }
}
