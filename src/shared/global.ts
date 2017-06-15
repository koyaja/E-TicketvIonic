import { Injectable } from '@angular/core';


@Injectable()
export class GlobalVars {

  private static url: any;
  private static client: any;

  public setUrl(value) {
    console.log('GlobalVars.setUrl: ' + value);
    GlobalVars.url = value;
  }
  public setClient(value) {
    console.log('GlobalVars.setClient: ' + value);
    GlobalVars.client = value;
  }

  static getUrl() {
    console.log('GlobalVars.getUrl: ' + GlobalVars.url);
    return GlobalVars.url;
  }
  static getClient() {
    console.log('GlobalVars.getClient: ' + GlobalVars.client);
    return GlobalVars.client;
  }

}
