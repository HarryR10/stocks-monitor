import {IDictionary} from "../../../generic-interfaces/idictionary";

export interface IWidget {
    isStartWidget: boolean;
    apiSource?: string;
    apiParams?: IDictionary<string>

    //TODO: можем ли пременять typeof с приведением?
    //отрисовка будет в ngOnInit

}
