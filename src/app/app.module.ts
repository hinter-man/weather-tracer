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
import { FormsModule } from '@angular/forms';
import { StationMeasurementComponent } from './station-measurement/station-measurement.component';
import { StationMeasurementDetailComponent } from './station-measurement-detail/station-measurement-detail.component';

@NgModule({
  declarations: [
    AppComponent,
    StationListComponent,
    WelcomeComponent,
    SearchLocationComponent,
    StationDetailViewComponent,
    StationMeasurementComponent,
    StationMeasurementDetailComponent
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    AppRoutingModule,
    FormsModule,
    AngularMaterialModule,
    HttpClientModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
