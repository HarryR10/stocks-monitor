import {Injectable} from '@angular/core';

@Injectable({
    providedIn: 'root'
})
export class ErrorHandlerService {

    constructor() {
    }

    public handleError(error: Error) {
        alert(error.message);
    }
}
