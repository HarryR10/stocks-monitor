import {Component, EventEmitter, Injector, Input, OnInit, Output} from '@angular/core';
import {HttpClient, HttpParams} from "@angular/common/http";
import {Company} from "../models/company";
import {PathBuilderService} from "../../../../../services/path-builder-service/path-builder.service";
import {KeysKeeperService} from "../../../../../services/keys-keeper-service/keys-keeper.service";
import {map, switchMap} from "rxjs/operators";
import * as d3 from "d3";
import uid from "@observablehq/stdlib/src/dom/uid"

@Component({
    selector: 'app-chart',
    templateUrl: './chart.component.html',
    styleUrls: ['./chart.component.sass']
})
export class ChartComponent implements OnInit {

    @Input() public currentCompany: Company;
    @Output() public renderComponent = new EventEmitter<boolean>();

    public loading: boolean = false;
    public difference: number;
    public today: string;

    public data = new Array<Object>();

    constructor(private _http: HttpClient,
                private _env: Injector,
                private _pathBuilder: PathBuilderService,
                private _keys: KeysKeeperService) {
    }

    ngOnInit(): void {
        this.load()
    }

    //TODO: to chart-widget ?
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

    //TODO: to chart-widget ?
    public backToSearch() {
        this.renderComponent.emit(true);
    }

    private load() {
        return this._http
            .get(this._pathBuilder.iexIntraday(
                this.currentCompany.symbol,
                this._keys.iexApiKey.keyValue))
            .pipe(
                map(result => {
                    this.today = result[0]['date'];
                    (result as Array<Object>).forEach(i => {
                        //TODO: как вариант - регулярное выражение
                        let time = i['label'];
                        if (time.indexOf(':') === -1) {
                            time = time.replace(" ", ":00 ");
                        }

                        this.data.push({
                            "time": new Date(`${i['date']}:${time}`),
                            "volume": i['volume']
                        })
                    })
                    // console.log(this.data)
                    // this.buildChart(this.data)
                }),
            ).subscribe()
    }

    private buildChart(data) {
        const margin = ({top: 20, right: 20, bottom: 30, left: 30});
        const width = 600;
        const height = 100;

        const x = d3.scaleUtc()
            .domain(d3.extent(data, d => d.time))
            .range([margin.left, width - margin.right])

        const y = d3.scaleLinear()
            .domain([0, d3.max(data, d => d.volume)]).nice()
            .range([height - margin.bottom, margin.top])

        const xAxis = (g, x) => g
            .attr("transform", `translate(0,${height - margin.bottom})`)
            .call(d3.axisBottom(x).ticks(width / 80).tickSizeOuter(0))

        const yAxis = (g, y) => g
            .attr("transform", `translate(${margin.left},0)`)
            .call(d3.axisLeft(y).ticks(null, "s"))
            .call(g => g.select(".domain").remove())
            .call(g => g.select(".tick:last-of-type text").clone()
                .attr("x", 3)
                .attr("text-anchor", "start")
                .attr("font-weight", "bold")
                .text(data.y))

        const area = (data, x) =>
            d3.area()
                .curve(d3.curveStepAfter)
                .x(d => x(d.time))
                .y1(d => y(d.volume))
                (data)

        const chart = () => {
            const zoom = d3.zoom()
                .scaleExtent([1, 32])
                .extent([[margin.left, 0], [width - margin.right, height]])
                .translateExtent([[margin.left, -Infinity], [width - margin.right, Infinity]])
                .on("zoom", zoomed);

            function zoomed(event) {
                const xz = event.transform.rescaleX(x);
                path.attr("d", area(data, xz));
                gx.call(xAxis, xz);
            }

            const svg = d3.select("body.one").append("svg")
                .attr("viewBox", [0, 0, width, height]);

            const clip = uid("clip");

            svg.append("clipPath")
                .attr("id", clip.id)
                .append("rect")
                .attr("x", margin.left)
                .attr("y", margin.top)
                .attr("width", width - margin.left - margin.right)
                .attr("height", height - margin.top - margin.bottom)
                .attr("rx", 15)
                .attr("ry", 15)

            const path = svg.append("path")
                .attr("clip-path", clip)
                .attr("fill", "orange")
                .attr("d", area(data, x));

            const gx = svg.append("g")
                .call(xAxis, x);

            svg.append("g")
                .call(yAxis, y);

            svg.call(zoom)
                .transition()
                .duration(750)
                .call(zoom.scaleTo, 4, [x(Date.now())]);

            return svg.node();
        }

        chart();
    }
}
