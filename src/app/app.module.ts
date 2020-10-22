import {BrowserModule} from '@angular/platform-browser';
import {NgModule} from '@angular/core';

import {AppRoutingModule} from './app-routing.module';
import {HeaderComponent} from './header/header.component';
import {AppComponent} from './app.component';
import {ChartWidgetComponent} from './chart-widget/chart-widget.component';
import {NewsWidgetComponent} from './news-widget/news-widget.component';
import {StartWidgetComponent} from './start-widget/start-widget.component';
import {FooterComponent} from './footer/footer.component';

@NgModule({
    declarations: [
        HeaderComponent,
        AppComponent,
        ChartWidgetComponent,
        NewsWidgetComponent,
        StartWidgetComponent,
        FooterComponent
    ],
    imports: [
        BrowserModule,
        AppRoutingModule
    ],
    providers: [],
    bootstrap: [
        AppComponent,
        HeaderComponent
    ]
})
export class AppModule {
}
