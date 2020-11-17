import {Component, Input, OnInit, Output} from '@angular/core';
import {HttpClient} from "@angular/common/http";

@Component({
    selector: 'app-search',
    styleUrls: ['./search.component.sass'],
    templateUrl: './search.component.html'
})
export class SearchComponent implements OnInit {

    // @Input() public source;
    @Output() public index;

    constructor(private _http: HttpClient) {
    }

    ngOnInit(): void {
    }


}
