import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, UrlTree, Router } from '@angular/router';
import { Observable } from 'rxjs';
import { AuthService } from 'src/app/services/auth-service/auth.service';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {

  constructor(private readonly authService: AuthService, private readonly router: Router) {}

  canActivate(
    next: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
      const url = state.url;
      const isLoggedIn = this.authService.checkLogin(url);
      if (!isLoggedIn['ok']) {
        this.router.navigate([isLoggedIn['redirectTo']], { queryParams: { redirectTo: url }});
        return false;
      }
      return isLoggedIn['ok'];
  }

  canLoad(
    next: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
      const url = state.url;
      const isLoggedIn = this.authService.checkLogin(url);
      return isLoggedIn['ok'];
  }
}
