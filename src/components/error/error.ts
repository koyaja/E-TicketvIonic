import { Component } from '@angular/core';

/*
  Generated class for the Error component.

  See https://angular.io/docs/ts/latest/api/core/index/ComponentMetadata-class.html
  for more info on Angular 2 Components.
*/
@Component({
  selector: 'error',
  templateUrl: 'error.html'
})
export class ErrorComponent {

  text: string;

  constructor() {
    console.log('Hello Error Component');
    this.text = 'Hello World';
  }

}
