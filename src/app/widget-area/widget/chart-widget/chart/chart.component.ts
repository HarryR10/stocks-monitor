import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';

@Component({
    selector: 'app-chart',
    templateUrl: './chart.component.html',
    styleUrls: ['./chart.component.sass']
})
export class ChartComponent implements OnInit {

    // @Input() public index
    @Input() public currentCompany;
    @Output() public renderComponent = new EventEmitter<boolean>();

    constructor() {
    }

    ngOnInit(): void {
    }

    public backToSearch() {
        this.renderComponent.emit(true);
        console.log("backToSearch")
    }
}
