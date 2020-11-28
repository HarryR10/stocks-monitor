import {ApiKey} from "./api-key";
import {PathBuilderService} from "../services/path-builder-service/path-builder.service";
import {HttpClient} from "@angular/common/http";

export class AlphaVantageApiKey extends ApiKey {
    constructor(keyName: string,
                keyDescription: string,
                keyValue = '') {
        super(keyName, keyDescription, keyValue);
    }

    public verify(http: HttpClient, pathBuilder: PathBuilderService) {
        http.get(pathBuilder
            .alphaVantageSearch("IBM", this.keyValue))
            .subscribe(result => {
                if (result.hasOwnProperty('bestMatches')) {
                    this.isValid = true;
                } else {
                    this.isValid = false;
                }
            });
    }
}
