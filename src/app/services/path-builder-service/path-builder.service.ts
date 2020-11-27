import {Injectable, Injector} from '@angular/core';
import {HttpParams} from "@angular/common/http";
import {ALPHA_VANTAGE_API_SOURCE, IEX_API_SOURCE, IEX_SANDBOX_API_SOURCE} from "../../app-injection-tokens";

@Injectable({
    providedIn: 'root'
})
export class PathBuilderService {
    constructor(private _env: Injector) {
    }

    public alphaVantageSearch(keywords: string, apiKey: string) {
        let params: HttpParams = new HttpParams()
            .set("function", "SYMBOL_SEARCH")
            .set("apikey", apiKey)
            .set("keywords", keywords);
        return `${this._env.get(ALPHA_VANTAGE_API_SOURCE)}query?${params.toString()}`;
    }

    public iexSearch(keywords: string, apiKey: string, isSandbox = true) {
        let source = isSandbox ? this._env.get(IEX_SANDBOX_API_SOURCE)
            : this._env.get(IEX_API_SOURCE);
        return `${source}search/${keywords}?token=${apiKey}`;
    }

    public iexIntradayCsvDownload(symbol: string, apiKey: string) {
        let params: HttpParams = new HttpParams()
            .set("token", apiKey)
            .set("format", "csv");
        return `${this._env.get(IEX_API_SOURCE)}stock/${symbol}/intraday-prices?${params.toString()}`;
    }

    public iexIntraday(symbol: string, apiKey: string, isSandbox = false) {
        let source = isSandbox ? this._env.get(IEX_SANDBOX_API_SOURCE)
            : this._env.get(IEX_API_SOURCE);
        return `${source}stock/${symbol}/intraday-prices?token=${apiKey}`;
    }
}
