import {Component, OnInit} from '@angular/core';
import {ApiKeyLoadServiceService} from "../../services/api-key-load-service/api-key-load-service.service";
import {ApiKeyNotLoadError} from "../../errors/api-key-not-load-error";
import {ApiKey} from "../../models/api-key";
import {HttpClient} from "@angular/common/http";
import {PathBuilderService} from "../../services/path-builder-service/path-builder.service";
import {KeysKeeperService} from "../../services/keys-keeper-service/keys-keeper.service";

@Component({
    selector: 'app-settings',
    templateUrl: './settings.component.html',
    styleUrls: ['./settings.component.sass']
})
export class SettingsComponent implements OnInit {

    public alphaVantageApiKey = this._keys.alphaVantageApiKey;
    public iexApiKey = this._keys.iexApiKey;
    public iexSandboxApiKey = this._keys.iexSandboxApiKey;

    public userMessages = new Array<string>();

    constructor(private _loader: ApiKeyLoadServiceService,
                private _http: HttpClient,
                private _pathBuilder: PathBuilderService,
                private _keys: KeysKeeperService) {
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

    public verifyAlphaVantageKey() {
        this.alphaVantageApiKey.verify(this._http, this._pathBuilder)
    }

    public verifyIexApiKey() {
        this.iexApiKey.verify(this._http, this._pathBuilder)
    }

    public verifyIexSandboxApiKey() {
        this.iexSandboxApiKey.verify(this._http, this._pathBuilder)
    }

    public saveKeys() {
        this._loader.saveUserApiKey(this.alphaVantageApiKey);
        this._loader.saveUserApiKey(this.iexApiKey);
        this._loader.saveUserApiKey(this.iexSandboxApiKey);
    }
}
