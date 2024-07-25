import { HttpInterceptor, HttpRequest, HttpHandler, HttpEvent, HttpResponse, HttpErrorResponse } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { BehaviorSubject, Observable, catchError, throwError, switchMap, take, filter } from "rxjs";
import { Key } from "src/enum/key.enum";
import { CustomHttpResponse } from "../_interface/customhttp";
import { Profile } from "../_interface/profile";
import { LoginService } from "../_service/login.service";

@Injectable()
export class TokenInterceptor implements HttpInterceptor {
    private isTokenRefreshing: boolean = false;
    private refreshTokenSubject: BehaviorSubject<CustomHttpResponse<Profile>> = new BehaviorSubject(null);
  
    constructor(private loginService: LoginService) {}
  
    intercept(request: HttpRequest<unknown>, next: HttpHandler): Observable<HttpEvent<unknown>> | Observable<HttpResponse<unknown>>{
      if(request.url.includes('verify') || request.url.includes('login') || request.url.includes('register') 
              || request.url.includes('refresh') || request.url.includes('resetpassword')) {
            return next.handle(request);
        }
      return next.handle(this.addAuthorizationTokenHeader(request, localStorage.getItem(Key.TOKEN)))
        .pipe(
          catchError((error: HttpErrorResponse) => {
            if(error instanceof HttpErrorResponse && error.status === 401 && error.error.reason.includes('expired')) {
              return this.handleRefreshToken(request, next);
            } else {
              return throwError(() => error);
            }
          })
        );
    }

    private handleRefreshToken(
        request: HttpRequest<unknown>,
        next: HttpHandler
      ): Observable<HttpEvent<unknown>> {
        if (!this.isTokenRefreshing) {
          console.log('Refreshing Token...');
          this.isTokenRefreshing = true;
          this.refreshTokenSubject.next(null);
          return this.loginService.refreshToken$().pipe(
            switchMap((response) => {
              console.log('Token Refresh Response:', response);
              this.isTokenRefreshing = false;
              const newAccessToken = response.data.access_token;
              this.refreshTokenSubject.next(response);
              console.log('New Token:', newAccessToken);
              console.log('Sending original request:', request);
              return next.handle(
                this.addAuthorizationTokenHeader(request, newAccessToken)
              );
            }),
            catchError((error) => {
              this.isTokenRefreshing = false;
              console.error('Failed to refresh token:', error);
              return throwError(() => new Error(error));
            })
          );
        } else {
          return this.refreshTokenSubject.pipe(
            filter(token => token != null), 
            take(1), 
            switchMap((response) => {
              return next.handle(
                this.addAuthorizationTokenHeader(request, response.data.access_token)
              );
            })
          );
        }
      }
  
    // private handleRefreshToken(request: HttpRequest<unknown>, next: HttpHandler): Observable<HttpEvent<unknown>> {
    //   if(!this.isTokenRefreshing) {
    //     console.log('Refreshing Token...');
    //     this.isTokenRefreshing = true;
    //     this.refreshTokenSubject.next(null);
    //     return this.loginService.refreshToken$().pipe(
    //       switchMap((response) => {
    //         console.log('Token Refresh Response:', response);
    //         this.isTokenRefreshing = false;
    //         this.refreshTokenSubject.next(response);
    //         console.log('New Token:', response.data.access_token);
    //         console.log('Sending original request:', request);
    //         return next.handle(this.addAuthorizationTokenHeader(request, response.data.access_token))
    //       })
    //     );
    //   } else {
    //     this.refreshTokenSubject.pipe(
    //       switchMap((response) => {
    //         return next.handle(this.addAuthorizationTokenHeader(request, response.data.access_token))
    //       })
    //       )
    //   }
    // }
  
    private addAuthorizationTokenHeader(request: HttpRequest<unknown>, token: string): HttpRequest<any> {
      return request.clone({ setHeaders: { Authorization: `Bearer ${token}` }});
    }
}