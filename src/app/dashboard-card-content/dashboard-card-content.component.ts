import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { WetrRestClientService } from '../shared/wetr-rest-client.service';
import { Measurement } from '../shared/measurement';
import { Station } from '../shared/station';
import * as moment from 'moment';
import { TypeOfMeasurement } from '../shared/typeofmeasurement';
import { PreferencesService } from '../shared/preferences.service';
import { Router } from '@angular/router';
import { Preference } from '../shared/preference';

@Component({
  selector: 'wetr-dashboard-card-content',
  templateUrl: './dashboard-card-content.component.html',
  styleUrls: ['./dashboard-card-content.component.css']
})
export class DashboardCardContentComponent implements OnInit {

  @Input() station: Station;
  @Output() removeStationFromDashboardEvent = new EventEmitter<Station>();
  public measurements: Array<Measurement> = [];
  public typeOfMeasures: Array<TypeOfMeasurement> = [];
  public index: number;
  private preference: Preference;

  // chart
  public chartLabels:string[] = ['Avg', 'Min', 'Max'];
  public chartData:number[] = [];
  public legend:boolean = true;
  public chartType:string = '';
  public showChart: boolean;
  
   
  constructor(private wetrService: WetrRestClientService,
              private preferences: PreferencesService,
              private router: Router) { }

  ngOnInit() {
    this.preference = this.preferences.getStationPreference(this.station.Id);
    this.index = this.preference.typeOfMeasureIndex;
    this.showChart = this.preference.chartType !== '';
    if (this.showChart) {
      this.chartType = this.preference.chartType;
    }
    
    // get measurement by preference
    this.wetrService.getMeasurementsByStation(
      this.station.Id, 
      moment().startOf('day').toDate(), 
      moment().endOf('day').subtract(1, 'minutes').toDate(),
      2)
        .subscribe(measurements => {
          this.measurements = measurements;
          this.measurements.forEach(elem => {
            this.typeOfMeasures.push(elem.TypeOfMeasure);
          });
          this.updateChart();
        });
  }

  public nextTypeOfMeasure() : void {
    this.index++;
    if (this.index >= this.typeOfMeasures.length) {
      this.index = 0;
    }
    this.updateChart();
    this.preferences.updateStationPreferenceTypeOfMeasureIndex(this.station.Id, this.index);
  }

  public prevTypeOfMeasure() : void {
    this.index--;
    if (this.index < 0 ) {
      this.index = this.typeOfMeasures.length - 1;
    }
    this.updateChart();
    this.preferences.updateStationPreferenceTypeOfMeasureIndex(this.station.Id, this.index);
  }

  private updateChart() {
    if (this.measurements && this.measurements.length > 0) {
      this.chartData = [];
      this.chartData.push(this.measurements[this.index].Avg);
      this.chartData.push(this.measurements[this.index].Min);
      this.chartData.push(this.measurements[this.index].Max);
    }    
  }

  public changeDisplayType(type: string) {
    this.preferences.updateStationPreferenceDisplayType(this.station.Id, type);
    if (type == '') {
      this.showChart = false;
    } else {
      this.showChart = true;
      this.chartType = type;
    }
  }

  public navigateToStationDetails(station: Station) : void {
    this.router.navigateByUrl(`/stations/${station.Id}`);
  }

}
