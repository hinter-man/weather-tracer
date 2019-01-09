import { Component, OnInit } from '@angular/core';
import { Measurement } from '../shared/measurement';
import { WetrRestClientService } from '../shared/wetr-rest-client.service';
import { ActivatedRoute } from '@angular/router';
import { map, tap } from 'rxjs/operators';

@Component({
  selector: 'wetr-station-measurement-detail',
  templateUrl: './station-measurement-detail.component.html',
  styleUrls: ['./station-measurement-detail.component.css']
})
export class StationMeasurementDetailComponent implements OnInit {

  public measurements: Measurement[];
  public filteredMeasurements: Measurement[];
  public typeOfMeasureId: number;

  constructor(private wetrService: WetrRestClientService,
              private route: ActivatedRoute) { }

  ngOnInit() {
    // get station id and convert to int
    let stationId = +this.route.snapshot.paramMap.get('id');

    this.getMeasurements(stationId, this.typeOfMeasureId);
  }

  private getMeasurements(stationId: number, typeOfMeasureId: number): void {
    this.wetrService.getMeasurementsByStation(stationId)
      .subscribe(res => this.measurements = res);
  }

  public showMeasurementByTypeOfMeasure(typeOfMeasureId: string) : void {
    this.filteredMeasurements = 
      this.measurements.filter(m => m.TypeOfMeasure.Id === +typeOfMeasureId);
  }

}
