import {Component, Input, OnInit} from '@angular/core';
import {IWidget} from "./iwidget";

@Component({
    selector: 'app-widget',
    templateUrl: './widget.component.html',
    styleUrls: ['./widget.component.sass']
})
export class WidgetComponent implements OnInit {

    @Input() public isCanBeClosed: boolean;
    @Input() public isDark: boolean;

    constructor() {
    }

    ngOnInit(): void {
    }

    // public toStartWidgetStyle() {
    //     this.isCanBeClosed = false;
    //     this.isDark = false;
    // }
    //
    // public toChartWidgetStyle() {
    //     this.isCanBeClosed = true;
    //     this.isDark = true;
    // }
    //
    // //например
    // public toNewsWidgetStyle() {
    //     this.isCanBeClosed = true;
    //     this.isDark = false;
    // }

}
