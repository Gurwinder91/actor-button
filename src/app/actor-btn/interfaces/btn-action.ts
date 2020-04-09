import { HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';

export interface BtnAction {
    /**
     * @description Dispatch click event of btn to its parent component
     * @param headers
     * @returns Observalbe of any | Promise of any or boolean or undefined
     */
    act(headers: { headers: HttpHeaders }): Observable<any> | Promise<any> | boolean | void;
}
