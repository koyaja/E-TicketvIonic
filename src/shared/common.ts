import { LoadingController } from 'ionic-angular';
import { Injectable } from '@angular/core';
import { ToastController } from 'ionic-angular/components/toast/toast';


@Injectable()
export class Common{
  /**
   *
   */
  constructor(private toastCtrl: ToastController,public loadingCtrl: LoadingController) {


  }

  //Affichier le toast
  public  presentToast(msg) {
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
/* public presentLoadingDefault() {
    this.loading = this.loadingCtrl.create({
      content: 'Chargement en cours...'
    });
    this.loading.present();


  }*/

}
