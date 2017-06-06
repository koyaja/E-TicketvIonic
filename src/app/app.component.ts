import { HomePage } from './../pages/home/home';
import { Component } from '@angular/core';
import { Platform } from 'ionic-angular';
import { StatusBar, Splashscreen } from 'ionic-native';
import {Restservice} from './restservice/restservice'
//import {AgencesEntite} from './restservice/AgenceEntitie'
//import { TabsPage } from '../pages/tabs/tabs';
//import {GeolocalisationPage} from '../pages/geolocalisation/geolocalisation'
import { Storage } from '@ionic/storage';
import {TranslateService} from '@ngx-translate/core';
import { Network } from '@ionic-native/network';

/*import {
  Push,
  PushToken
} from '@ionic/cloud-angular';
*/
@Component({
  templateUrl: 'app.html',
  providers:[Restservice,Network]

})
export class MyApp {


  rootPage  = HomePage;


  constructor(platform: Platform, private storage:Storage,private translate: TranslateService,private restservice: Restservice) {
   /**chargement de la translation  */
    this.translateConfig();
//this.getconfig();
    platform.ready().then(() => {
      // Okay, so the platform is ready and our plugins are available.
      // Here you can do any higher level native things you might need.
      /*  this.push.register().then((t: PushToken) => {
  return this.push.saveToken(t);
}).then((t: PushToken) => {
  console.log('Token saved:', t.token);
});
this.push.rx.notification()
  .subscribe((msg) => {
    alert(msg.title + ': ' + msg.text);
  })*/


// stop disconnect watch
//disconnectSubscription.unsubscribe();



      StatusBar.styleDefault();
      Splashscreen.hide();
    });
/*   this.push.register().then((t: PushToken) => {
  return this.push.saveToken(t);
}).then((t: PushToken) => {
  console.log('Token saved:', t.token);
});
this.push.rx.notification()
  .subscribe((msg) => {
    alert(msg.title + ': ' + msg.text);
  });*/

            // device only code
            /*
            this.push.register().then((t: PushToken) => {
                return this.push.saveToken(t);
            }).then((t: PushToken) => {
                console.log('Token   saved:', t.token);
            });

            this.push.rx.notification()
            .subscribe((msg) => {
                console.log('Push Notification Received: ' + msg);
            });
      */



  }


/**methode de chargement de la langue */
translateConfig() {
    var userLang = navigator.language.split('-')[0]; // use navigator lang if available
    userLang = /(fr|en)/gi.test(userLang) ? userLang : 'fr';

    // this language will be used as a fallback when a translation isn't found in the current language
    this.translate.setDefaultLang('fr');

    // the lang to use, if the lang isn't available, it will use the current loader to get them
    this.translate.use(userLang);
  }
  /**requete de check serveur mobile pour la recuperation l'adresse api getway */
getconfig(){
  this.restservice.geturlapi().subscribe(api=>{
console.log(api)
this.storage.set('url', api.apigetwayurl);
this.storage.set('client', api.name);

},error=>{
  console.log(error);
})


/*
this.storage.get('url').then((val) => {
   if(val==null || val==""){
this.restservice.geturlapi().subscribe(api=>{
console.log(api)
this.storage.set('url', api.apigetwayurl);
this.storage.set('client', api.name);

})
   }
   else{

     console.log(val)
   }
  });*/
}

}
