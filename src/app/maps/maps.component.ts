import { Component, OnInit, Input } from '@angular/core';
import { Station } from '../shared/station';

@Component({
  selector: 'wetr-maps',
  templateUrl: './maps.component.html',
  styleUrls: ['./maps.component.css']
})
export class MapsComponent implements OnInit {

  @Input() station: Station;

  constructor() { }

  ngOnInit() {
  }

}
