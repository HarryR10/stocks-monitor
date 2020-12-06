import {Component, EventEmitter, Injector, Input, OnInit, Output} from '@angular/core';
import {HttpClient, HttpParams} from "@angular/common/http";
import {Company} from "../models/company";
import {PathBuilderService} from "../../../../../services/path-builder-service/path-builder.service";
import {KeysKeeperService} from "../../../../../services/keys-keeper-service/keys-keeper.service";

@Component({
    selector: 'app-chart',
    templateUrl: './chart.component.html',
    styleUrls: ['./chart.component.sass']
})
export class ChartComponent implements OnInit {

    @Input() public currentCompany: Company;
    @Output() public renderComponent = new EventEmitter<boolean>();

    public loading: boolean = false;

    constructor(private _http: HttpClient,
                private _env: Injector,
                private _pathBuilder: PathBuilderService,
                private _keys: KeysKeeperService) {
    }

    ngOnInit(): void {
    }

    public downloadCsv() {
        this.loading = true;
        this._http.get(this._pathBuilder.iexIntradayCsvDownload(this.currentCompany.symbol, this._keys.iexApiKey.keyValue),
            {responseType: 'blob'})
            .subscribe(
                (blob) => {
                    let link = document.createElement('a');
                    link.download = `${this.currentCompany.symbol}_TIME_SERIES_INTRADAY`;
                    link.href = URL.createObjectURL(new Blob([blob], {type: "text/csv"}));
                    link.click();
                    URL.revokeObjectURL(link.href);
                    this.loading = false
                }
            );

    }

    public backToSearch() {
        this.renderComponent.emit(true);
        console.log("backToSearch")
    }
}
