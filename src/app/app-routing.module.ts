import {NgModule} from '@angular/core';
import {Routes, RouterModule} from '@angular/router';
import {WidgetAreaComponent} from "./widget-area/widget-area.component";
import {AboutComponent} from "./about/about.component";
import {SettingsComponent} from "./settings/settings.component";


const routes: Routes = [
    {path: '', component: WidgetAreaComponent},
    {path: 'about', component: AboutComponent},
    {path: 'settings', component: SettingsComponent},
];

@NgModule({
    imports: [RouterModule.forRoot(routes)],
    exports: [RouterModule]
})
export class AppRoutingModule {
}
