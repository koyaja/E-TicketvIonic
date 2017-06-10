import { Injectable } from '@angular/core';


@Injectable()
export class GlobalVars {

  private static url: any;

  public setUrl(value) {
    console.log('GlobalVars.setUrl: ' + value);
    GlobalVars.url = value;
  }

  static getUrl() {
    console.log('GlobalVars.getUrl: ' + GlobalVars.url);
    return GlobalVars.url;
  }

}
