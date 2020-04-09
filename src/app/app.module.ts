import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';
import { ActorBtnDirective } from './actor-btn/actor-btn.directive';

@NgModule({
  declarations: [
    AppComponent,
    ActorBtnDirective
  ],
  imports: [
    BrowserModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
