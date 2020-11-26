import {HttpParams} from "@angular/common/http";
import {sources} from "../components/widget-area/enums/sources-enum";

export class PathBuilder {
    public static alphaVantageSearch(keywords: string, apiKey: string) {
        let params: HttpParams = new HttpParams()
            .set("function", "SYMBOL_SEARCH")
            .set("apikey", apiKey)
            .set("keywords", keywords);
        return `${sources.alphaVantage}query?${params.toString()}`;
    }

    public static iexSearch(keywords: string, apiKey: string, isSandbox = true) {
        let source = isSandbox ? sources.iexCloudSandbox : sources.iexCloud;
        return `${source}search/${keywords}?token=${apiKey}`;
    }

    public static iexIntradayCsvDownload(symbol: string, apiKey: string) {
        let params: HttpParams = new HttpParams()
            .set("token", apiKey)
            .set("format", "csv");
        return `${sources.iexCloud}stock/${symbol}/intraday-prices?${params.toString()}`;
    }

    public static iexIntraday(symbol: string, apiKey: string, isSandbox = false) {
        let source = isSandbox ? sources.iexCloudSandbox : sources.iexCloud;
        return `${source}stock/${symbol}/intraday-prices?token=${apiKey}`;
    }


}
