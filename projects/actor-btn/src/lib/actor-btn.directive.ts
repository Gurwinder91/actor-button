import { Directive, OnDestroy, EventEmitter, Input, Output, HostBinding, HostListener } from '@angular/core';
import { HttpHeaders } from '@angular/common/http';

import { Observable, Subscription } from 'rxjs';
import { finalize } from 'rxjs/operators';

import { BtnAction } from './interfaces/btn-action';
import { BtnState } from './interfaces/btn-state';

@Directive({
    selector: '[actorBtn]',
    exportAs: 'actorBtn'
})
export class ActorBtnDirective implements OnDestroy {

    @Input('actorBtn') action: BtnAction;
    @Output() stateChange = new EventEmitter();

    @HostBinding('disabled') disable: boolean;
    private subscription: Subscription;

    @HostListener('keypress', ['$event'])
    btnPressed(event: KeyboardEvent) {
        event.preventDefault();
        const key = event.key;
        if (key === 'Enter') {
            this.acting();
        }
    }

    @HostListener('click', ['$event'])
    btnClicked(event: MouseEvent) {
        event.preventDefault();
        this.acting();
    }

    private acting() {
        if (!this.action) {
            throw new Error(`button event handler is not passed. Pass it from [action] attribute`);
        }
        this.changeState({ clicked: true });
        const HTTP_HEADERS = { headers: new HttpHeaders({ actorBtn: 'true' }) };

        const action = this.action.act(HTTP_HEADERS);
        if (action instanceof Observable) { // Check if return type is observable
            this.subscription = (action as Observable<any>)
                .pipe(finalize(() => {
                    this.changeState({ clicked: false });
                }))
                .subscribe(res => { });
        } else if (action instanceof Promise) { // Check if return type is Promise
            (action as Promise<any>).finally(() => {
                this.changeState({ clicked: false });
            });
        } else {
            this.changeState({ clicked: false });
        }
    }

    private changeState(btn: BtnState) {
        this.disable = btn.clicked;
        this.stateChange.emit(btn);
    }

    ngOnDestroy() {
        if (this.subscription) {
            this.subscription.unsubscribe();
        }

        this.stateChange.unsubscribe();
    }
}
