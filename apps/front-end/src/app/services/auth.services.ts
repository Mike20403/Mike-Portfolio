import {Injectable} from "@angular/core";
import {HttpClient} from "@angular/common/http";
import {BehaviorSubject} from "rxjs";
import {User} from "../components/admin-dashboard/admin-auth/user.model";
import {Store} from "@ngrx/store";
import * as fromAuth from '../components/admin-dashboard/admin-auth/auth-reducer'
import * as AuthAction from '../components/admin-dashboard/admin-auth/auth-actions'
@Injectable({
  providedIn: 'root',
})
export class AuthService {
  constructor(private http: HttpClient,
              private store: Store < fromAuth.State > ) {}
  user = new BehaviorSubject < User | null > (null);
  private tokenExpirationTimer: any;
  setAutologoutTimer(expirationDuration: number) {
    this.tokenExpirationTimer = setTimeout(() => {
      this.store.dispatch(new AuthAction.Logout())
    }, expirationDuration)
  }
  clearTimer() {
    if (this.tokenExpirationTimer) {
      clearTimeout(this.tokenExpirationTimer);
      this.tokenExpirationTimer = null;
    }


  }
}
