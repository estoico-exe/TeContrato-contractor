import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { MaterialsComponent } from "./materials/pages/materials/materials.component";
import { LoginComponent } from "./authentication/login/login.component";
import {AuthenticationComponent} from "./authentication/authentication.component";
import {HomeComponent} from "./home/home.component";

const routes: Routes = [
  //{ path: 'home', component: HomeComponent},
 // { path: 'about', component: HomeComponent},
  { path: '', redirectTo:'materials', pathMatch: 'full'},
  { path: 'materials', component: MaterialsComponent },
  { path: 'authentication', component: AuthenticationComponent},
  { path: 'login', component: LoginComponent},
  { path: 'home', component: HomeComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
