import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { Station } from './station';
import { environment } from 'src/environments/environment.prod';
import { map, catchError, retry, tap } from 'rxjs/operators';
import { PostCode } from './postcode';
import { Measurement } from './measurement';
import { TypeOfMeasurement } from './typeofmeasurement';

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

  getMeasurementsByStation(stationId: number,fromDate: Date, toDate: Date,
    grouping?: number, typeOfMeasure?: number)
    :Observable<Measurement[]> {

      let url = 
        this.createApiUrl(`stations/${stationId}/measurements?from=${fromDate.toISOString()}&to=${toDate.toISOString()}`);

      if (grouping) {
        url += `&grouping=${grouping}`;
      }

      if (typeOfMeasure) {
        url += `&typeOfMeasureId=${typeOfMeasure}`;
      }

    return this.http.get<Measurement[]>(url)
      .pipe(
        catchError(this.handleError('getMeasurementsByStation', []))
      );
  }

  insertStation(station: Station): Observable<HttpResponse<Station>> {
    return this.http.post<Station>(
      this.createApiUrl('stations'), station, { observe: 'response' });
  }

  updateStation(station: Station) : Observable<HttpResponse<Station>> {
    return this.http.put<Station>(
      this.createApiUrl(`stations/${station.Id}`), station, { observe: 'response'});
  }

  getTypeOfMeasures() : Observable<TypeOfMeasurement[]> {
    return this.http.get<TypeOfMeasurement[]>(this.createApiUrl('typeofmeasures'))
      .pipe(
        catchError(this.handleError('getTypeOfMeasures', [])),
        tap(res => console.log(res))
      );
  }

  insertMeasurement(measurement: Measurement) : Observable<HttpResponse<Measurement>> {
    // remove all 'undefinded' properties with json.parse and json.stringify
    var measurementArray: Measurement[] = [ JSON.parse(JSON.stringify(measurement)) ];
    // rest api needs array, not a single measurement
    return this.http.post(
      this.createApiUrl(`stations/${measurement.StationId}/measurements`),
        measurementArray, { observe: 'response'});   
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