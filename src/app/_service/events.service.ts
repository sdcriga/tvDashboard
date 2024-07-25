import { Injectable } from '@angular/core';
import { Events } from '../_interface/events';
import { FavouriteEvents } from '../_interface/favourite-events';
import { HttpClient, HttpErrorResponse, HttpHeaders } from '@angular/common/http';
import { Observable, tap, catchError, throwError } from 'rxjs';
import { CustomHttpResponse } from '../_interface/customhttp';

@Injectable({
  providedIn: 'root'
})
export class EventsService {
   private readonly server: string = 'http://officescreen.local:8080';
  // private readonly server: string = 'http://localhost:8080';

  dataEventsObject: Events[] | null = null;
  favouriteEventsDataObject: FavouriteEvents[] | null = null;
 
   constructor(private http: HttpClient) { }

   newEvent$(events: Events): Observable<CustomHttpResponse<Events>> {
    const httpOptions = {
      headers: new HttpHeaders({'Content-Type': 'application/json'})
    }
    return this.http.post<CustomHttpResponse<Events>>(
      `${this.server}/api/create/event`,
      events, httpOptions
    ).pipe(
      tap(console.log),
      catchError(this.handleError)
    );
  }

  getAllEvents$(): Observable<CustomHttpResponse<Events[]>> {
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


  deleteEvent$(id: number){
    const httpOptions = {
      headers: new HttpHeaders({'Content-Type': 'application/json'})
    };
    return this.http.delete<CustomHttpResponse<Events>>(
      `${this.server}/api/delete/event/${id}`,
      httpOptions
    ).pipe(
      catchError(this.handleError)
    );
  }

  updateEvent$ = (id: number, title: String) =>
  <Observable<CustomHttpResponse<Events>>>(
    this.http
      .patch<CustomHttpResponse<Events>>(
        `${this.server}/api/update/event/${id}`,
        title
      )
      .pipe(tap(console.log), catchError(this.handleError))
  );

  deactivateEvent$ = (id: number) =>
  <Observable<CustomHttpResponse<Events>>>(
    this.http
      .patch<CustomHttpResponse<Events>>(
        `${this.server}/api/deactivate/event/${id}`, {}
      )
      .pipe(tap(console.log), catchError(this.handleError))
  );

  activateEvent$ = (id: number) =>
  <Observable<CustomHttpResponse<Events>>>(
    this.http
      .patch<CustomHttpResponse<Events>>(
        `${this.server}/api/activate/event/${id}`, {}
      )
      .pipe(tap(console.log), catchError(this.handleError))
  );

  saveEventsToFavourites$(event: Events, id: number): Observable<CustomHttpResponse<Events>> {
    const httpOptions = {
      headers: new HttpHeaders({'Content-Type': 'application/json'})
    }
    return this.http.post<CustomHttpResponse<Events>>(
      `${this.server}/api/favourite-save/event/${id}`,
      event, httpOptions
    ).pipe(
      tap(console.log),
      catchError(this.handleError)
    );
  }

  deleteFavouriteEvent$(id: number){
    const httpOptions = {
      headers: new HttpHeaders({'Content-Type': 'application/json'})
    };
    return this.http.delete<CustomHttpResponse<Events>>(
      `${this.server}/api/delete/favourite/event/${id}`,
      httpOptions
    ).pipe(
      catchError(this.handleError)
    );
  }

  getAllFavouriteEvents$(): Observable<CustomHttpResponse<FavouriteEvents[]>> {
    const httpOptions = {
      headers: new HttpHeaders({'Content-Type': 'application/json'})
    };
    return this.http.get<CustomHttpResponse<FavouriteEvents[]>>(
      `${this.server}/api/favourite/events`,
      httpOptions
    ).pipe(
      catchError(this.handleError)
    );
  }

  getAndStoreEventsObject(): void {
    this.getAllEvents$().subscribe({
      next: (response) => {
        console.log('Event list received:', response);
        this.dataEventsObject = response.data["event"]; 
        console.log('Event object:', this.dataEventsObject);
      },
      error: (error) => {
        console.error('Failed to create event:', error);
      }
    });
  }


  getAndStoreEventsObjectAsFavourite(): void {
    this.getAllFavouriteEvents$().subscribe({
      next: (response) => {
        this.favouriteEventsDataObject = response.data["saved"]; 
      },
      error: (error) => {
        console.error('Failed to create event:', error);
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
