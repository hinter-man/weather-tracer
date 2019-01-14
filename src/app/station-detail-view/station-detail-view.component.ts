import { Component, OnInit, ViewChild } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Station } from '../shared/station';
import { WetrRestClientService } from '../shared/wetr-rest-client.service';

@Component({
  selector: 'wetr-station-detail-view',
  templateUrl: './station-detail-view.component.html',
  styleUrls: ['./station-detail-view.component.css']
})
export class StationDetailViewComponent implements OnInit {
  station : Station;

  constructor(private route: ActivatedRoute,
              private wetrService: WetrRestClientService) { }

  ngOnInit() {
    let id = this.route.snapshot.params['id'];
    this.wetrService.getStationById(id)
      .subscribe(res => {
        this.station = res;
      });
  }

}
