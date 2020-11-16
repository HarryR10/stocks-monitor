import {IWidget} from "./widget/iwidget";

export interface IAreaCell {
    id: number;
    inRightColumn: boolean; //enum string
    type: IWidget;
}
