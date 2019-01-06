import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { Station } from './station';
import { environment } from 'src/environments/environment.prod';
import { map, catchError, retry, tap } from 'rxjs/operators';

const API_BASE_URL: string = `${environment.server}`;

@Injectable({
  providedIn: 'root'
})
export class WetrRestClientService {
  searchLocations(term: string): any {
    throw new Error("Method not implemented.");
  }

  constructor(private http: HttpClient) { }

  getStations() : Observable<Station[]> {
    return this.http.get<Station[]>(this.createApiUrl('stations'))
      .pipe(catchError(this.handleError('getStations', [])), tap(res => console.log(res)));
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