import {Component, OnInit} from '@angular/core';
import {PersonalViewLoadService} from "../../services/personal-load-service/personal-view-load.service";
import {IAreaCell} from "./iarea-cell";
import {IWidget} from "./widget/iwidget";

@Component({
    selector: 'app-widget-area',
    templateUrl: './widget-area.component.html',
    styleUrls: ['./widget-area.component.sass']
})
export class WidgetAreaComponent implements OnInit {

    private _cellsOnLoad: IAreaCell[];

    public getCells(): IAreaCell[] {
        return this._cellsOnLoad;
    }

    constructor(private _personalLoadService: PersonalViewLoadService) {
    }

    ngOnInit(): void {
        this._cellsOnLoad = this._personalLoadService.loadUserCells();
    }

    // public chooseWidget(widget: IWidget) {
    //     // typeof
    //     // TODO: https://www.youtube.com/watch?v=GqzOfcQQFc0
    // }
}
