import { Component, OnInit, ViewChild } from '@angular/core';
import { Station } from '../shared/station';
import { NgForm } from '@angular/forms';
import { PostCode } from '../shared/postcode';
import { StationErrorMessages } from '../shared/station-form-error-messages';
import { WetrRestClientService } from '../shared/wetr-rest-client.service';
import { MatSnackBar } from '@angular/material';
import { Router } from '@angular/router';
import { HttpResponse } from '@angular/common/http';

@Component({
  selector: 'wetr-admin',
  templateUrl: './admin.component.html',
  styleUrls: ['./admin.component.css']
})
export class AdminComponent implements OnInit {

  @ViewChild('stationForm') stationForm: NgForm;
  public station: Station;
  public errors: { [key: string]: string } = {};

  constructor(private wetrService: WetrRestClientService,
              private router: Router,
              public snackBar: MatSnackBar) { }

  ngOnInit() {
    this.initializeStation();
    this.stationForm.statusChanges.subscribe(() => this.updateErrorMessages());
  }

  private initializeStation() : void {
    this.station = new Station();
    this.station.PostCode = new PostCode();
  }

  public submitStationForm() {
    this.wetrService.insertStation(this.station).subscribe(
      res =>  {
        this.processSubmitResult(res);        
      });
  }

  private processSubmitResult(res: HttpResponse<Station>) {
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



}
