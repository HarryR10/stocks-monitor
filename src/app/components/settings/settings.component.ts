import {Component, OnInit} from '@angular/core';
import {ApiKeyLoadServiceService} from "../../services/api-key-load-service/api-key-load-service.service";
import {ApiKeyNotLoadError} from "../../errors/api-key-not-load-error";
import {ApiKey} from "../../models/apiKey";
import {HttpClient} from "@angular/common/http";
import {sources} from "../widget-area/enums/sources-enum";
import {FormControl} from "@angular/forms";
import {PathBuilder} from "../../utils/path-builder";

@Component({
    selector: 'app-settings',
    templateUrl: './settings.component.html',
    styleUrls: ['./settings.component.sass']
})
export class SettingsComponent implements OnInit {

    public alphaVantageApiKey
        = new ApiKey("alphaVantageApiKey", "Alpha Vantage api key");
    public iexApiKey
        = new ApiKey("iexApiKey", "IEX cloud api key");
    public iexSandboxApiKey
        = new ApiKey("iexSandboxApiKey", "IEX cloud sandbox api key");

    public userMessages = new Array<string>();

    constructor(private _loader: ApiKeyLoadServiceService,
                private _http: HttpClient) {
    }

    ngOnInit(): void {
        this.load();
        this.verifyAlphaVantageKey();
        this.verifyIexApiKey();
        this.verifyIexSandboxApiKey();
    }

    private load() {
        this.loadKey(this.alphaVantageApiKey);
        this.loadKey(this.iexApiKey);
        this.loadKey(this.iexSandboxApiKey);
    }

    private loadKey(key: ApiKey) {
        try {
            key.keyValue = this._loader.loadUserApiKey(key);
        } catch (e) {
            if (e instanceof ApiKeyNotLoadError) {
                this.userMessages.push(`${e.apiKey.keyDescription} not found!`);
            }
        }
    }

    //TODO: поместить в сервис
    //TODO: searchControl.valid ?
    public verifyAlphaVantageKey() {
        this._http.get(PathBuilder
            .alphaVantageSearch("IBM", this.alphaVantageApiKey.keyValue))
            .subscribe(result => {
                if (result.hasOwnProperty('bestMatches')) {
                    this.alphaVantageApiKey.isValid = true;
                } else {
                    this.alphaVantageApiKey.isValid = false;
                }
            });
    }

    public verifyIexApiKey() {
        this._http.get(PathBuilder
            .iexIntraday("IBM", this.iexApiKey.keyValue))
            .subscribe({
                next: _ => this.iexApiKey.isValid = true,
                error: _ => this.iexApiKey.isValid = false
            });
    }

    public verifyIexSandboxApiKey() {
        this._http.get(PathBuilder
            .iexSearch("IBM", this.iexSandboxApiKey.keyValue))
            .subscribe({
                next: _ => this.iexSandboxApiKey.isValid = true,
                error: _ => this.iexSandboxApiKey.isValid = false
            });
    }

    public saveKeys() {
        this._loader.saveUserApiKey(this.alphaVantageApiKey);
        this._loader.saveUserApiKey(this.iexApiKey);
        this._loader.saveUserApiKey(this.iexSandboxApiKey);
    }
}
