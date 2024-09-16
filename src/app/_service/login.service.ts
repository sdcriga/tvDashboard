import { HttpClient, HttpErrorResponse, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { JwtHelperService } from '@auth0/angular-jwt';
import { Observable, tap, catchError, throwError } from 'rxjs';
import { CustomHttpResponse } from '../_interface/customhttp';
import { Profile } from '../_interface/profile';
import { Key } from 'src/enum/key.enum';

@Injectable({
  providedIn: 'root'
})
export class LoginService {

  private readonly server: string = 'http://officescreen.local';

  // private readonly server: string =
  // 'http://localhost:8080';

  private jwtHelper = new JwtHelperService();

  constructor(private http: HttpClient) {}

  login$ = (username: string, password: string) =>
  <Observable<CustomHttpResponse<Profile>>>this.http
  .post<CustomHttpResponse<Profile>>(
    `${this.server}/api/login`, 
    { username, password }, 
    {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
        'Accept': 'application/json'
      })
    }
  )
    .pipe(tap(console.log), catchError(this.handleError));

    profile$ = () =>
    <Observable<CustomHttpResponse<Profile>>>(
      this.http
        .get<CustomHttpResponse<Profile>>(`${this.server}/api/profile`)
        .pipe(tap(console.log), catchError(this.handleError))
    );

    refreshToken$ = () => <Observable<CustomHttpResponse<Profile>>>this.http
    .get<CustomHttpResponse<Profile>>(`${this.server}/api/refresh/token`, {
      headers: new HttpHeaders({
        Authorization: `Bearer ${localStorage.getItem(Key.REFRESH_TOKEN)}`,
        'Accept': 'application/json'
      }),
    })
      .pipe(
        tap((response) => {
          console.log(response);
          localStorage.removeItem(Key.TOKEN);
          localStorage.removeItem(Key.REFRESH_TOKEN);
          localStorage.setItem(Key.TOKEN, response.data.access_token);
          localStorage.setItem(Key.REFRESH_TOKEN, response.data.refresh_token);
        }),
        catchError(this.handleError)
      );

    isAuthenticated = (): boolean =>
    this.jwtHelper.decodeToken<string>(localStorage.getItem(Key.TOKEN)) &&
    !this.jwtHelper.isTokenExpired(localStorage.getItem(Key.TOKEN))
      ? true
      : false;
    

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
