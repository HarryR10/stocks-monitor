import {Component, OnInit} from '@angular/core';
import {PersonalLoadService} from "./personal-load-service/personal-load.service";
import {IAreaCell} from "./iarea-cell";
import {IWidget} from "./widget/iwidget";

@Component({
    selector: 'app-widget-area',
    templateUrl: './widget-area.component.html',
    styleUrls: ['./widget-area.component.sass']
})
export class WidgetAreaComponent implements OnInit {

    private _cellsOnLoad: IAreaCell[];

    // public

    public getCells(): IAreaCell[] {
        return this._cellsOnLoad;
    }

    constructor(private _personalLoadService: PersonalLoadService) {
    }

    ngOnInit(): void {
        this._cellsOnLoad = this._personalLoadService.loadUserCells();
    }

    // public chooseWidget(widget: IWidget) {
    //     // typeof
    //     // TODO: https://www.youtube.com/watch?v=GqzOfcQQFc0
    // }
}
