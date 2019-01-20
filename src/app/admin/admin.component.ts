import { Component, OnInit, ViewChild } from '@angular/core';
import { Station } from '../shared/station';
import { NgForm } from '@angular/forms';
import { PostCode } from '../shared/postcode';
import { StationErrorMessages, MeasurementErrorMessages } from '../shared/station-form-error-messages';
import { WetrRestClientService } from '../shared/wetr-rest-client.service';
import { MatSnackBar } from '@angular/material';
import { Router } from '@angular/router';
import { HttpResponse } from '@angular/common/http';
import { Measurement } from '../shared/measurement';
import { TypeOfMeasurement } from '../shared/typeofmeasurement';

@Component({
  selector: 'wetr-admin',
  templateUrl: './admin.component.html',
  styleUrls: ['./admin.component.css']
})
export class AdminComponent implements OnInit {

  @ViewChild('stationForm') stationForm: NgForm;
  @ViewChild('measurementForm') measurementForm: NgForm;
  public station: Station;
  public measurement: Measurement;
  public typeOfMeasures: TypeOfMeasurement[];
  public stations: Station[];
  public errors: { [key: string]: string } = {};

  constructor(private wetrService: WetrRestClientService,
              private router: Router,
              public snackBar: MatSnackBar) { }

  ngOnInit() {
    // station form
    this.initializeStation();
    this.stationForm.statusChanges.subscribe(() => {
      this.updateErrorMessages();
    });

    // measurement form
    this.initializeMeasurement();
    this.measurementForm.statusChanges.subscribe(() => {
      this.updateMeasurementErrorMessages();
    });  

    // get stations for select list
    this.wetrService.getStations().subscribe(res => {
      this.stations = res;
    });

    // get measurements for select list
    this.wetrService.getTypeOfMeasures().subscribe(res => {
      this.typeOfMeasures = res;
    });
  }

  private initializeMeasurement(): any {
    this.measurement = new Measurement();
  }

  private initializeStation() : void {
    this.station = new Station();
    this.station.PostCode = new PostCode();
  }

  public submitStationForm() {
    this.wetrService.insertStation(this.station).subscribe(
      res =>  {
        this.processStationSubmitResult(res);        
      });
  }

  public submitMeasurementForm() {
    this.measurement.Timestamp = new Date();
    this.wetrService.insertMeasurement(this.measurement).subscribe(res => {
      if (res.ok) {
        // open snackbar
        let snackBarRef = this.snackBar.open('Measurement created', 'Go to Station', {
          duration: 5000
        });
        // on click snackbar button
        snackBarRef.onAction().subscribe(() => {
          this.router.navigateByUrl(`stations/${this.measurement.StationId}`);
        });
        // reset form
        this.stationForm.reset();
      }
      else {
        this.snackBar.open('Measurement not created!!');
      }
    })
  }

  private processStationSubmitResult(res: HttpResponse<Station>) {
    if (res.ok) {
      // get new station id from location header
      let locationHeader = res.headers.get('location');
      let newStationId = locationHeader.substr(locationHeader.lastIndexOf('/') + 1);
      // open snackbar
      let snackBarRef = this.snackBar.open('Station created', 'Show details', {
        duration: 5000
      });
      // on click snackbar button
      snackBarRef.onAction().subscribe(() => {
        this.router.navigateByUrl(`stations/${newStationId}`);
      });
      // reset form
      this.stationForm.reset();
    }
    else {
      this.snackBar.open('Station not created!!');
    }
  }

  private updateErrorMessages() : void {
    this.errors = {};
    for (const message of StationErrorMessages) {
      const control = this.stationForm.form.get(message.forControl);
      if (control &&
          control.dirty &&
          control.invalid &&
          control.errors[message.forValidator] &&
          !this.errors[message.forControl]) {
        this.errors[message.forControl] = message.text;
      }
    }
  }

  private updateMeasurementErrorMessages() : void {
    this.errors = {};
    for (const message of MeasurementErrorMessages) {
      const control = this.stationForm.form.get(message.forControl);
      if (control &&
          control.dirty &&
          control.invalid &&
          control.errors[message.forValidator] &&
          !this.errors[message.forControl]) {
        this.errors[message.forControl] = message.text;
      }
    }
  }



}
