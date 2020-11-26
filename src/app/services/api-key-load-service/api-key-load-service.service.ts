import {Injectable} from '@angular/core';

import {ApiKeyNotLoadError} from "../../errors/api-key-not-load-error";
import {ApiKey} from "../../models/apiKey";

@Injectable({
    providedIn: 'root'
})
export class ApiKeyLoadServiceService {

    constructor() {
    }

    public loadUserApiKey(key: ApiKey): string {
        let result = localStorage.getItem(key.keyName);

        if (result !== null) {
            return result;
        } else {
            throw new ApiKeyNotLoadError(`${key.keyDescription} not load from Local storage`, key);
        }
    }

    public saveUserApiKey(key: ApiKey): void {
        localStorage.setItem(key.keyName, key.keyValue);
    }
}
