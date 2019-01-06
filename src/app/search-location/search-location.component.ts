import { Component, OnInit } from '@angular/core';
import { WetrRestClientService } from '../shared/wetr-rest-client.service';
import { Observable, Subject } from 'rxjs';
import { debounceTime, distinctUntilChanged, switchMap } from 'rxjs/operators';

@Component({
  selector: 'wetr-search-location',
  templateUrl: './search-location.component.html',
  styleUrls: ['./search-location.component.css']
})
export class SearchLocationComponent implements OnInit {

  locations$: Observable<any[]>;
  private searchTerms = new Subject<string>();

  constructor(private wetrService: WetrRestClientService) { }

  ngOnInit() {
    this.locations$ = this.searchTerms.pipe(
      // wait 300ms after each keystroke before considering the term
      debounceTime(300),
 
      // ignore new term if same as previous term
      distinctUntilChanged(),
 
      // switch to new search observable each time the term changes
      switchMap((term: string) => this.wetrService.searchLocations(term)),
    );
  }

  // Push a search term into the observable stream.
  search(term: string) : void {
    this.searchTerms.next(term);
  }

}
