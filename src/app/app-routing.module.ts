import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { StationListComponent } from './station-list/station-list.component';
import { WelcomeComponent } from './welcome/welcome.component';
import { StationDetailViewComponent } from './station-detail-view/station-detail-view.component';
import { AdminComponent } from './admin/admin.component';
import { AdminGuard } from './admin.guard';
import { OAuthCallbackComponent } from './oauth-callback/oauth-callback.component';
import { DashboardComponent } from './dashboard/dashboard.component';

const routes: Routes = [
  { path: '', pathMatch: 'full', redirectTo: 'welcome'},
  { path: 'welcome', component: WelcomeComponent },
  { path: 'stations', component: StationListComponent },
  { path: 'stations/:id', component: StationDetailViewComponent},
  { path: 'admin', component: AdminComponent, canActivate: [AdminGuard] },
  { path: 'dashboard', component: DashboardComponent},
  { path: 'oauthcallback', component: OAuthCallbackComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
