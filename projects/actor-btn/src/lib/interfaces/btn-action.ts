import { HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';

export interface BtnAction {
    /**
     * @description Dispatch click event of btn to its parent component
     * @param headers Actor button will pass header to show or hide other loaders of application
     * @returns Observalbe of any or Promise of any or boolean or undefined
     */
    act(headers: { headers: HttpHeaders }): Observable<any> | Promise<any> | boolean | void;
}
