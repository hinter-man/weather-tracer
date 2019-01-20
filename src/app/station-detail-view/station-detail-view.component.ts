import { Component, OnInit, ViewChild } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Station } from '../shared/station';
import { WetrRestClientService } from '../shared/wetr-rest-client.service';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { StationErrorMessages } from '../shared/station-form-error-messages';
import { AuthService } from '../shared/auth.service';
import { MatSnackBar } from '@angular/material';

@Component({
  selector: 'wetr-station-detail-view',
  templateUrl: './station-detail-view.component.html',
  styleUrls: ['./station-detail-view.component.css']
})
export class StationDetailViewComponent implements OnInit {
  station: Station;
  public myForm: FormGroup;
  public errors: { [key: string]: string } = {};

  constructor(private route: ActivatedRoute,
              private wetrService: WetrRestClientService,
              public auth: AuthService,
              private fb: FormBuilder,
              public snackBar: MatSnackBar) { }

  ngOnInit() {
    let id = this.route.snapshot.params['id'];
    this.wetrService.getStationById(id)
      .subscribe(res => {
        this.station = res;
        this.myForm = this.fb.group(
          {
            name: [this.station.Name, Validators.required],
            type: [this.station.Type, Validators.required],
            address: [this.station.Address, Validators.required],
            postcode: [this.station.PostCode.Code, Validators.required],
            community: [this.station.PostCode.Community],
            district: [this.station.PostCode.Disctrict.Name],
            province: [this.station.PostCode.Disctrict.Province.Name],
            latitude: [this.station.Latitude,
            [Validators.required, Validators.min(-90), Validators.max(90)]],
            longitude: [this.station.Latitude,
            [Validators.required, Validators.min(-180), Validators.max(180)]],
          }
        )
        if (!this.auth.isAuthenticated()) {
          this.myForm.disable();
        }
        this.myForm.statusChanges.subscribe(() => this.updateErrorMessages());
      });

  }

  private updateErrorMessages(): void {
    this.errors = {};
    for (const message of StationErrorMessages) {
      const control = this.myForm.get(message.forControl);
      if (control &&
        control.dirty &&
        control.invalid &&
        control.errors[message.forValidator] &&
        !this.errors[message.forControl]) {
        this.errors[message.forControl] = message.text;
      }
    }
  }



  public submitForm() {
    // convert form to station
    this.station.Name = this.myForm.value.name;
    this.station.Type = this.myForm.value.type;
    this.station.PostCode.Code = this.myForm.value.postcode;
    this.station.Latitude = this.myForm.value.latitude;
    this.station.Longitude = this.myForm.value.longitude;

    this.wetrService.updateStation(this.station).subscribe(
      res => {
        if (res.ok) {
          // open snackbar
          this.snackBar.open('Station updated', undefined, {
            duration: 4000
          });
        } else {
          // open snackbar
          this.snackBar.open('Station not updated!!', undefined, {
            duration: 4000
          });        
        }
    });
  }

}
