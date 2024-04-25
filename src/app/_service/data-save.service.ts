import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Important } from '../_interface/important';
import { CustomHttpResponse } from '../_interface/customhttp';
import { Observable, catchError, tap, throwError } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class DataSaveService {
  // private readonly server: string = 'http://localhost:8080';
  private readonly server: string = 'http://screen.local:8080';

  constructor(private http: HttpClient) {}


  newImportant$(belowInfo: String): Observable<CustomHttpResponse<String>> {
    return this.http.post<CustomHttpResponse<String>>(
      `${this.server}/screen/create/important`,
      belowInfo
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
