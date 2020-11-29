import {Injectable} from '@angular/core';
import {CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, UrlTree, Router} from '@angular/router';
import {Observable, Subscription} from 'rxjs';
import {KeysKeeperService} from "../services/keys-keeper-service/keys-keeper.service";
import {map, pluck, switchMap} from "rxjs/operators";

@Injectable({
    providedIn: 'root'
})
export class KeysGuard implements CanActivate {
    constructor(private _router: Router,
                private _keys: KeysKeeperService) {
    }

    canActivate(
        route: ActivatedRouteSnapshot,
        state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {

        // let al = this._keys.al$.pipe(
        //     pluck("isValid"),
        //     map(r => console.log("al " + r)),
        //
        //     switchMap(() => this._keys.ie$),
        //     pluck("isValid"),
        //     map(r => console.log("ie " + r)),
        //
        //     switchMap(() => this._keys.ies$),
        //     pluck("isValid"),
        //     map(r => console.log("ies " + r))
        // ).subscribe();


        if (this._keys.alphaVantageApiKey.keyValue
            && this._keys.iexApiKey.keyValue
            && this._keys.iexSandboxApiKey.keyValue) {
            console.log("checked")
            return true;
        } else {
            return this._router.navigate(['about'])
                .then(_ => false);
        }
    }
}
