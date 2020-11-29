import {Injectable} from '@angular/core';
import {AlphaVantageApiKey} from "../../models/alpha-vantage-api-key";
import {IexApiKey} from "../../models/iex-api-key";
import {IexSandboxApiKey} from "../../models/iex-sandbox-api-key";
import {ApiKeyLoadServiceService} from "../api-key-load-service/api-key-load-service.service";
import {ApiKeyNotLoadError} from "../../errors/api-key-not-load-error";
import {HttpClient} from "@angular/common/http";
import {PathBuilderService} from "../path-builder-service/path-builder.service";
import {from, Observable, of, Subscribable, Subscriber, Subscription} from "rxjs";
import {map, pluck, switchMap} from "rxjs/operators";
import {ApiKey} from "../../models/api-key";

@Injectable({
    providedIn: 'root'
})
export class KeysKeeperService {
    public alphaVantageApiKey
        = new AlphaVantageApiKey("alphaVantageApiKey", "Alpha Vantage api key");
    public iexApiKey
        = new IexApiKey("iexApiKey", "IEX cloud api key");
    public iexSandboxApiKey
        = new IexSandboxApiKey("iexSandboxApiKey", "IEX cloud sandbox api key");

    constructor(private _loader: ApiKeyLoadServiceService,
                private _http: HttpClient,
                private _pathBuilder: PathBuilderService) {
        this.loadKeys()
        this.verifyKeys()
    }

    public loadKeys() {
        this._loader.loadUserApiKey(this.alphaVantageApiKey);
        this._loader.loadUserApiKey(this.iexApiKey);
        this._loader.loadUserApiKey(this.iexSandboxApiKey);
    }

    public verifyKeys() {
        this.alphaVantageApiKey.verify(this._http, this._pathBuilder).subscribe();
        this.iexApiKey.verify(this._http, this._pathBuilder).subscribe();
        this.iexSandboxApiKey.verify(this._http, this._pathBuilder).subscribe();


        //TODO: обработка ошибок - не доходит до финального switchMap после ошибки?
        //
        // let al = this.alphaVantageApiKey.verify(this._http, this._pathBuilder);
        // let ie = this.iexApiKey.verify(this._http, this._pathBuilder);
        // let ies = this.iexSandboxApiKey.verify(this._http, this._pathBuilder);
        //
        // return al.pipe(
        //     // map(r => this.alphaVantageApiKey.isValid = r.isValid),
        //
        //     switchMap(() => ie),
        //     // map(r => this.iexApiKey.isValid = r),
        //
        //     switchMap(() => ies),
        //     // map(r => this.iexSandboxApiKey.isValid = r.isValid)
        // )


        // TODO: не работает!
        // const alpha = this.alphaVantageApiKey.verify(this._http, this._pathBuilder);
        // const iex = this.iexApiKey.verify(this._http, this._pathBuilder);
        // const iexSb = this.iexSandboxApiKey.verify(this._http, this._pathBuilder);
        //
        // return of(alpha, iex, iexSb);
    }

    public saveKeys() {
        this._loader.saveUserApiKey(this.alphaVantageApiKey);
        this._loader.saveUserApiKey(this.iexApiKey);
        this._loader.saveUserApiKey(this.iexSandboxApiKey);
    }
}
