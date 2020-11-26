import {Injectable} from '@angular/core';
import {IAreaCell} from "../../components/widget-area/iarea-cell";

@Injectable({
    providedIn: 'root'
})
export class PersonalViewLoadService {

    //TODO: перенести в старт-виджет
    private _cellsOnInit: IAreaCell[] = [
        {
            id: 0,
            inRightColumn: false,
            type: {
                isStartWidget: true
            }
        }
    ]
    private key: string = "user_widgets";

    constructor() {
    }

    public loadUserCells(): IAreaCell[] {
        if (localStorage.length === 0) {
            return this._cellsOnInit
        } else {
            //TODO: временное решение
            return this._cellsOnInit
            // return JSON.parse(localStorage.getItem(this.key))
        }
    }

    public saveUserCells(cells: IAreaCell[]): void {
        localStorage.setItem(this.key, JSON.stringify(cells));
    }
}
