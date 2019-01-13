import { Component, OnInit, Input } from '@angular/core';
import { Measurement } from '../shared/measurement';

@Component({
  selector: 'wetr-measurement-chart',
  templateUrl: './measurement-chart.component.html',
  styleUrls: ['./measurement-chart.component.css']
})
export class MeasurementChartComponent implements OnInit {

  @Input() measurements: Array<Measurement>;

  // lineChart
  public lineChartData:Array<any> = new Array();
  public lineChartLabels:Array<string>;
  public lineChartOptions:any = {
    responsive: true
  };
  public lineChartLegend:boolean = true;
  public lineChartType:string = 'line';

  constructor() { }

  ngOnInit() {

    // initialize chart
    this.lineChartLabels = this.measurements.map(m => m.Timestamp);
    var avg = { data: this.measurements.map(m => m.Avg), label: 'Avg' };
    var min = { data: this.measurements.map(m => m.Min), label: 'Min' };
    var max = { data: this.measurements.map(m => m.Max), label: 'Max' };
    var val = { data: this.measurements.map(m => m.Value), label: 'Value' };
    var charData = [];
    charData.push(min);
    charData.push(max);
    charData.push(val);
    charData.push(avg);

    this.lineChartData = charData;

  }
}
