import { Component, OnInit } from '@angular/core';
import { AuthService } from '../shared/auth.service';
import { PreferencesService } from '../shared/preferences.service';
import { WetrRestClientService } from '../shared/wetr-rest-client.service';
import { Station } from '../shared/station';
import { Router } from '@angular/router';


@Component({
  selector: 'wetr-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {

  public stations: Station[] = [];
  public dashboardEmpty: boolean;

  constructor(public auth: AuthService,
              private preferences: PreferencesService,
              private wetrService: WetrRestClientService,
              private router: Router) {}

  ngOnInit() {
    var dashboardLocalStorage = this.preferences.getPreferencesFromLocalStorage();
    this.dashboardEmpty = dashboardLocalStorage.length === 0;
    // get every station in local storage from service
    dashboardLocalStorage.forEach(element => {
      this.wetrService.getStationById(element.stationId)
        .subscribe(station => {
          this.stations.push(station);
        });
    });
    this.stations = this.stations.sort(s => s.Id);
  }

  public removeStationFromDashboard(station: Station) : void {
    this.preferences.toggleStationLocalStorage(station);
    // remove also from stations array
    this.stations = this.stations.filter(s => s.Id !== station.Id);
    this.dashboardEmpty = this.stations.length === 0;
  }
  
}
