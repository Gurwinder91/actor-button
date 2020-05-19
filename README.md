# ActorBtn

This is a lightweight library created using latest Angular 9 to show loader on button when
we are doing some asynchronous task.

[Stackblitz Demo](https://stackblitz.com/edit/actor-btn)

## How to install

> npm install actor-btn --save 

## How to use

Add below Module, In your app.module.ts file

`import {ActorBtnModule} from 'actor-btn'`

Add Below to your component where you want to use Actor Btn

`import { BtnAction, BtnState } from 'actor-btn';`

Note: BtnState will provide you flag when operation start or end. You can show and hide loader by listening to it.

` ngOnInit() {
    this.btnAction = {
      act: this.asyncOperation
    }

asyncOperation() {
    // Your async operation.
    return of('sucess').pipe(delay(2000));
  }
    `
In Html of the same component refer to below code

`<button class="btn" [actorBtn]="btnAction" (stateChange)="btnState = $event">
    <span>
      Using Promise
      <img src="/assets/loader.gif" *ngIf="btnState?.clicked">
    </span>
  </button>
  `


