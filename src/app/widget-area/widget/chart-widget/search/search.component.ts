import {Component, Injector, Input, OnInit, Output} from '@angular/core';
import {HttpClient, HttpParams} from "@angular/common/http";
import {FormControl} from "@angular/forms";
import {debounceTime} from "rxjs/operators";
import {STOCKS_API_KEY} from "../../../../app-injection-tokens";
import {Company} from "../models/company";


@Component({
    selector: 'app-search',
    styleUrls: ['./search.component.sass'],
    templateUrl: './search.component.html'
})
export class SearchComponent implements OnInit {

    // @Input() public source;
    @Output() public index;
    public searchControl: FormControl;

    private _searchResult: Array<Company>;
    public get searchResult(): Array<Company> {
        return this._searchResult;
    }

    private _source: string = "https://www.alphavantage.co/";
    private _httpParams: HttpParams = new HttpParams()
        .set("function", "SYMBOL_SEARCH")
        .set("apikey", this._env.get(STOCKS_API_KEY));

    constructor(private _http: HttpClient,
                private _env: Injector) {
    }


    ngOnInit(): void {

        // this.searchControl = new FormControl('IBM');        //вторым параметром - валидаторы
        // this.searchControl.valueChanges.subscribe((value) => console.log(value));       //изменения значения
        // this.searchControl.statusChanges.subscribe((status) => console.log(status));    //ошибки
        //
        // console.log(this.searchControl.value);      //snapshot значения на текущий момент, не реактивный
        // //searchControl.value подходит для создания валидаторов (синхронных)
        // //searchControl.valid
        // //searchControl.errors

        this.searchControl = new FormControl();
        this.searchControl.valueChanges
            .pipe(debounceTime(1000))
            .subscribe((value) => {
                this._http.get(this.pathBuilder(value))
                    .subscribe(result => {
                        if (result.hasOwnProperty('Information')) {
                            alert(result['Information']);
                        } else if (result.hasOwnProperty('Error Message')) {
                            return;
                        } else {
                            this._searchResult = this.searchResultBuilder(result);
                        }
                    })
            });
        this.searchControl.setValue('tencent');
    }

    private pathBuilder(value: string) {
        let params = this._httpParams.set("keywords", value);
        return `${this._source}query?${params.toString()}`;
    }

    private searchResultBuilder(companies: Object): Array<Company> {
        let result = new Array<Company>();
        for (let i of companies['bestMatches']) {
            result.push(new Company(i));
        }
        return result;
    }
}
