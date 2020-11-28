import {Injectable} from '@angular/core';
import {AlphaVantageApiKey} from "../../models/alpha-vantage-api-key";
import {IexApiKey} from "../../models/iex-api-key";
import {IexSandboxApiKey} from "../../models/iex-sandbox-api-key";

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
}
