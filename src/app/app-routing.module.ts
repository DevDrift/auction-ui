import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {SimpleComponent} from "./simple/simple.component";
import {FortuneWheelComponent} from "./fortune-wheel/fortune-wheel.component";
import {PageNotFoundComponent} from "./page-not-found/page-not-found.component";

const routes: Routes = [
    {path: '', redirectTo: '/simple', pathMatch: 'full'},
    {path: 'simple', component: SimpleComponent},
    {path: 'fortune', component: FortuneWheelComponent},
    {path: '**', component: PageNotFoundComponent},
];

@NgModule({
    imports: [RouterModule.forRoot(routes)],
    exports: [RouterModule]
})
export class AppRoutingModule {
}
