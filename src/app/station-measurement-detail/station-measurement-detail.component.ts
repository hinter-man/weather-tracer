import { Component, OnInit, Input, ViewChild } from '@angular/core';
import { Measurement } from '../shared/measurement';
import { WetrRestClientService } from '../shared/wetr-rest-client.service';
import { ActivatedRoute } from '@angular/router';
import { TabType } from '../station-measurement/station-measurement.component';
import * as moment from 'moment';

@Component({
  selector: 'wetr-station-measurement-detail',
  templateUrl: './station-measurement-detail.component.html',
  styleUrls: ['./station-measurement-detail.component.css']
})
export class StationMeasurementDetailComponent implements OnInit {

  @Input() tabType: TabType;
  private stationId: number;
  public currentShownTypeOfMeasures: Array<number> = new Array<number>();
  public measurementMap: Map<number, Array<Measurement>> = new Map();
  public displayedColumns: string[] = ['Timestamp', 'Value', 'Min', 'Max', 'Avg'];
  public typeOfMeasures: Array<string> = 
    ['Temperature', 'Air Pressure', 'Humidity', 'Wind Direction', 'Wind Speed', 'Rain'];

  public customFromDate: Date;
  public customToDate: Date;


  // chart
    
  public lineChartData:Array<any> = [
    {data: [65, 59, 80, 81, 56, 55, 40], label: 'Value'},
    {data: [28, 48, 40, 19, 86, 27, 90], label: 'Min'},
    {data: [18, 48, 77, 9, 100, 27, 40], label: 'Max'},
    {data: [18, 48, 77, 9, 100, 27, 40], label: 'Avg'},
  ];
  public lineChartOptions:any = {
    responsive: true
  };
  public lineChartLegend:boolean = true;
  public lineChartType:string = 'line';


  constructor(private wetrService: WetrRestClientService,
              private route: ActivatedRoute) { }

  ngOnInit() {
    // get station id and convert to int
    this.stationId = +this.route.snapshot.paramMap.get('id');
    this.getMeasurementsForCurrentTab();
  }

  public datePickerFromFilter = (d: Date): boolean => {
    if (this.customToDate) {
      return d < this.customToDate;
    }
    return true;
  }

  public datePickerToFilter = (d: Date): boolean => {
    if (this.customFromDate) {
      return d > this.customFromDate;
    }
    return true;
  }

  private getMeasurementsForCurrentTab(): void {
    switch (this.tabType) {
      case TabType.Today:
        this.getMeasurementsForToday();
        break;

      case TabType.Hourly:
        this.getMeasurementsHourly();
        break;

      case TabType.TenDays:
        this.getMeasurementsForTenDays();
        break;

      default:
        break;
    } 
  }

  private getMeasurementsForToday() {
    let now = new Date();
    let endOfDay = moment().endOf('day');

    this.wetrService.getMeasurementsByStation(this.stationId, now, endOfDay.toDate())
      .subscribe(res => {
        this.createMeasurementMapFromResult(res);
      });
  }

  private getMeasurementsForTenDays() {
    let startDate = moment().startOf('day');
    let endDate = moment().startOf('day').add(10, 'day');
    
    this.wetrService.getMeasurementsByStation(
      this.stationId, startDate.toDate(), endDate.toDate(),2)
        .subscribe(res => this.createMeasurementMapFromResult(res));
  }

  private getMeasurementsHourly() {
    let startOfDay = new Date();
    let endOfDay = moment().endOf('day');

    this.wetrService.getMeasurementsByStation(this.stationId, startOfDay, endOfDay.toDate(), 1)
      .subscribe(res => this.createMeasurementMapFromResult(res));
  }

  public getMeasurementsWithUserFilter() {
    this.wetrService.getMeasurementsByStation(this.stationId, this.customFromDate, this.customToDate)
      .subscribe(res => this.createMeasurementMapFromResult(res));
  }

  private createMeasurementMapFromResult(res: Measurement[]) {
    // create map with key is typeofmeasure name, values are array
    // of measurements
    res.reduce(function (map, obj) {
      map[obj.TypeOfMeasure.Id-1] = res.filter(m => m.TypeOfMeasure.Id === obj.TypeOfMeasure.Id); // -1 to start at zero
      return map;
    }, this.measurementMap);  
  }
  
  public showMeasurementByTypeOfMeasure(typeOfMeasureId: string) : void {
    let id = +typeOfMeasureId;
    if (this.currentShownTypeOfMeasures.includes(id)) {
      this.currentShownTypeOfMeasures = this.currentShownTypeOfMeasures.filter(curr => curr !== id);
    } else {
      this.currentShownTypeOfMeasures.push(id);
    }
  }
}