import { NgModule } from '@angular/core';
import { ActorBtnDirective } from './actor-btn.directive';

@NgModule({
    declarations: [ActorBtnDirective],
    exports: [ActorBtnDirective]
})
export class ActorBtnModule { }
