import { Injectable } from '@angular/core';
import {
  ActivatedRouteSnapshot,
  CanActivate,
  Router,
  RouterStateSnapshot,
  UrlTree,
} from '@angular/router';
import { Store } from '@ngrx/store';
import { map, Observable, take } from 'rxjs';
import { AppState } from './app-reducers';

@Injectable({
  providedIn: 'root',
})
export class AuthGuard implements CanActivate {
  constructor(private router: Router, private store: Store<AppState>) {}
  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ):
    | boolean
    | UrlTree
    | Observable<boolean | UrlTree>
    | Promise<boolean | UrlTree> {
    return this.store.select('auth').pipe(
      take(1),
      map((user) => {
        console.log('[AuthGuard] User: ', user);
        const isAuth = !!user.user;
        console.log('isAuth: ', isAuth);
        if (isAuth) {
          return true;
        }
        return this.router.createUrlTree(['admin-dashboard/auth']);
      })
    );
  }
}
