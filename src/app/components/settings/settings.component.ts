import {Component, OnInit} from '@angular/core';
import {ApiKeyLoadServiceService} from "../../services/api-key-load-service/api-key-load-service.service";
import {ApiKeyNotLoadError} from "../../errors/api-key-not-load-error";
import {HttpClient} from "@angular/common/http";
import {PathBuilderService} from "../../services/path-builder-service/path-builder.service";
import {KeysKeeperService} from "../../services/keys-keeper-service/keys-keeper.service";
import {catchError, map, pluck, switchMap} from "rxjs/operators";
import {throwError} from "rxjs";

@Component({
    selector: 'app-settings',
    templateUrl: './settings.component.html',
    styleUrls: ['./settings.component.sass']
})
export class SettingsComponent implements OnInit {

    public alphaVantageApiKey = this._keys.alphaVantageApiKey;
    public iexApiKey = this._keys.iexApiKey;
    public iexSandboxApiKey = this._keys.iexSandboxApiKey;

    public messageForUser: string;
    public saving = false;

    constructor(private _loader: ApiKeyLoadServiceService,
                private _http: HttpClient,
                private _pathBuilder: PathBuilderService,
                private _keys: KeysKeeperService) {
    }

    ngOnInit(): void {
    }

    public verifyAlphaVantageKey() {
        // this.alphaVantageApiKey.verify(this._http, this._pathBuilder).subscribe()

        return this.alphaVantageApiKey.verify(this._http, this._pathBuilder)
    }

    public verifyIexApiKey() {
        // this.iexApiKey.verify(this._http, this._pathBuilder).subscribe()
        return this.iexApiKey.verify(this._http, this._pathBuilder)
    }

    public verifyIexSandboxApiKey() {
        // this.iexSandboxApiKey.verify(this._http, this._pathBuilder).subscribe()
        return this.iexSandboxApiKey.verify(this._http, this._pathBuilder)
    }

    public saveKeys() {
        console.log(this.alphaVantageApiKey.isValid + "al")
        console.log(this.iexApiKey.isValid + "ie")
        console.log(this.iexSandboxApiKey.isValid + "ies")

        this.saving = true;
        this.messageForUser = "Saving."
        this.verifyAlphaVantageKey().pipe(
            switchMap(() => {
                this.messageForUser += '.';
                return this.verifyIexApiKey()
            }),
            switchMap(() => {
                this.messageForUser += '.';
                return this.verifyIexSandboxApiKey()
            }),
            catchError((e) => {
                this.messageForUser = "First, type the correct api keys!"
                this.saving = false;
                return throwError(e);
            }),
            map(() => {
                if (this.iexSandboxApiKey.isValid
                    && this.iexApiKey.isValid
                    && this.alphaVantageApiKey.isValid) {

                    delete this.messageForUser;
                    this._keys.saveKeys();

                } else {
                    this.messageForUser = "First, type the correct api keys!"
                }
                this.saving = false;
            })
        ).subscribe();
    }
}
