import { Storage } from '@ionic/storage';
import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';

@Component({
  selector: 'page-parametre',
  templateUrl: 'parametre.html'
})
export class Parametre {
num:any;
  constructor(public navCtrl: NavController,private storage:Storage) {

  }
ngOnInit() {
  this.getMum();
  //Called after the constructor, initializing input properties, and the first call to ngOnChanges.
  //Add 'implements OnInit' to the class.

}
getMum(){
   this.storage.get('numero').then((val) => {
         console.log('Your age is', val);

          this.num=val;



       })
}
modifnum(){
  console.log('modif');
this.storage.set('numero',''+this.num);
this.navCtrl.pop();
}
}
