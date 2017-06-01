import { Injectable, NgZone } from '@angular/core';
import { Geolocation, Geoposition, BackgroundGeolocation } from 'ionic-native';
import 'rxjs/add/operator/filter';
 
@Injectable()
export class LocationTracker {
 
  public watch: any;    
  public lat: number = 0;
  public lng: number = 0;
 
  constructor(public zone: NgZone) {
 
  }
 
  startTracking() {

 
  }
 
  stopTracking() {
 
 console.log('stopTracking');
 
  BackgroundGeolocation.finish();
  this.watch.unsubscribe();
  }
 
}