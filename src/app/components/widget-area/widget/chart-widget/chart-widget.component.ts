import {Component, Injector, Input, OnInit} from '@angular/core';
import * as d3 from 'd3'
import {IDictionary} from "../../../../generic-interfaces/idictionary";
import {Company} from "./models/company";
import {KeysKeeperService} from "../../../../services/keys-keeper-service/keys-keeper.service";

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


    private readonly config: string;

    constructor() {

    }

    ngOnInit(): void {

    }

}
