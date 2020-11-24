import {BrowserModule} from '@angular/platform-browser';
import {NgModule} from '@angular/core';

import {AppRoutingModule} from './app-routing.module';
import {HeaderComponent} from './header/header.component';
import {AppComponent} from './app.component';
import {ChartWidgetComponent} from './widget-area/widget/chart-widget/chart-widget.component';
import {NewsWidgetComponent} from './widget-area/widget/news-widget/news-widget.component';
import {StartWidgetComponent} from './widget-area/widget/start-widget/start-widget.component';
import {FooterComponent} from './footer/footer.component';
import {SearchComponent} from './widget-area/widget/general-components/search/search.component';
import {AboutComponent} from './about/about.component';
import {WidgetComponent} from './widget-area/widget/widget.component';
import {RouterModule} from "@angular/router";
import {WidgetAreaComponent} from './widget-area/widget-area.component';
import {ChartComponent} from './widget-area/widget/chart-widget/chart/chart.component';
import {PersonalViewLoadService} from "./services/personal-load-service/personal-view-load.service";
import {environment} from 'src/environments/environment';
import {STOCKS_API_KEY} from "./app-injection-tokens";
import {FormsModule, ReactiveFormsModule} from "@angular/forms";
import {HttpClient, HttpClientModule} from "@angular/common/http";
import {ArrayType} from "@angular/compiler";
import {CommonModule} from "@angular/common";
import {SettingsComponent} from './settings/settings.component';

@NgModule({
    declarations: [
        HeaderComponent,
        AppComponent,
        ChartWidgetComponent,
        NewsWidgetComponent,
        StartWidgetComponent,
        FooterComponent,
        SearchComponent,
        AboutComponent,
        WidgetComponent,
        WidgetAreaComponent,
        ChartComponent,
        SettingsComponent
    ],
    imports: [
        BrowserModule,
        CommonModule,
        AppRoutingModule,
        RouterModule,
        FormsModule,
        ReactiveFormsModule,
        HttpClientModule
    ],
    providers: [
        PersonalViewLoadService,

        {
            provide: STOCKS_API_KEY,
            useValue: environment.hasOwnProperty('stocksApiKey') ? environment['stocksApiKey'] : 'demo'
            // function () {
            // if (!environment.hasOwnProperty('stocksApiKey')) {
            //     return 'demo';
            // } else {
            //     return environment['stocksApiKey'];
            // }
        }
    ],
    bootstrap: [
        AppComponent,
        HeaderComponent,
        FooterComponent
    ]
})

export class AppModule {
}
