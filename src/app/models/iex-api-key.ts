import {ApiKey} from "./api-key";
import {HttpClient} from "@angular/common/http";
import {PathBuilderService} from "../services/path-builder-service/path-builder.service";
import {catchError, map} from "rxjs/operators";
import {throwError} from "rxjs";

export class IexApiKey extends ApiKey {
    constructor(keyName: string,
                keyDescription: string,
                keyValue = '') {
        super(keyName, keyDescription, keyValue);
    }

    // public verify(http: HttpClient, pathBuilder: PathBuilderService) {
    //     return http.get(pathBuilder
    //         .iexIntraday("IBM", this.keyValue))
    //         .subscribe({
    //             next: _ => this.isValid = true,
    //             error: _ => this.isValid = false
    //         });
    // }

    public verify(http: HttpClient, pathBuilder: PathBuilderService) {
        this.isValid = false;
        return http.get(pathBuilder
            .iexIntraday("IBM", this.keyValue))
            .pipe(
                map(_ => {
                    this.isValid = true;
                    // return this
                }),
                // catchError((err) => {
                //     this.isValid = false
                //     return throwError(err);
                // })
            );
    }
}
