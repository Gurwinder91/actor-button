import { Directive, OnDestroy, EventEmitter } from '@angular/core';
import { HttpHeaders } from '@angular/common/http';

import { Observable, Subscription } from 'rxjs';
import { finalize } from 'rxjs/operators';

import { BtnState, BtnAction } from './interfaces';

@Directive({
  selector: 'button[actorBtn], button[actor-btn]',
  inputs: [
    'action'
  ],
  outputs: [
    'stateChange'
  ],
  host: {
    '(click)': 'btnClicked($event)',
    '(keypress)': 'btnPressed($event)',
    '[disabled]': 'disable'
  },
  exportAs: 'actorBtn'
})
export class ActorBtnDirective implements OnDestroy {

  action: BtnAction;
  disable: boolean;
  private _subscription: Subscription;

  stateChange = new EventEmitter();

  btnPressed(event: KeyboardEvent) {
    event.preventDefault();
    const keyCode = event.keyCode || event.which;
    if (keyCode === 13){
      this._acting();
    }
  }

  btnClicked(event: MouseEvent) {
    event.preventDefault();
    this._acting();
  }

  private _acting(){
    this._changeState({ clicked: true });
    const HTTP_HEADERS = { headers: new HttpHeaders({ 'childSpinner': 'TRUE' }) };

    const action: Observable<any> | Promise<any> | boolean | void = this.action.act(HTTP_HEADERS);
    if (action instanceof Observable) { // Check if return type is observable
      this._subscription = (action as Observable<any>)
        .pipe(finalize(() => {
          this._changeState({ clicked: false });
        }))
        .subscribe(res => { });
    } else if (action instanceof Promise) { // Check if return type is Promise
      (action as Promise<any>).finally(() => {
        this._changeState({ clicked: false });
      });
    } else {
      this._changeState({ clicked: false });
    }
  }

  private _changeState(btn: BtnState) {
    this.disable = btn.clicked;
    this.stateChange.emit(btn);
  }

  ngOnDestroy() {
    if (this._subscription) {
      this._subscription.unsubscribe();
    }

    this.stateChange.unsubscribe();
  }
}
