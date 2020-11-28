import {Injectable} from '@angular/core';
import {AlphaVantageApiKey} from "../../models/alpha-vantage-api-key";
import {IexApiKey} from "../../models/iex-api-key";
import {IexSandboxApiKey} from "../../models/iex-sandbox-api-key";
import {ApiKeyLoadServiceService} from "../api-key-load-service/api-key-load-service.service";
import {ApiKeyNotLoadError} from "../../errors/api-key-not-load-error";

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

    constructor(private _loader: ApiKeyLoadServiceService) {
        //Example
        let func = (e: ApiKeyNotLoadError) => alert(`${e.apiKey.keyDescription} not found!`);

        this._loader.loadUserApiKey(this.alphaVantageApiKey, (e) => func(e));
        this._loader.loadUserApiKey(this.iexApiKey, (e) => func(e));
        this._loader.loadUserApiKey(this.iexSandboxApiKey, (e) => func(e));
    }
}
