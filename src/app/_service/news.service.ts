import { HttpClient, HttpErrorResponse, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { News } from '../_interface/news';
import { FavouriteNews } from '../_interface/favourite-news';
import { Observable, Subject, catchError, tap, throwError } from 'rxjs';
import { CustomHttpResponse } from '../_interface/customhttp';

@Injectable({
  providedIn: 'root'
})
export class NewsService {

  //  private readonly server: string = 'http://officescreen.local:8080';
 private readonly server: string = 'http://localhost:8080';
 
 private newsSubject = new Subject<News[]>();
 dataNewsObject: News[] | null = null;
 dataNewsFilteredObject: News[] | null = null;
 favouriteNewsDataObject: FavouriteNews[] | null = null;

  constructor(private http: HttpClient) { }

  newNews$(news: News): Observable<CustomHttpResponse<News>> {
    const httpOptions = {
      headers: new HttpHeaders({'Content-Type': 'application/json'})
    }
    return this.http.post<CustomHttpResponse<News>>(
      `${this.server}/api/create/news`,
      news, httpOptions
    ).pipe(
      tap(console.log),
      catchError(this.handleError)
    );
  }


  getAllNews$(): Observable<CustomHttpResponse<News[]>> {
    const httpOptions = {
      headers: new HttpHeaders({'Content-Type': 'application/json'})
    };
    return this.http.get<CustomHttpResponse<News[]>>(
      `${this.server}/api/news`,
      httpOptions
    ).pipe(
      catchError(this.handleError)
    );
  }

  deleteNews$(id: number){
    const httpOptions = {
      headers: new HttpHeaders({'Content-Type': 'application/json'})
    };
    return this.http.delete<CustomHttpResponse<News>>(
      `${this.server}/api/delete/news/${id}`,
      httpOptions
    ).pipe(
      catchError(this.handleError)
    );
  }

  updateNews$ = (id: number, description: String) =>
  <Observable<CustomHttpResponse<News>>>(
    this.http
      .patch<CustomHttpResponse<News>>(
        `${this.server}/api/update/news/${id}`,
        description
      )
      .pipe(tap(console.log), catchError(this.handleError))
  );

  deactivateNews$ = (id: number) =>
  <Observable<CustomHttpResponse<News>>>(
    this.http
      .patch<CustomHttpResponse<News>>(
        `${this.server}/api/deactivate/news/${id}`, {}
      )
      .pipe(tap(console.log), catchError(this.handleError))
  );

  activateNews$ = (id: number) =>
  <Observable<CustomHttpResponse<News>>>(
    this.http
      .patch<CustomHttpResponse<News>>(
        `${this.server}/api/activate/news/${id}`, {}
      )
      .pipe(tap(console.log), catchError(this.handleError))
  );

  saveNewsToFavourites$(news: News, id: number): Observable<CustomHttpResponse<News>> {
    const httpOptions = {
      headers: new HttpHeaders({'Content-Type': 'application/json'})
    }
    return this.http.post<CustomHttpResponse<News>>(
      `${this.server}/api/favourite-save/news/${id}`,
      news, httpOptions
    ).pipe(
      tap(console.log),
      catchError(this.handleError)
    );
  }


  deleteFavouriteNews$(id: number){
    const httpOptions = {
      headers: new HttpHeaders({'Content-Type': 'application/json'})
    };
    return this.http.delete<CustomHttpResponse<FavouriteNews>>(
      `${this.server}/api/delete/favourite/news/${id}`,
      httpOptions
    ).pipe(
      catchError(this.handleError)
    );
  }

  getAllFavouriteNews$(): Observable<CustomHttpResponse<FavouriteNews[]>> {
    const httpOptions = {
      headers: new HttpHeaders({'Content-Type': 'application/json'})
    };
    return this.http.get<CustomHttpResponse<FavouriteNews[]>>(
      `${this.server}/api/favourite/news`,
      httpOptions
    ).pipe(
      catchError(this.handleError)
    );
  }

  getAndStoreNewsObject(): void {
    this.getAllNews$().subscribe({
      next: (response) => {
        console.log('News list received:', response);
        this.dataNewsObject = response.data["news"]; 
        this.dataNewsFilteredObject = this.dataNewsObject?.filter(news => news.active === true) || null;
        console.log('Filtered News object:', this.dataNewsFilteredObject);
        console.log('News object:', this.dataNewsObject);
      },
      error: (error) => {
        console.error('Failed to create news:', error);
      }
    });
  }


  getAndStoreNewsObjectAsFavourite(): void {
    this.getAllFavouriteNews$().subscribe({
      next: (response) => {
        this.dataNewsObject = response.data["saved"]; 
      },
      error: (error) => {
        console.error('Failed to create news:', error);
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
