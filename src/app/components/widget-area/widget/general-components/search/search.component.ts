import {Component, Injector, Input, OnInit, Output, EventEmitter} from '@angular/core';
import {HttpClient, HttpParams} from "@angular/common/http";
import {FormControl} from "@angular/forms";
import {debounceTime} from "rxjs/operators";
import {Company} from "../../chart-widget/models/company";
import {sources} from "../../../enums/sources-enum";
import {PathBuilder} from "../../../../../utils/path-builder";
import {AlphaVantageResponseReader} from "../../../../../utils/alpha-vantage-response-reader";


@Component({
    selector: 'app-search',
    styleUrls: ['./search.component.sass'],
    templateUrl: './search.component.html'
})
export class SearchComponent implements OnInit {

    @Output() public chooseSymbol = new EventEmitter<Company>();
    @Output() public renderComponent = new EventEmitter<boolean>();

    public searchControl: FormControl;
    public loading: boolean = false;

    private _searchResult: Array<Company>;
    public get searchResult(): Array<Company> {
        return this._searchResult;
    }

    private _selectedCompany: Company;
    public get selectedCompany() {
        return this._selectedCompany;
    }

    public set selectedCompany(value: Company) {
        this._selectedCompany = value;
    }

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

        this.load();
        this.searchControl.setValue('tencent');
    }

    //TODO: поменять на switchMap 2й
    private load() {
        this.searchControl = new FormControl();
        this.searchControl.valueChanges
            .pipe(debounceTime(1000))
            .subscribe((value) => {
                // this._http.get(PathBuilder.alphaVantageSearch(value, this._env.get('demo')))
                this._http.get(PathBuilder.alphaVantageSearch(value, 'demo'))
                    .subscribe(result => {
                        let reader = new AlphaVantageResponseReader(result);
                        if (!reader.isOkResponse) {
                            alert(reader.message);
                            return;
                        }
                        this._searchResult = this.searchResultBuilder(result);
                        this.selectedCompany = this._searchResult[0];
                    })
            });
    }

    // private pathBuilder(value: string) {
    //
    //     let params: HttpParams = new HttpParams()
    //         .set("function", "SYMBOL_SEARCH")
    //         .set("apikey", this._env.get(STOCKS_API_KEY))
    //         .set("keywords", value);
    //     return `${sources.alphaVantage}query?${params.toString()}`;
    // }

    private searchResultBuilder(companies: Object): Array<Company> {
        let result = new Array<Company>();
        for (let i of companies['bestMatches']) {
            result.push(new Company(i));
        }
        return result;
    }

    public useChosenCompany(company: Company) {
        this.loading = true;
        this.chooseSymbol.emit(company);
        this.renderComponent.emit(false);
        this.loading = false;

    }
}
