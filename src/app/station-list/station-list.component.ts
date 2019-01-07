import { Component, OnInit, ViewChild } from '@angular/core';
import { Station } from '../shared/station';
import { WetrRestClientService } from '../shared/wetr-rest-client.service';
import { MatTableDataSource, MatPaginator } from '@angular/material';
import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs';

@Component({
  selector: 'wetr-station-list',
  templateUrl: './station-list.component.html',
  styleUrls: ['./station-list.component.css']
})
export class StationListComponent implements OnInit {
  
  // specifies the order of the columns
  displayedColumns: string[] = 
    ['Id', 'Name', 'Type', 'PostCode', 'Longitude', 'Latitude'];
  tableDataSource: MatTableDataSource<Station>;

  @ViewChild(MatPaginator) paginator: MatPaginator;

  constructor(private wetrService: WetrRestClientService,
              private route: ActivatedRoute) { }

  ngOnInit() {
    // get query param from actual route and check if 
    // pre filtering neccessary
    let postCodeFilter;
    this.route.queryParamMap
      .subscribe(res => {
        postCodeFilter = res.get('postCode');
        if (postCodeFilter) {
          this.getStationsByPostCode(postCodeFilter);
        } else {
          this.getStations();
        }
      });
  
  }
  getStationsByPostCode(postCodeFilter: string): void {
    this.wetrService.getStationByPostCode(postCodeFilter).subscribe(res => {
      this.prepareTable(res);
    });
  }

  getStations() : void {
     this.wetrService.getStations().subscribe(res => {
       this.prepareTable(res);
     });    
  }

  applyFilter(filterValue: string) {
    this.tableDataSource.filter = filterValue.trim().toLowerCase();
  }

  private prepareTable(stations: Station[]) : void {
    this.tableDataSource = new MatTableDataSource(stations);
    this.tableDataSource.paginator = this.paginator;
  }
}
