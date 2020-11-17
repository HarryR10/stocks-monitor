import {Component, Injector, Input, OnInit, Output} from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {FormControl} from "@angular/forms";
import {debounceTime} from "rxjs/operators";
import {STOCKS_API_KEY} from "../../../../app-injection-tokens";

@Component({
    selector: 'app-search',
    styleUrls: ['./search.component.sass'],
    templateUrl: './search.component.html'
})
export class SearchComponent implements OnInit {

    // @Input() public source;
    @Output() public index;

    public searchControl: FormControl;

    constructor(private _http: HttpClient,
                private _env: Injector) {
        // this.config = injector.get(STOCKS_API_KEY);
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
                let apiKey: string = this._env.get(STOCKS_API_KEY);
                this._http.get(`https://www.alphavantage.co/query?function=SYMBOL_SEARCH&keywords=${value}&apikey=${apiKey}`)
                    .subscribe(result => {
                        // if (result.hasOwnProperty('Error Message')) {
                        //     alert(result['Error Message']);
                        if (result.hasOwnProperty('Information')) {
                            alert(result['Information']);
                        } else {
                            console.log(result);
                        }
                    })
            });
        this.searchControl.setValue('tencent');
    }


}
