import { Injectable } from '@angular/core';
import { Station } from './station';
import { Preference } from './preference';
import { AuthService } from './auth.service';

@Injectable({
  providedIn: 'root'
})
export class PreferencesService {
  private readonly DASHBOARD_STATION_STORAGE_KEY = 'dashboardStations';

  constructor(private auth: AuthService) { }

  public toggleStationLocalStorage(station: Station) {
    if (!this.auth.isAuthenticated()) {
      return;
    }

    var storage: Array<Preference> = this.getDashboardLocalStorage();

    // toggle - either put or remove
    if (this.stationExistsinDashboardLocalStorage(station.Id)) {
      this.removeStationFromLocalStorage(storage, station.Id);
    } else {
      this.putStationToLocalStorage(storage, station);
    }  
  }

  public stationExistsinDashboardLocalStorage(stationId: number): boolean {
    var storage = this.getDashboardLocalStorage();
    return (storage && storage.findIndex(m => m.stationId === stationId) >= 0);
  }

  public getPreferencesFromLocalStorage() : Array<Preference> {
    return this.getDashboardLocalStorage();
  }

  private putStationToLocalStorage(storage: Array<Preference>, station: Station): void {  
    // set initial preference
    storage.push(new Preference(station.Id, undefined, undefined));
    // set to storage
    localStorage.setItem(this.DASHBOARD_STATION_STORAGE_KEY, JSON.stringify(storage));
  }

  private removeStationFromLocalStorage(storage: Array<Preference>, stationId: number): void {
    storage = storage.filter(m => m.stationId !== stationId);
    localStorage.setItem(this.DASHBOARD_STATION_STORAGE_KEY, JSON.stringify(storage));
  }

  private getDashboardLocalStorage() : Array<Preference> {
    var storage: Array<Preference> = 
      JSON.parse(localStorage.getItem(this.DASHBOARD_STATION_STORAGE_KEY));

    // check if storage is empty
    if (!storage) {
      storage = new Array<Preference>();
    }
    return storage;
  }
}
