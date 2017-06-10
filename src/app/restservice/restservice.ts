import { GlobalVars } from './../../shared/global';
import {VisitStatusEntity }from './../entitie/visit-status.entity';
import {Injectable }from '@angular/core'
import {Http }from '@angular/http'
import {Observable }from 'rxjs/Observable';
import {Headers, RequestOptions }from '@angular/http';
import {Storage }from '@ionic/storage';
import 'rxjs/Rx'


@Injectable()
export class Restservice {

public http:any;
//signature:string = "b903de146a3764e2141c464713212606"
baseUrl:String;
headers:any;
//urlAdminServeur:string;
option:any;
constructor(http:Http, private storage:Storage) {
//Entete des requet emit vers l'api getway
    this.headers = new Headers();
    console.log("point 1");
    this.headers.append("accept", "application/json");
    this.headers.append("Content-Type", "application/json");
    this.headers.append("auth-token", "06a91668-9e6c-4ac0-9566-830c30720150");
    this.option = new RequestOptions({ headers: this.headers });


   /*   this.storage.get('url').then((val) => {
 //   this.baseUrl = val;
      console.log(val);
       }

   );*/

   this.baseUrl=GlobalVars.getUrl();
    console.log("Restservice.construtor: " +this.baseUrl);
    //this.urlAdminServeur="http://192.168.0.137:8080/webAdmin/api/clients/sign/";
    this.http = http;
   // this.baseUrl = 'http://192.168.0.137:9090/MobileTicket/';
   // this.baseUrl = '/api/';
  }




  /**Recuperer les branches */
  getAllbranches() {
   // this.baseUrl=GlobalVars.getUrl();

    // this.baseUrl=this.myGlobalurl.getMyGlobalUrl();
    /*    let headers = new Headers();
    console.log("point 1");
    headers.append("accept", "application/json");
    headers.append("Content-Type", "application/json");
    headers.append("auth-token", "06a91668-9e6c-4ac0-9566-830c30720150");
    var option = new RequestOptions({ headers: headers });*/
    console.log("getbranche url: "+this.baseUrl + "branches/?longitude=0&latitude=0&radius=2147483647")
    return this.http.get(this.baseUrl + "branches/?longitude=0&latitude=0&radius=2147483647", this.option).map(res => res.json());
  }

  getAdresse(adr) {
    console.log('getAdresse ' + adr);
    var url = 'https://maps.googleapis.com/maps/api/geocode/json?latlng=' + adr + '&key=AIzaSyCv-q1pzWPUy3vH_wHgsT1PxOJo6htg3uc';
    var response = this.http.get(url).map(res => res.json());
    console.log('getAdresse url  ' + url);
    return response;
  }
  /** service des branches */
  getServiceFromBranche(id) {
  /*  let headers = new Headers();
    console.log("point 1");
    headers.append("accept", "application/json");
    headers.append("Content-Type", "application/json");
    headers.append("auth-token", "06a91668-9e6c-4ac0-9566-830c30720150");
    headers.append('Authorization', 'Basic bW9iaWxlOk1vYmlsZTEyMw == ');
    var option = new RequestOptions({ headers: headers });*/
    console.log("get service from branche url {}"+this.baseUrl + "branches/" + id + "/services/wait-info")
    return this.http.get(this.baseUrl + "branches/" + id + "/services/wait-info",this.option).map(res => res.json());
  }
  /**creer visite */
  creatvisit(idser, idbr) {
  /*  let headers = new Headers();
    console.log("point 1");
    headers.append("accept", "application/json");
    headers.append("Content-Type", "application/json");
    headers.append("auth-token", "06a91668-9e6c-4ac0-9566-830c30720150");
    headers.append('Authorization', 'Basic bW9iaWxlOk1vYmlsZTEyMw == ');
    var option = new RequestOptions({ headers: headers });*/
    console.log("creat visite url {}"+this.baseUrl + "services/" + idser + "/branches/" + idbr + "/ticket/issue")
    return this.http.post(this.baseUrl + "services/" + idser + "/branches/" + idbr + "/ticket/issue", {}, this.option).map(res => res.json());
  }
  /** etat de la visite  */
  getcurentvisitstat(branchIdVal, visitIdVal, checksum): Promise<VisitStatusEntity> {

/*    let headers = new Headers();
    console.log("point 1");
    headers.append("accept", "application/json");
    headers.append("Content-Type", "application/json");
    headers.append("auth-token", "06a91668-9e6c-4ac0-9566-830c30720150");
    headers.append('Authorization', 'Basic bW9iaWxlOk1vYmlsZTEyMw == ');

    var option = new RequestOptions({ headers: headers });
*/
    console.log("get visite state url {}"+this.baseUrl + "MyVisit/CurrentStatus/branches/" + branchIdVal + "/visits/" + visitIdVal + "?checksum=" + checksum)

    const url = this.baseUrl + "MyVisit/CurrentStatus/branches/" + branchIdVal + "/visits/" + visitIdVal + "?checksum=" + checksum;
    return this.http.get(url, this.option)
      .toPromise()
      .then(response => response.json() as VisitStatusEntity)
     // .catch(error => console.log('Une erreur est survenue ' + error))
  }

  //Annuler la visite
  cancelvisit(branchIdVal, visitIdVal, checksum): Promise<any> {

  /*  let headers = new Headers();
    console.log("point 1");
    headers.append("accept", "application/json");
    headers.append("Content-Type", "application/json");
    headers.append("auth-token", "06a91668-9e6c-4ac0-9566-830c30720150");
    headers.append('Authorization', 'Basic bW9iaWxlOk1vYmlsZTEyMw == ');

    var option = new RequestOptions({ headers: headers });*/
    //const url = `${this.baseUrl}articles?source=${this.source}&sortBy=latest&apiKey=${this.apiKey}`;
    console.log("cancel visite url {}"+this.baseUrl + "branches/" + branchIdVal + "/ticket/" + visitIdVal + "?checksum=" + checksum)

    const url = this.baseUrl + "branches/" + branchIdVal + "/ticket/" + visitIdVal + "?checksum=" + checksum;
    //const url=this.baseUrl+"MyVisit/CurrentStatus/branches/" + "1" + "/visits/" + "5"+ "?checksum=" + 2067227335;
    return this.http.delete(url, this.option)
      .toPromise()
      .then(response => response.json())
      .catch(error => console.log('Une erreur est survenue ' + error))
  }
/*
  AgenceService() {
    let headers = new Headers();
    let h = new Headers();

    h.append('Authorization', 'Bearer 06a91668-9e6c-4ac0-9566-830c30720150');
    //   var token = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJqdGkiOiJkNjk2NGU2NS1hNGYzLTRhZGEtYTgwNS01ODBlNDQxYzZkZDIifQ.4GA6JVJkWbYQH-7bYHpzv9SafsO-QxLrq62gem8pQCQ';
    headers.append("accept", "application/json");
    headers.append("Content-Type", "application/json");
    headers.append("auth-token", "06a91668-9e6c-4ac0-9566-830c30720150");
    headers.append('Authorization', 'Basic bW9iaWxlOk1vYmlsZTEyMw == ');
    var option = new RequestOptions({ headers: headers });

    console.log(headers);
    var response = this.http.get("${this.baseUrl}branches/?longitude=0&latitude=0&radius=2147483647", option)
      .map(res => res.json());
    console.log("branche " + response);
    console.log(response);
    return response;
  }*/

  handleError(error) {
    return Observable.throw(error.json().error || 'Server error');
  }

}
