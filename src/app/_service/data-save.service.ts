import { HttpClient, HttpErrorResponse, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';

import { CustomHttpResponse } from '../_interface/customhttp';
import { Observable, catchError, tap, throwError } from 'rxjs';
import { BelowInfo } from '../_interface/belowinfo';
import { SavedBelowInfo } from '../_interface/savedinfo';
import { Events } from '../_interface/events';
import { MidInfo } from '../_interface/midinfo';

@Injectable({
  providedIn: 'root',
})
export class DataSaveService {
 private readonly server: string = 'http://raspberrypi5.local:8080';
//  private readonly server: string = 'http://localhost:8080';

 dataObject: BelowInfo[] | null = null;
 dataEventsObject: Events[] | null = null;
 dataMainObject: MidInfo[] | null = null;
 favouritesDataObject: SavedBelowInfo[] | null = null;

  constructor(private http: HttpClient) {}
  

  newImportant$(belowInfo: BelowInfo): Observable<CustomHttpResponse<BelowInfo>> {
    const httpOptions = {
      headers: new HttpHeaders({'Content-Type': 'application/json'})
    }
    return this.http.post<CustomHttpResponse<BelowInfo>>(
      `${this.server}/api/create/important`,
      belowInfo, httpOptions
    ).pipe(
      tap(console.log),
      catchError(this.handleError)
    );
  }

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

  newMain$(main: MidInfo): Observable<CustomHttpResponse<MidInfo>> {
    const httpOptions = {
      headers: new HttpHeaders({'Content-Type': 'application/json'})
    }
    return this.http.post<CustomHttpResponse<MidInfo>>(
      `${this.server}/api/create/main`,
      main, httpOptions
    ).pipe(
      tap(console.log),
      catchError(this.handleError)
    );
  }

  saveImportant$(belowInfo: BelowInfo, id: number): Observable<CustomHttpResponse<BelowInfo>> {
    const httpOptions = {
      headers: new HttpHeaders({'Content-Type': 'application/json'})
    }
    return this.http.post<CustomHttpResponse<BelowInfo>>(
      `${this.server}/api/save/important/${id}`,
      belowInfo, httpOptions
    ).pipe(
      tap(console.log),
      catchError(this.handleError)
    );
  }


  getAllImportantInformation$(): Observable<CustomHttpResponse<BelowInfo[]>> {
    const httpOptions = {
      headers: new HttpHeaders({'Content-Type': 'application/json'})
    };
    return this.http.get<CustomHttpResponse<BelowInfo[]>>(
      `${this.server}/api/important`,
      httpOptions
    ).pipe(
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


  getAllMainInformation$(): Observable<CustomHttpResponse<MidInfo[]>> {
    const httpOptions = {
      headers: new HttpHeaders({'Content-Type': 'application/json'})
    };
    return this.http.get<CustomHttpResponse<MidInfo[]>>(
      `${this.server}/api/main`,
      httpOptions
    ).pipe(
      catchError(this.handleError)
    );
  }

  getAllSavedImportantInformation$(): Observable<CustomHttpResponse<SavedBelowInfo[]>> {
    const httpOptions = {
      headers: new HttpHeaders({'Content-Type': 'application/json'})
    };
    return this.http.get<CustomHttpResponse<SavedBelowInfo[]>>(
      `${this.server}/api/saved/important`,
      httpOptions
    ).pipe(
      catchError(this.handleError)
    );
  }


  deleteInformation$(id: number){
    const httpOptions = {
      headers: new HttpHeaders({'Content-Type': 'application/json'})
    };
    return this.http.delete<CustomHttpResponse<BelowInfo>>(
      `${this.server}/api/delete/important/${id}`,
      httpOptions
    ).pipe(
      catchError(this.handleError)
    );
  }

  deleteFavouriteInformation$(id: number){
    const httpOptions = {
      headers: new HttpHeaders({'Content-Type': 'application/json'})
    };
    return this.http.delete<CustomHttpResponse<BelowInfo>>(
      `${this.server}/api/delete/favourite/${id}`,
      httpOptions
    ).pipe(
      catchError(this.handleError)
    );
  }

  updateInformation$ = (id: number, description: String) =>
  <Observable<CustomHttpResponse<BelowInfo>>>(
    this.http
      .patch<CustomHttpResponse<BelowInfo>>(
        `${this.server}/api/update/important/${id}`,
        description
      )
      .pipe(tap(console.log), catchError(this.handleError))
  );


  getAndStoreBelowObject(): void {
    this.getAllImportantInformation$().subscribe({
      next: (response) => {
        console.log('BelowInfo received:', response);
        this.dataObject = response.data["important"]; 
        console.log('BelowInfo object:', this.dataObject);
      },
      error: (error) => {
        console.error('Failed to create BelowInfo:', error);
      }
    });
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

  getAndStoreSavedBelowObject(): void {
    this.getAllSavedImportantInformation$().subscribe({
      next: (response) => {
        this.favouritesDataObject = response.data["saved"]; 
      },
      error: (error) => {
        console.error('Failed to create BelowInfo:', error);
      }
    });
  }


  getAndStoreMainObject(): void {
    this.getAllMainInformation$().subscribe({
      next: (response) => {
        console.log('Main list received:', response);
        this.dataMainObject = response.data["main"]; 
        console.log('Main object:', this.dataMainObject);
      },
      error: (error) => {
        console.error('Failed to create Main:', error);
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
