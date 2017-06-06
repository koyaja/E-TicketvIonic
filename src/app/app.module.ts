import { PrdvPage } from './../pages/prdv/prdv';
import { ErrorComponent } from './../components/error/error';
//import { TextToSpeech } from '@ionic-native/text-to-speech';
import { PopoverPage } from './../pages/popover/popover';
//import { TextToSpeech } from '@ionic-native/text-to-speech'
import { Restservice } from './restservice/restservice';
//import { HttpService } from './providers/http.service';
import { NgModule, ErrorHandler } from '@angular/core';
import { IonicApp, IonicModule, IonicErrorHandler } from 'ionic-angular';
//import { CloudSettings, CloudModule } from '@ionic/cloud-angular';
import { MyApp } from './app.component';
import { Showticket } from '../pages/showticket/showticket';
import { ContactPage } from '../pages/contact/contact';
import { HomePage } from '../pages/home/home';
//import { PostticketPage } from '../pages/postticket/postticket';
import { TabsPage } from '../pages/tabs/tabs';
import { NewticketPage } from '../pages/newticket/newticket';
import { ServicePage } from '../pages/service/service'
import { ListagencePage } from '../pages/listagence/listagence';
import { MarketingPage } from '../pages/marketing/marketing';
import { Parametre } from '../pages/parametre/parametre';
import { GeolocalisationPage } from '../pages/geolocalisation/geolocalisation'
import { IonicStorageModule } from '@ionic/storage';
import { HttpModule } from '@angular/http';
import { BackgroundMode } from '@ionic-native/background-mode';
import { TranslateModule, TranslateLoader } from '@ngx-translate/core';
//import { TranslateHttpLoader } from '@ngx-translate/http-loader';
import { Http } from '@angular/http'
import { createTranslateLoader } from "./providers/createTranslateLoader";
//import { HttpModule, RequestOptions, XHRBackend } from '@angular/http';
/*
const cloudSettings: CloudSettings = {
  'core': {
    'app_id': '3639a903'
  },
  'push': {
    'sender_id': '989212956025',
    'pluginConfig': {
      'ios': {
        'badge': true,
        'sound': true
      },
      'android': {
        'iconColor': '#343434'
      }
    }
  }
};*/
@NgModule({
  declarations: [
    MyApp,
    Showticket,
    ContactPage,
    HomePage,
    TabsPage,
    NewticketPage,

    ListagencePage,
    MarketingPage,
    Parametre,
    GeolocalisationPage,
    ServicePage,
    PopoverPage,
    ErrorComponent,
    PrdvPage


    //  PostticketPage
  ],
  imports: [HttpModule,
    IonicModule.forRoot(MyApp),
    // CloudModule.forRoot(cloudSettings),

    IonicStorageModule.forRoot(),
    TranslateModule.forRoot({
      loader: {
        provide: TranslateLoader,
        useFactory: (createTranslateLoader),
        deps: [Http]
      }
    })
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    MyApp,
    Showticket,
    ContactPage,
    HomePage,
    TabsPage,
    NewticketPage,

    ListagencePage,
    MarketingPage,
    Parametre,
    GeolocalisationPage,
    ServicePage,
    PopoverPage,
    PrdvPage

    // PostticketPage
  ],
  providers: [Restservice, BackgroundMode, { provide: ErrorHandler, useClass: IonicErrorHandler }]
})
export class AppModule { }
