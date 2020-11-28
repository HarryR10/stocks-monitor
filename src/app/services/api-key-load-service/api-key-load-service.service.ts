import {Injectable} from '@angular/core';

import {ApiKeyNotLoadError} from "../../errors/api-key-not-load-error";
import {ApiKey} from "../../models/api-key";
import {AlphaVantageApiKey} from "../../models/alpha-vantage-api-key";
import {IexSandboxApiKey} from "../../models/iex-sandbox-api-key";
import {IexApiKey} from "../../models/iex-api-key";

@Injectable({
    providedIn: 'root'
})
export class ApiKeyLoadServiceService {

    public saveUserApiKey(key: ApiKey): void {
        localStorage.setItem(key.keyName, key.keyValue);
    }

    public loadUserApiKey(key: ApiKey, action: Function = () => {
    }) {
        const handler = (key) => {
            let result = localStorage.getItem(key.keyName);

            if (result !== null) {
                return result;
            } else {
                throw new ApiKeyNotLoadError(`${key.keyDescription} not load from Local storage`, key);
            }
        }

        try {
            key.keyValue = handler(key);
        } catch (e) {
            action(e);
        }
    }
}
