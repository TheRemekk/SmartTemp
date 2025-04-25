import { Injectable } from '@angular/core';
import {
  ActivatedRouteSnapshot,
  CanActivate,
  Router,
  RouterStateSnapshot,
  UrlTree,
} from '@angular/router';
import { catchError, map, Observable, take, of } from 'rxjs';
import { AuthService } from '../services/auth.service';

@Injectable({
  providedIn: 'root',
})
export class AuthGuard implements CanActivate {
  constructor(private authService: AuthService, private router: Router) {}

  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ):
    | Observable<boolean | UrlTree>
    | Promise<boolean | UrlTree>
    | boolean
    | UrlTree {
    return this.authService.isLoggedIn().pipe(
      take(1),
      map((resp) => {
        const isLoggedIn = resp.message;
        console.log(isLoggedIn)
        if (isLoggedIn) {
          return true;
        }
        else {
          this.router.navigate(['/logowanie']);
          return false;
        }
      }),
      catchError(() => {
        this.router.navigate(['/logowanie']);
        return [false];
      })
    );
  }
}
