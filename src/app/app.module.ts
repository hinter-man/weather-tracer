import { BrowserModule } from '@angular/platform-browser';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';

import { AngularMaterialModule } from './angular-material.module';
import { StationListComponent } from './station-list/station-list.component';
import { WelcomeComponent } from './welcome/welcome.component';
import { HttpClientModule } from '@angular/common/http';
import { SearchLocationComponent } from './search-location/search-location.component';
import { StationDetailViewComponent } from './station-detail-view/station-detail-view.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { StationMeasurementComponent } from './station-measurement/station-measurement.component';
import { StationMeasurementDetailComponent } from './station-measurement-detail/station-measurement-detail.component';
import { LoginComponent } from './login/login.component';
import { AdminComponent } from './admin/admin.component';
import { OAuthCallbackComponent } from './oauth-callback/oauth-callback.component';
import { ChartsModule } from 'ng2-charts/ng2-charts';
import { MeasurementChartComponent } from './measurement-chart/measurement-chart.component';
import { AgmCoreModule } from '@agm/core';
import { environment } from 'src/environments/environment';
import { MapsComponent } from './maps/maps.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { MatGridListModule, MatCardModule, MatMenuModule, MatIconModule, MatButtonModule } from '@angular/material';
import { LayoutModule } from '@angular/cdk/layout';
import { DashboardCardContentComponent } from './dashboard-card-content/dashboard-card-content.component';

@NgModule({
  declarations: [
    AppComponent,
    StationListComponent,
    WelcomeComponent,
    SearchLocationComponent,
    StationDetailViewComponent,
    StationMeasurementComponent,
    StationMeasurementDetailComponent,
    LoginComponent,
    AdminComponent,
    OAuthCallbackComponent,
    MeasurementChartComponent,
    MapsComponent,
    DashboardComponent,
    DashboardCardContentComponent
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    AppRoutingModule,
    FormsModule,
    AngularMaterialModule,
    HttpClientModule,
    ChartsModule,
    AgmCoreModule.forRoot({
      apiKey: environment.googleApiKey
    }),
    MatGridListModule,
    MatCardModule,
    MatMenuModule,
    MatIconModule,
    MatButtonModule,
    LayoutModule,   
    ReactiveFormsModule,
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
