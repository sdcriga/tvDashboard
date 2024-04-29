import { HttpClient, HttpErrorResponse, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Important } from '../_interface/important';
import { CustomHttpResponse } from '../_interface/customhttp';
import { Observable, catchError, tap, throwError } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class DataSaveService {
  //  private readonly server: string = 'http://localhost';
 private readonly server: string = 'http://screen.local';
// private readonly server: string = 'http://127.0.0.1';

  constructor(private http: HttpClient) {}
  
  // getImportantData() {
  //   return this.http.get(`${this.server}/screen/create/important`);
  // }


  newImportant$(belowInfo: Important): Observable<CustomHttpResponse<Important>> {
    const httpOptions = {
      headers: new HttpHeaders({'Content-Type': 'application/json'})
    }
    return this.http.post<CustomHttpResponse<Important>>(
      `${this.server}/api/create/important`,
      belowInfo, httpOptions
    ).pipe(
      tap(console.log),
      catchError(this.handleError)
    );
  }

  private handleError(error: HttpErrorResponse): Observable<never> {
    console.log(error);
    let errorMessage: string;
    if (error.error instanceof ErrorEvent) {
      errorMessage = `A client error occurred - ${error.error.message}`;
    } else {
      if (error.error.reason) {
        errorMessage = error.error.reason;
        console.log(errorMessage);
      } else {
        errorMessage = `An error occurred - Error status ${error.status}`;
      }
    }
    return throwError(() => errorMessage);
  }
}
