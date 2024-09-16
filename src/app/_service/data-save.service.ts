import { HttpClient, HttpErrorResponse, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';

import { CustomHttpResponse } from '../_interface/customhttp';
import { Observable, catchError, tap, throwError } from 'rxjs';
import { Important } from '../_interface/important';
import { FavouriteImportant } from '../_interface/favourite-important';
import { Events } from '../_interface/events';

@Injectable({
  providedIn: 'root',
})
export class DataSaveService {
 private readonly server: string = 'http://officescreen.local:8080';
//  private readonly server: string = 'http://localhost:8080';

 dataObject: Important[] | null = null;
 dataEventsObject: Events[] | null = null;
 favouritesDataObject: FavouriteImportant[] | null = null;

  constructor(private http: HttpClient) {}

  newEvent$(event: Events): Observable<CustomHttpResponse<Events>> {
    const httpOptions = {
      headers: new HttpHeaders({'Content-Type': 'application/json'})
    }
    return this.http.post<CustomHttpResponse<Events>>(
      `${this.server}/api/create/event`,
      event, httpOptions
    ).pipe(
      tap(console.log),
      catchError(this.handleError)
    );
  }

  getAllEventInformation$(): Observable<CustomHttpResponse<Events[]>> {
    const httpOptions = {
      headers: new HttpHeaders({'Content-Type': 'application/json'})
    };
    return this.http.get<CustomHttpResponse<Events[]>>(
      `${this.server}/api/events`,
      httpOptions
    ).pipe(
      catchError(this.handleError)
    );
  }

  getAndStoreEventObject(): void {
    this.getAllEventInformation$().subscribe({
      next: (response) => {
        console.log('Events list received:', response);
        this.dataEventsObject = response.data["events"]; 
        console.log('Events object:', this.dataEventsObject);
      },
      error: (error) => {
        console.error('Failed to create Event:', error);
      }
    });
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
