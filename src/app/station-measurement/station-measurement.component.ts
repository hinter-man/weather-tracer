import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'wetr-station-measurement',
  templateUrl: './station-measurement.component.html',
  styleUrls: ['./station-measurement.component.css']
})
export class StationMeasurementComponent implements OnInit {

  @Input() stationId: number;
  public tabType = TabType;

  constructor() { }

  ngOnInit() {
  }

}

export enum TabType {
  Today,
  Hourly,
  TenDays,
  Custom,
}

