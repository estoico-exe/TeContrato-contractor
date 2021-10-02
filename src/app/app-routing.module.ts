import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import {MaterialsComponent} from "./materials/pages/materials/materials.component";

const routes: Routes = [
  //{ path: 'home', component: HomeComponent},
 // { path: 'about', component: HomeComponent},
  { path: '', redirectTo:'materials', pathMatch: 'full'},
  { path: 'materials', component: MaterialsComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
