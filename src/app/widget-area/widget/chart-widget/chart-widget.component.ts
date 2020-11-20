import {Component, Injector, Input, OnInit} from '@angular/core';
import * as d3 from 'd3'
import {IDictionary} from "../../../generic-interfaces/idictionary";
import {STOCKS_API_KEY} from "../../../app-injection-tokens";
import {Company} from "./models/company";

@Component({
    selector: 'app-chart-widget',
    styleUrls: ['./chart-widget.component.sass'],
    templateUrl: './chart-widget.component.html'
})
export class ChartWidgetComponent implements OnInit {

    @Input() public symbol

    public showSearchComponent: boolean = true;

    public setShowSearchComponent(value: boolean) {
        this.showSearchComponent = value;
    }

    public currentCompany: Company;

    public setCurrentCompany(value: Company) {
        this.currentCompany = value;
    }

    private _source = "https://www.alphavantage.co/";
    private _params: IDictionary<string> = {
        ["function"]: "TIME_SERIES_INTRADAY",
        ["symbol"]: "IBM",
        ["interval"]: "5min",
        ["apikey"]: "demo"
    };

    private _width = 200;
    private _height = 200;

    private readonly config: string;

    constructor(injector: Injector) {
        this.config = injector.get(STOCKS_API_KEY);
    }

    ngOnInit(): void {
        console.log(this.config);
        this.getAlphaVantageJsonData();
        const svg = d3.select("div.chart-area").append("svg")
            .attr("viewBox", [0, 0, this._width, this._height]);

    }

    private getAlphaVantageJsonData(
        params: IDictionary<string> = this._params,
        source: string = this._source): any {

        const promise = d3.json(this.pathBuilder(params, source))
            .then(r => {
                this.mapTimeSeries(r).then(r2 => {
                    for (let el of r2.values()) {
                        // console.log(el["1. open"])
                    }
                })
            })
    }

    private mapTimeSeries(source: JSON): Promise<any> {
        return new Promise(function (resolve) {
            resolve(new Map(Object.entries(source["Time Series (5min)"])))
        });
    }


    private pathBuilder(params: IDictionary<string>,
                        source: string): string {

        let result: string = `${source}query?`;
        for (let i in params) {
            result += `${i}=${params[i]}&`;
        }
        return (result.slice(0, -1));

    }

    public printEvent(company: Company) {
        console.log(company.name);
    }


}
