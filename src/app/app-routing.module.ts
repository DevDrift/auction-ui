import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {SimpleComponent} from "./simple/simple.component";
import {FortuneWheelComponent} from "./fortune-wheel/fortune-wheel.component";

const routes: Routes = [
    {path: '', redirectTo: '/simple', pathMatch: 'full'},
    {path: 'simple', component: SimpleComponent},
    {path: 'fortune', component: FortuneWheelComponent},
];

@NgModule({
    imports: [RouterModule.forRoot(routes)],
    exports: [RouterModule]
})
export class AppRoutingModule {
}
