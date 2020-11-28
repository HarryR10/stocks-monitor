import {ApiKey} from "./api-key";
import {HttpClient} from "@angular/common/http";
import {PathBuilderService} from "../services/path-builder-service/path-builder.service";

export class IexSandboxApiKey extends ApiKey {
    constructor(keyName: string,
                keyDescription: string,
                keyValue = '') {
        super(keyName, keyDescription, keyValue);
    }

    public verify(http: HttpClient, pathBuilder: PathBuilderService) {
        http.get(pathBuilder
            .iexSearch("IBM", this.keyValue))
            .subscribe({
                next: _ => this.isValid = true,
                error: _ => this.isValid = false
            });
    }
}