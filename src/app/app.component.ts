import { Component, OnInit } from '@angular/core';

import { of } from 'rxjs';
import { delay } from 'rxjs/operators';

import { BtnAction, BtnState } from './actor-btn/interfaces';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
  title = 'Generic-progress-button';

  btnActionOb: BtnAction;
  btnActionPm: BtnAction;
  btnActionVoid: BtnAction;
  btnActionBl: BtnAction;
  btnState1: BtnState;
  btnState2: BtnState;
  btnState3: BtnState;
  btnState4: BtnState;

  ngOnInit() {
    this.btnActionOb = {
      act: this.asyncOperation
    }
    this.btnActionPm = {
      act: this.  asyncOperationWithPromise
    }
    this.btnActionVoid = {
      act: this.asyncOperationNoReturn
    }
    this.btnActionBl = {
      act: this.asyncOperationWithBoolean
    }
  }

  asyncOperation() {
    return of('sucess').pipe(delay(2000));
  }

  asyncOperationWithPromise() {
    return new Promise((resolve, reject) => {
      setTimeout(() => resolve('sucees'), 3000);
    });
  }

  asyncOperationWithBoolean() {
    return true;
  }

  asyncOperationNoReturn() {
    return;
  }

}
