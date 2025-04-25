import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { AuthService } from '../../core/services/auth.service';
import * as AuthActions from './auth.actions';
import { catchError, EMPTY, map, of, switchMap } from 'rxjs';
import { Router } from '@angular/router';
import { NotifierService } from 'angular-notifier';

@Injectable()
export class AuthEffects {
  login$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(AuthActions.login),
      switchMap((action) => {
        return this.authService.login(action.loginData).pipe(
          map((user) => {
            this.router.navigate(['/home']);
            this.notifierService.notify('success', 'Poprawnie zalogowano się!');
            return AuthActions.loginSuccess({ user: { ...user } });
          }),
          catchError((err) => {
            let errorMessage: string;
            if (err.error?.message) {
              errorMessage = err.error.message;
            } else {
              errorMessage = 'Wystąpił nieznany błąd. Skontaktuj się z administratorem.';
            }

            this.notifierService.notify('error', errorMessage);
            return of(AuthActions.loginFailure({ error: errorMessage }));
          })
        );
      })
    );
  });

  logout$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(AuthActions.logout),
      switchMap(() => {
        return this.authService.logout().pipe(
          map(() => {
            this.router.navigate(['/logowanie']);
            this.notifierService.notify('success', 'Wylogowano się.');
            return AuthActions.logoutSuccess();
          }),
          catchError((err) => {
            let errorMessage: string;
            if (err.error?.message) {
              errorMessage = err.error.message;
            } else {
              errorMessage = 'Wystąpił nieznany błąd. Skontaktuj się z administratorem.';
            }

            this.notifierService.notify('error', errorMessage);
            return of(AuthActions.logoutFailure());
          })
        );
      })
    );
  });

  register$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(AuthActions.register),
      switchMap((action) => {
        return this.authService.register(action.registerData).pipe(
          map((user) => {
            this.router.navigate(['/logowanie']);
            this.notifierService.notify(
              'success',
              'Poprawnie utworzono konto użytkownika!'
            );
            return AuthActions.registerSuccess();
          }),
          catchError((err) => {
            let errorMessage: string;
            if (err.status === 400) {
              errorMessage = 'Użytkownik o podanej nazwie już istnieje.';
            } else {
              errorMessage = 'Wystąpił nieznany błąd. Skontaktuj się z administratorem.';
            }

            this.notifierService.notify('error', errorMessage);
            return of(AuthActions.loginFailure({ error: errorMessage }));
          })
        );
      })
    );
  });

  autoLogin$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(AuthActions.autoLogin),
      switchMap(() => {
        return this.authService.autoLogin().pipe(
          map((user) => {
            return AuthActions.autoLoginSuccess({ user: { ...user } });
          }),
          catchError((err) => {
            let errorMessage: string;
            if (err.error?.message) {
              errorMessage = err.error.message;
            } else {
              errorMessage = 'Wystąpił nieznany błąd. Skontaktuj się z administratorem.';
            }

            this.notifierService.notify('error', errorMessage);
            return of(AuthActions.autoLoginFailure());
          })
        );
      })
    );
  });

  constructor(
    private actions$: Actions,
    private authService: AuthService,
    private router: Router,
    private notifierService: NotifierService
  ) {}
}
