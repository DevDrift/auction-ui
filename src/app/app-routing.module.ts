import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import {SimpleComponent} from "./simple/simple.component";

const routes: Routes = [
  { path: '', redirectTo: '/simple', pathMatch: 'full'},
  { path: 'simple', component: SimpleComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
