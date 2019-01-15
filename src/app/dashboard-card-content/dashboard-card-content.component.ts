import { Component, OnInit, Input } from '@angular/core';
import { WetrRestClientService } from '../shared/wetr-rest-client.service';
import { Measurement } from '../shared/measurement';
import { Station } from '../shared/station';
import * as moment from 'moment';
import { forEach } from '@angular/router/src/utils/collection';
import { TypeOfMeasurement } from '../shared/typeofmeasurement';
import { Observable } from 'rxjs';

@Component({
  selector: 'wetr-dashboard-card-content',
  templateUrl: './dashboard-card-content.component.html',
  styleUrls: ['./dashboard-card-content.component.css']
})
export class DashboardCardContentComponent implements OnInit {

  @Input() station: Station;
  @Input() events: Observable<string>;
  private eventsSubscription: any
  measurements: Array<Measurement> = [];
  typeOfMeasures: Array<TypeOfMeasurement> = [];
  index: number;

  // PolarArea
  public polarAreaChartLabels:string[] = ['Avg', 'Min', 'Max'];
  public polarAreaChartData:number[] = [];
  public polarAreaLegend:boolean = true;
  public chartType:string = 'polarArea';
   

  constructor(private wetrService: WetrRestClientService) { }

  ngOnInit() {
    this.index = Math.floor(Math.random() * 6);  
    // get measurement by preference
    this.wetrService.getMeasurementsByStation(
      this.station.Id, moment().startOf('day').toDate(), moment().endOf('day').toDate(), 2).subscribe(measurements => {
        this.measurements = measurements;
        this.measurements.forEach(elem => {
          this.typeOfMeasures.push(elem.TypeOfMeasure);
        });
        this.updateChart();
      });

      // change chart type - updated by parent component
      this.eventsSubscription = this.events.subscribe(res => {
        this.chartType = res
      });
  }

  public nextTypeOfMeasure() : void {
    this.index++;
    if (this.index >= this.typeOfMeasures.length) {
      this.index = 0;
    }
    this.updateChart();
  }

  public prevTypeOfMeasure() : void {
    this.index--;
    if (this.index < 0 ) {
      this.index = this.typeOfMeasures.length - 1;
    }
    this.updateChart();
  }

  private updateChart() {
    if (this.measurements && this.measurements.length > 0) {
      this.polarAreaChartData = [];
      this.polarAreaChartData.push(this.measurements[this.index].Avg);
      this.polarAreaChartData.push(this.measurements[this.index].Min);
      this.polarAreaChartData.push(this.measurements[this.index].Max);
    }    
  }

}
