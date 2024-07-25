import { Injectable } from "@angular/core";
import { Router, ActivatedRouteSnapshot, RouterStateSnapshot } from "@angular/router";
import { LoginService } from "../_service/login.service";

@Injectable({
    providedIn: 'root',
  })
  export class AuthenticationGuard {
    constructor(private loginService: LoginService, private router: Router) {}
  
    canActivate(
      routeSnapShot: ActivatedRouteSnapshot,
      state: RouterStateSnapshot
    ): boolean {
      return this.isAuthenticated();
    }
    private isAuthenticated(): boolean {
      if (this.loginService.isAuthenticated()) {
        return true;
      } else {
        this.router.navigate(['/login']);
        return false;
      }
    }
  }