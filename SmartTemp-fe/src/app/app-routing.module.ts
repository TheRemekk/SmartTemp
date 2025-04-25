import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import {HomeComponent} from "./modules/home/components/home/home.component";
import {AuthGuard} from "./modules/core/guards/auth.guard";

const routes: Routes = [
  { path: '', redirectTo: 'home', pathMatch: 'full' }, // Domyślna ścieżka
  { path: 'home', loadChildren: () => import('./modules/home/home.module').then(m => m.HomeModule), canActivate: [AuthGuard]}, // Lazy loading HomeModule
  { path: '', loadChildren: () => import('./modules/auth/auth.module').then(m => m.AuthModule) }, // AuthModule obsłuży swoje ścieżki
  { path: '**', redirectTo: 'home' } // Catch-all na nieistniejące ścieżki
];


@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
