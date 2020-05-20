# Actor Button
This is a lightweight library developed using latest Angular 9 to show loader on button when we are doing some asynchronous task. 
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


Note: you can listen to **btnState** to show and hide loader or to do anything else, according to your use case.
