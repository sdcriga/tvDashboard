import { HttpClient, HttpErrorResponse, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, tap, catchError, throwError } from 'rxjs';
import { CustomHttpResponse } from '../_interface/customhttp';
import { Important } from '../_interface/important';
import { FavouriteImportant } from '../_interface/favourite-important';

@Injectable({
  providedIn: 'root'
})
export class ImportantService {
    //  private readonly server: string = 'http://officescreen.local:8080';
    private readonly server: string = 'http://officescreen.local';
//  private readonly server: string = 'http://localhost:8080';

 dataObject: Important[] | null = null;
 dataImportantFilteredObject: Important[] | null = null;
 favouritesDataObject: FavouriteImportant[] | null = null;

  constructor(private http: HttpClient) { }

  newImportant$(important: Important): Observable<CustomHttpResponse<Important>> {
    const httpOptions = {
      headers: new HttpHeaders({'Content-Type': 'application/json'})
    }
    return this.http.post<CustomHttpResponse<Important>>(
      `${this.server}/api/create/important`,
      important, httpOptions
    ).pipe(
      tap(console.log),
      catchError(this.handleError)
    );
  }

  getAllImportant$(): Observable<CustomHttpResponse<Important[]>> {
    const httpOptions = {
      headers: new HttpHeaders({'Content-Type': 'application/json'})
    };
    return this.http.get<CustomHttpResponse<Important[]>>(
      `${this.server}/api/important`,
      httpOptions
    ).pipe(
      catchError(this.handleError)
    );
  }

  deleteImportant$(id: number){
    const httpOptions = {
      headers: new HttpHeaders({'Content-Type': 'application/json'})
    };
    return this.http.delete<CustomHttpResponse<Important>>(
      `${this.server}/api/delete/important/${id}`,
      httpOptions
    ).pipe(
      catchError(this.handleError)
    );
  }

  updateImportant$ = (id: number, description: String) =>
  <Observable<CustomHttpResponse<Important>>>(
    this.http
      .patch<CustomHttpResponse<Important>>(
        `${this.server}/api/update/important/${id}`,
        description
      )
      .pipe(tap(console.log), catchError(this.handleError))
  );

  deactivateImportant$ = (id: number) =>
  <Observable<CustomHttpResponse<Important>>>(
    this.http
      .patch<CustomHttpResponse<Important>>(
        `${this.server}/api/deactivate/important/${id}`, {}
      )
      .pipe(tap(console.log), catchError(this.handleError))
  );

  activateImportant$ = (id: number) =>
  <Observable<CustomHttpResponse<Important>>>(
    this.http
      .patch<CustomHttpResponse<Important>>(
        `${this.server}/api/activate/important/${id}`, {}
      )
      .pipe(tap(console.log), catchError(this.handleError))
  );

  saveImportantToFavourites$(important: Important, id: number): Observable<CustomHttpResponse<Important>> {
    const httpOptions = {
      headers: new HttpHeaders({'Content-Type': 'application/json'})
    }
    return this.http.post<CustomHttpResponse<Important>>(
      `${this.server}/api/save/important/${id}`,
      important, httpOptions
    ).pipe(
      tap(console.log),
      catchError(this.handleError)
    );
  }

  getAllFavouriteImportant$(): Observable<CustomHttpResponse<FavouriteImportant[]>> {
    const httpOptions = {
      headers: new HttpHeaders({'Content-Type': 'application/json'})
    };
    return this.http.get<CustomHttpResponse<FavouriteImportant[]>>(
      `${this.server}/api/favourite/important`,
      httpOptions
    ).pipe(
      catchError(this.handleError)
    );
  }

  getAndStoreImportantObjectAsFavourite(): void {
    this.getAllFavouriteImportant$().subscribe({
      next: (response) => {
        this.favouritesDataObject = response.data["saved"]; 
      },
      error: (error) => {
        console.error('Failed to create important:', error);
      }
    });
  }

  getAndStoreImportantObject(): void {
    this.getAllImportant$().subscribe({
      next: (response) => {
        console.log('Important received:', response);
        this.dataObject = response.data["important"]; 
        this.dataImportantFilteredObject = this.dataObject?.filter(important => important.active === true) || null;
        console.log('Filtered important object:', this.dataImportantFilteredObject);
        console.log('Important object:', this.dataObject);
      },
      error: (error) => {
        console.error('Failed to create important:', error);
      }
    });
  }

  deleteFavouriteImportant$(id: number){
    const httpOptions = {
      headers: new HttpHeaders({'Content-Type': 'application/json'})
    };
    return this.http.delete<CustomHttpResponse<FavouriteImportant>>(
      `${this.server}/api/delete/favourite/important/${id}`,
      httpOptions
    ).pipe(
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
