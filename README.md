# Actor Button
This is a lightweight library developed using latest Angular 9 to show or hide loader on button or disable it when we are doing some asynchronous task. 
[StackBlitz Demo](https://stackblitz.com/edit/actor-btn)

## How to install
`npm i actor-btn --save`

## How to use

* Add below line to your app.module.ts file

`import {ActorBtnModule} from 'actor-btn'`

* Add Below line to your component in which you want to use Actor Btn

`import { BtnAction, BtnState } from 'actor-btn';`

* Register your event to **btnAction** property in **ngOnInit** lifecycle hook. it helps to trigger it when user will click on button.

<pre>
 ngOnInit() {
   this.btnAction = {
     act: () => of('sucess').pipe(delay(2000)); // Your async operation.
   }
 }
</pre>

Note: you can also have promise operation. For reference, please visit [StackBlitz Demo](https://stackblitz.com/edit/actor-btn)

* In Html of the same component refer to below code.

`
 <button class="btn" [actorBtn]="btnAction" (stateChange)="btnState = $event">
   Using Promise
   <img src="/assets/loader.gif" *ngIf="btnState?.clicked"> <!-- You can have your own loader here.-->
 </button>
`

Note: you can listen to **btnState** event to show and hide loader or to do anything else, according to your use case.

### Advance Guide
Actor Btn is also exposing header which you can use to show and hide global loader when you are showing loader on your button. Refer below example for that

<pre>
ngOnInit() {
   this.btnAction = {
     act: options => this.callingService(options);
   }
 }

callingService(headers: {[name: string]: any }){
  return this.httpClient.get('YOUR URL', headers);
}
</pre>

you can listen these headers in your interceptor and apply your condition, if actorBtn is present in headers then show or hide your global loader.