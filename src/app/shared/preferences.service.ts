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

  public updateStationPreferenceTypeOfMeasureIndex(
    stationId: number, typeOfMeasureIndex: number) : void {
      let storage = this.getDashboardLocalStorage();
      let index = storage.findIndex(pref => pref.stationId === stationId);
      storage[index].typeOfMeasureIndex = typeOfMeasureIndex;
      localStorage.setItem(this.DASHBOARD_STATION_STORAGE_KEY, JSON.stringify(storage));
  }

  public getStationPreference(stationId: number): Preference {
    let storage = this.getDashboardLocalStorage();
    let stationPreferece = storage.find(pref => pref.stationId === stationId);

    return stationPreferece;
  }

  public updateStationPreferenceDisplayType(
    stationId: number, chartType: string) : void {
      let storage = this.getDashboardLocalStorage();
      let index = storage.findIndex(pref => pref.stationId === stationId);
      storage[index].chartType = chartType;
      localStorage.setItem(this.DASHBOARD_STATION_STORAGE_KEY, JSON.stringify(storage));
  }

  private putStationToLocalStorage(storage: Array<Preference>, station: Station): void {  
    // set initial preference
    storage.push(new Preference(station.Id, undefined, undefined, '', 0));
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
