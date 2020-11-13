import {NgModule} from '@angular/core';
import {Routes, RouterModule} from '@angular/router';
import {WidgetAreaComponent} from "./widget-area/widget-area.component";
import {AboutComponent} from "./about/about.component";
import {ChartWidgetComponent} from "./widget-area/widget/chart-widget/chart-widget.component";
import {SearchComponent} from "./widget-area/widget/chart-widget/search/search.component";
import {ChartComponent} from "./widget-area/widget/chart-widget/chart/chart.component";


const routes: Routes = [
    {path: '', component: WidgetAreaComponent},
    {path: 'about', component: AboutComponent},
    //TODO: подойдет ли такой подход?
    // {
    //     path: 'chart_widget/:id', component: ChartWidgetComponent, children: [
    //         {path: 'search', component: SearchComponent},
    //         {path: 'chart', component: ChartComponent}
    //     ]
    // }
];

@NgModule({
    imports: [RouterModule.forRoot(routes)],
    exports: [RouterModule]
})
export class AppRoutingModule {
}
