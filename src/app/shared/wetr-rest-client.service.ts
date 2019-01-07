import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { Station } from './station';
import { environment } from 'src/environments/environment.prod';
import { map, catchError, retry, tap } from 'rxjs/operators';
import { PostCode } from './postcode';

const API_BASE_URL: string = `${environment.server}`;

@Injectable({
  providedIn: 'root'
})
export class WetrRestClientService {
  constructor(private http: HttpClient) { }

  getStations() : Observable<Station[]> {
    return this.http.get<Station[]>(this.createApiUrl('stations'))
      .pipe(
        catchError(this.handleError('getStations', []))
        );
  }

  getStationById(id: number): Observable<Station> {
    return this.http.get<Station>(this.createApiUrl(`stations/${id}`))
      .pipe(
        catchError(this.handleError('getStationById', null))
        );
  }

  getStationByPostCode(postCode: string): Observable<Station[]> {
    return this.http.get<Station[]>(
      this.createApiUrl(`stations?postCode=${postCode}`))
        .pipe(
          catchError(this.handleError('getStationByPostCode', []))
        );
  }

  searchLocation(searchTerm : string) : Observable<PostCode[]> { 
    return this.http.get<PostCode[]>(
      this.createApiUrl(`location?searchterm=${searchTerm}`))
        .pipe(
          catchError(this.handleError('searchLocation', []))
          );
  }



  private createApiUrl(apiPath: string) : string {
    return `${API_BASE_URL}${apiPath}`;
  }

  private handleError<T> (operation = 'operation', result?: T) {
    return (error: any): Observable<T> => {
      console.error(error);
      console.log(`${operation} failed: ${error.message}`);
      // Let the app keep running by returning an empty result.
      return of(result as T);
    };
  }
}