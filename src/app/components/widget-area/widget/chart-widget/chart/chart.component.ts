import {Component, EventEmitter, Injector, Input, OnInit, Output} from '@angular/core';
import {HttpClient, HttpParams} from "@angular/common/http";
import {Company} from "../models/company";
import {PathBuilderService} from "../../../../../services/path-builder-service/path-builder.service";
import {ALPHA_VANTAGE_API_SOURCE} from "../../../../../app-injection-tokens";

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
                private _pathBuilder: PathBuilderService) {
    }

    ngOnInit(): void {
    }

    public downloadCsv() {
        //TODO: изменить логику в соответствии с закоментированной строкой
        this.loading = true;
        this._http.get(this.pathBuilder(this.currentCompany.symbol, 'csv'),
            // this._http.get(this._pathBuilder.iexIntradayCsvDownload(this.currentCompany.symbol, "demo"),
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

    private pathBuilder(symbol: string, datatype: string = 'json') {
        let source = this._env.get(ALPHA_VANTAGE_API_SOURCE);

        let params: HttpParams = new HttpParams()
            .set("function", "TIME_SERIES_INTRADAY")
            .set("symbol", symbol)
            .set("interval", "5min")
            // .set("apikey", this._env.get("demo"))
            .set("apikey", "demo")
            .set("datatype", datatype)
        return `${source}query?${params.toString()}`;
    }

    public backToSearch() {
        this.renderComponent.emit(true);
        console.log("backToSearch")
    }
}
