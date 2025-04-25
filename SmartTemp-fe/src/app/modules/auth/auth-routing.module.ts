import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import {LoginComponent} from "./components/login/login.component";
import {RegisterComponent} from "./components/register/register.component";
import {AuthGuard} from "../core/guards/auth.guard";
import {UnauthGuard} from "../core/guards/unauth.guard";

const routes: Routes = [
  { path: 'logowanie', component: LoginComponent, canActivate: [UnauthGuard] },
  { path: 'rejestracja', component: RegisterComponent, canActivate: [UnauthGuard] },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AuthRoutingModule { }
