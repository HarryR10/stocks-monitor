import {Component, EventEmitter, Injector, Input, OnInit, Output} from '@angular/core';
import {HttpClient, HttpParams} from "@angular/common/http";
import {STOCKS_API_KEY} from "../../../../app-injection-tokens";
import {sources} from "../../../enums/sources-enum";
import {Company} from "../models/company";

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
                private _env: Injector) {
    }

    ngOnInit(): void {
    }

    public downloadCsv() {
        this.loading = true;
        this._http.get(this.pathBuilder(this.currentCompany.symbol, 'csv'),
            {responseType: 'blob'})
            .subscribe(
                (blob) => {
                    const downloadURL = URL.createObjectURL(blob);
                    window.open(downloadURL);
                    this.loading = false
                }
            );
        
        // let link = document.createElement('a');
        // link.href = this.pathBuilder(this.pathBuilder(this.currentCompany.symbol, 'csv'));
        // link.click();
    }

    private pathBuilder(symbol: string, datatype: string = 'json') {

        let params: HttpParams = new HttpParams()
            .set("function", "TIME_SERIES_INTRADAY")
            .set("symbol", symbol)
            .set("interval", "5min")
            .set("apikey", this._env.get(STOCKS_API_KEY))
            .set("datatype", datatype)
        return `${sources.stock}query?${params.toString()}`;
    }

    public backToSearch() {
        this.renderComponent.emit(true);
        console.log("backToSearch")
    }
}
