import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'wetr-station-measurement-detail',
  templateUrl: './station-measurement-detail.component.html',
  styleUrls: ['./station-measurement-detail.component.css']
})
export class StationMeasurementDetailComponent implements OnInit {

  dateLoaded: Date;

  constructor() { }

  ngOnInit() {
    setTimeout(() => this.setDate(), 3000); 
  }
  setDate(): any {
    this.dateLoaded = new Date();
    console.log(this.dateLoaded);
  }

}
