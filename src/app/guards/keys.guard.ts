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

        if (this._keys.alphaVantageApiKey.keyValue
            && this._keys.iexApiKey.keyValue
            && this._keys.iexSandboxApiKey.keyValue) {
            return true;
        } else {
            return this._router.navigate(['about'])
                .then(_ => false);
        }
    }
}
