import {ApiKey} from "./api-key";
import {PathBuilderService} from "../services/path-builder-service/path-builder.service";
import {HttpClient} from "@angular/common/http";
import {map, switchMap} from "rxjs/operators";

export class AlphaVantageApiKey extends ApiKey {
    constructor(keyName: string,
                keyDescription: string,
                keyValue = '') {
        super(keyName, keyDescription, keyValue);
    }

    // public verify(http: HttpClient, pathBuilder: PathBuilderService) {
    //     return http.get(pathBuilder
    //         .alphaVantageSearch("IBM", this.keyValue))
    //         .subscribe(result => {
    //             if (result.hasOwnProperty('bestMatches')) {
    //                 this.isValid = true;
    //             } else {
    //                 this.isValid = false;
    //             }
    //         });
    // }

    public verify(http: HttpClient, pathBuilder: PathBuilderService) {
        this.isValid = false;
        return http.get(pathBuilder
            .alphaVantageSearch("TME", this.keyValue))
            .pipe(map(result => {
                this.isValid = result.hasOwnProperty('bestMatches');
                // return this;
            }));
    }
}
