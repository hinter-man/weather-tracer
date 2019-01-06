import { Component, OnInit, ViewChild } from '@angular/core';
import { Station } from '../shared/station';
import { WetrRestClientService } from '../shared/wetr-rest-client.service';
import { MatTableDataSource, MatPaginator } from '@angular/material';

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

  constructor(private wetrService: WetrRestClientService) { }

  ngOnInit() {
    this.getStations();
  }

  getStations() : void {
     this.wetrService.getStations().subscribe((res => {
       this.tableDataSource = new MatTableDataSource(res);
       // sets paginator for data table
       this.tableDataSource.paginator = this.paginator;
     }));    
  }

  applyFilter(filterValue: string) {
    this.tableDataSource.filter = filterValue.trim().toLowerCase();
  }
}
