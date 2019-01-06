import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { StationListComponent } from './station-list/station-list.component';
import { WelcomeComponent } from './welcome/welcome.component';

const routes: Routes = [
  { path: '', pathMatch: 'full', redirectTo: 'welcome'},
  { path: 'welcome', component: WelcomeComponent },
  { path: 'stations', component: StationListComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
