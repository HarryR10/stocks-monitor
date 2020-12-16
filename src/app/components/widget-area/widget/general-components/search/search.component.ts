import {Component, Injector, Input, OnInit, Output, EventEmitter} from '@angular/core';
import {HttpClient, HttpParams} from "@angular/common/http";
import {FormControl} from "@angular/forms";
import {catchError, debounceTime, map, switchMap} from "rxjs/operators";
import {Company} from "../../chart-widget/models/company";
import {PathBuilderService} from "../../../../../services/path-builder-service/path-builder.service";
import {KeysKeeperService} from "../../../../../services/keys-keeper-service/keys-keeper.service";
import {pipe, throwError} from "rxjs";


@Component({
    selector: 'app-search',
    styleUrls: ['./search.component.sass'],
    templateUrl: './search.component.html'
})
export class SearchComponent implements OnInit {
    @Input() public symbol

    @Output() public chooseSymbol = new EventEmitter<Company>();
    @Output() public renderComponent = new EventEmitter<boolean>();

    public msg: string;
    public searchControl: FormControl;
    public loading: boolean = false;

    private _searchResult: Array<Company>;
    private _tempSearchResult: Array<Company>;

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
                private _env: Injector,
                private _pathBuilder: PathBuilderService,
                private _keys: KeysKeeperService) {
    }


    ngOnInit(): void {
        this.load();
        this.searchControl.setValue(this.symbol);
    }

    private load() {
        this.searchControl = new FormControl();

        this.searchControl.valueChanges
            .pipe(
                debounceTime(1000),
                switchMap(value => {
                    return this._http
                        .get(this._pathBuilder.alphaVantageSearch(value, this._keys.alphaVantageApiKey.keyValue))
                }),
                switchMap(companies => {
                    if (companies['bestMatches'] === undefined) {
                        this.msg = "Exceeded the limit of requests per minute! Please, refresh this page..."
                    }
                    this._tempSearchResult =
                        this.resultBuilder(Array.from(companies['bestMatches']));
                    return this._http
                        .get(this._pathBuilder.iexSearch(
                            this.searchControl.value,
                            this._keys.iexSandboxApiKey.keyValue));
                }),
                map(iexCompanies => {
                    let result = new Array<Company>();
                    this._tempSearchResult.forEach(i => {
                        for (let company of (iexCompanies as Array<any>)) {
                            if (i.symbol === company.symbol) {
                                result.push(i);
                            }
                        }
                    })
                    return result;
                })
            ).subscribe(result => this._searchResult = result)
    }

    //TODO: ???
    private resultBuilder(companies: Array<any>): Array<Company> {
        let result = new Array<Company>();
        for (let i of companies) {
            result.push(new Company(i));
        }
        return result;
    }

    public useChosenCompany(company: Company) {
        this.loading = true;
        this._http.get(this._pathBuilder.iexIntraday(
            company.symbol,
            this._keys.iexSandboxApiKey.keyValue,
            true))
            .pipe(
                catchError((e) => {
                    this.msg = e.value
                    return throwError(e);
                }))
            .subscribe(result => {
                if ((result as Array<any>).length === 0
                    || (result as Array<any>)[0]['volume'] === undefined) {
                    //TODO: любое другое оповещение
                    this.msg = 'Not found trade data!'
                } else if (result['status'] === 451) {
                    this.msg = 'Unavailable For Legal Reasons!'
                } else {
                    this.chooseSymbol.emit(company);
                    this.renderComponent.emit(false);
                }
                this.loading = false;
            });
    }
}
