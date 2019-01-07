import { Component, OnInit } from '@angular/core';
import { WetrRestClientService } from '../shared/wetr-rest-client.service';
import { Observable, Subject } from 'rxjs';
import { debounceTime, distinctUntilChanged, switchMap, tap } from 'rxjs/operators';
import { PostCode } from '../shared/postcode';
import { Router } from '@angular/router';

@Component({
  selector: 'wetr-search-location',
  templateUrl: './search-location.component.html',
  styleUrls: ['./search-location.component.css']
})
export class SearchLocationComponent implements OnInit {

  locations$: Observable<PostCode[]>;
  private searchTerms = new Subject<string>();
  inputValue: string = '';

  constructor(private wetrService: WetrRestClientService,
              private router: Router) { }

  ngOnInit() : void {
    this.locations$ = this.searchTerms
    .pipe(
      debounceTime(300),
      distinctUntilChanged(),
      switchMap((term: string) => this.wetrService.searchLocation(term))
    )
  }

  // Push a search term into the observable stream.
  search(term: string) : void {
    if (term !== '') {
      this.searchTerms.next(term)
    }
  }

  // gets called after a click on a location in the search result
  navigateTo(location : PostCode) : void {
    this.router.navigateByUrl(`/stations?postCode=${location.Code}`);
    this.inputValue = '';
  }

}
