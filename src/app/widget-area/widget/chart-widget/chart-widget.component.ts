import {Component, Input, OnInit} from '@angular/core';
import * as d3 from 'd3'
import {IDictionary} from "../../../generic-interfaces/idictionary";

@Component({
    selector: 'app-chart-widget',
    styleUrls: ['./chart-widget.component.sass'],
    templateUrl: './chart-widget.component.html'
})
export class ChartWidgetComponent implements OnInit {

    @Input() public index

    private _source = "https://www.alphavantage.co/";
    private _params: IDictionary<string> = {
        ["function"]: "TIME_SERIES_INTRADAY",
        ["symbol"]: "IBM",
        ["interval"]: "5min",
        ["apikey"]: "demo"
    };

    private _width = 200;
    private _height = 200;


    constructor() {
    }

    ngOnInit(): void {
        this.getAlphaVantageJsonData();

        const svg = d3.select("div.chart-area").append("svg")
            .attr("viewBox", [0, 0, this._width, this._height]);


        // console.log(this.index)
    }

    private getAlphaVantageJsonData(
        params: IDictionary<string> = this._params,
        source: string = this._source): any {

        const promise = d3.json(this.pathBuilder(params, source))
            .then(r => {
                this.mapTimeSeries(r).then(r2 => {
                    for (let el of r2.values()) {
                        console.log(el["1. open"])
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
}
