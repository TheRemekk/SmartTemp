import { Injectable } from '@angular/core';
import {ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot, UrlTree} from '@angular/router';
import {catchError, map, Observable, take} from 'rxjs';
import {AuthService} from "../services/auth.service";

@Injectable({
  providedIn: 'root'
})
export class UnauthGuard implements CanActivate {
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
          this.router.navigate(['/home']); // Przekierowanie np. na stronę główną
          return false;
        }
        else {
          return true;
        }
      }),
      catchError(() => {
        return [true];
      })
    );
  }
}
