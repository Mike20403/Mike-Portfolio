import { Actions, ofType, createEffect } from '@ngrx/effects';
import { catchError, filter, map, of, switchMap, tap } from 'rxjs';
import * as AuthActions from './auth-actions';
import { HttpClient } from '@angular/common/http';

import { Injectable } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
// import { NgSwitchCase } from "@angular/common";
import { User } from './user.model';
import { AppState } from './app-reducers';
import { Store } from '@ngrx/store';
import { environment } from '../../../../environments/environment';
import { AuthService } from '../../../services/auth.services';

export interface AuthResponse {
  kind: string;
  displayName: string;
  registered: boolean;
  idToken: string;
  email: string;
  refreshToken: string;
  expiresIn: string;
  localId: string;
}

const handleAuth = (
  email: string,
  id: string,
  token: string,
  expiresIn: string
) => {
  const expirationDate = new Date(new Date().getTime() + +expiresIn * 1000);
  const user: User = new User(email, id, token, expirationDate);
  localStorage.setItem('userData', JSON.stringify(user));
  return new AuthActions.AuthSuccess({
    email: email,
    id: id,
    token: token,
    ExpirationDate: expirationDate,
  });
};
const handleError = (error: any) => {
  console.log('[Auth Effect]: ', error);
  let message: string = '';
  switch (error.error.error.message) {
    case 'EMAIL_EXISTS': {
      message = 'The email has already been registered!';
      break;
    }
    case 'TOO_MANY_ATTEMPTS_TRY_LATER': {
      message = 'Too many attempts!!';
      break;
    }
    case 'EMAIL_NOT_FOUND': {
      message = 'Email not found!';
      break;
    }
    case 'INVALID_PASSWORD': {
      message = 'Invalid password!';
      break;
    }
    default:
      message = 'Authentication fail!';
  }

  console.log('[Auth Effect]: ', message);
  return of(new AuthActions.AuthFail(message));
};
@Injectable()
export class AuthEffects {
  autoLogin$ = createEffect(() =>
    this.actions$.pipe(
      ofType(AuthActions.actionTypes.AUTO_LOGIN),
      map(() => {
        const userData: {
          email: string;
          id: string;
          _token: string;
          _tokenExpirationDate: string;
        } = JSON.parse(localStorage.getItem('userData') || '{}');

        if (userData) {
          const loadedUser = new User(
            userData.email,
            userData.id,
            userData._token,
            new Date(userData._tokenExpirationDate)
          );

          if (loadedUser.token) {
            // this.user.next(loadedUser);
            const expirationDuration =
              new Date(userData._tokenExpirationDate).getTime() -
              new Date().getTime();
            // this.autoLogout(expirationDuration)
            this.authService.setAutologoutTimer(expirationDuration);
            return new AuthActions.AuthSuccess({
              email: loadedUser.email,
              id: loadedUser.id,
              token: loadedUser.token,
              ExpirationDate: new Date(userData._tokenExpirationDate),
            });
          }
        }

        return;
      }),
      filter(Boolean)
    )
  );

  authLogin$ = createEffect(() =>
    this.actions$.pipe(
      ofType(AuthActions.actionTypes.LOGIN_START),
      switchMap((authData: AuthActions.LoginStart) => {
        return this.http
          .post<AuthResponse>(
            'https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=' +
              environment.firebase.apiKey,
            {
              email: authData.payload.email,
              password: authData.payload.password,
              returnSecureToken: true,
            }
          )
          .pipe(
            tap((resData) => {
              this.authService.setAutologoutTimer(+resData.expiresIn * 1000);
            }),
            map((resData: AuthResponse) => {
              return handleAuth(
                resData.email,
                resData.localId,
                resData.idToken,
                resData.expiresIn
              );
            }),
            catchError((error) => {
              return handleError(error);
            })
          );
      })
    )
  );
  authRedirect$ = createEffect(
    () =>
      this.actions$.pipe(
        ofType(AuthActions.actionTypes.AUTH_SUCCESS),
        tap(() => {
          console.log('Redirected');
          this.router.navigate(['./admin-dashboard'], {
            relativeTo: this.route,
          });
          console.log('Current URL:', this.router.url);
        })
      ),
    { dispatch: false }
  );

  authLogout$ = createEffect(
    () =>
      this.actions$.pipe(
        ofType(AuthActions.actionTypes.LOGOUT),
        tap(() => {
          this.authService.clearTimer();
          localStorage.removeItem('userData');
          this.router.navigate(['./admin-dashboard/auth'], {
            relativeTo: this.route,
          });
        })
      ),
    { dispatch: false }
  );

  constructor(
    private actions$: Actions,
    private http: HttpClient,
    private router: Router,
    private store: Store<AppState>,
    private authService: AuthService,
    private route: ActivatedRoute
  ) {}
}
