import {Component, Input, OnInit} from '@angular/core';

@Component({
    selector: 'app-chart-widget',
    styleUrls: ['./chart-widget.component.sass'],
    templateUrl: './chart-widget.component.html'
})
export class ChartWidgetComponent implements OnInit {

    @Input() public index
    constructor() {
    }

    ngOnInit(): void {
        // console.log(this.index)
    }

}
