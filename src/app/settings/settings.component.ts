import {Component, OnInit} from '@angular/core';

@Component({
    selector: 'app-settings',
    templateUrl: './settings.component.html',
    styleUrls: ['./settings.component.sass']
})
export class SettingsComponent implements OnInit {

    public alphaVantageApiKey: string;
    public iexApiKey: string;
    public iexSandboxApiKey: string;

    public isCorrectAlphaVantageApiKey: boolean;
    public isCorrectIexApiKey: boolean;
    public isCorrectIexSandboxApiKey: boolean;

    constructor() {
    }

    ngOnInit(): void {
    }

}
