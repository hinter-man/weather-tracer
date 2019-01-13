import { Component, OnInit } from '@angular/core';
import { Station } from '../shared/station';

@Component({
  selector: 'wetr-admin',
  templateUrl: './admin.component.html',
  styleUrls: ['./admin.component.css']
})
export class AdminComponent implements OnInit {

  public myStations: Array<Station>;

  constructor() { }

  ngOnInit() {
  }

  public addStation() : void {
    if (!this.myStations) {
      this.myStations = new Array<Station>();
    }
    // add new station
    this.myStations.push(new Station());    
  }

  public deleteStation(station: Station) : void {
    this.myStations = this.myStations.filter(s => s !== station);
  }



}
