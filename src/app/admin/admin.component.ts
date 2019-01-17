import { Component, OnInit, ViewChild } from '@angular/core';
import { Station } from '../shared/station';
import { NgForm } from '@angular/forms';
import { PostCode } from '../shared/postcode';
import { StationErrorMessages } from './station-form-error-messages';
import { WetrRestClientService } from '../shared/wetr-rest-client.service';
import { tap } from 'rxjs/operators';

@Component({
  selector: 'wetr-admin',
  templateUrl: './admin.component.html',
  styleUrls: ['./admin.component.css']
})
export class AdminComponent implements OnInit {

  @ViewChild('stationForm') stationForm: NgForm;
  public station: Station;
  public errors: { [key: string]: string } = {};

  constructor(private wetrService: WetrRestClientService) { }

  ngOnInit() {
    this.initializeStation();
    this.stationForm.statusChanges.subscribe(() => this.updateErrorMessages());
  }

  private initializeStation() : void {
    this.station = new Station();
    this.station.PostCode = new PostCode();
  }

  public submitStationForm() {
    console.log(this.station);
    this.wetrService.insertStation(this.station).subscribe(res => console.log(res));
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
