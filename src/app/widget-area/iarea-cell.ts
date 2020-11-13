import {IWidget} from "./widget/iwidget";

export interface IAreaCell {
    id: number;
    inRightColumn: boolean;
    type: IWidget;
}
