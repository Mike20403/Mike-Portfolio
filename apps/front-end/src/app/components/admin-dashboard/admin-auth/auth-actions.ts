import { Action } from '@ngrx/store';

export enum actionTypes {
  AUTH_SUCCESS = 'AUTH SUCCESS',
  LOGOUT = 'LOGOUT',
  LOGIN_START = 'LOGIN START',
  AUTO_LOGIN = 'AUTO LOGIN',
  AUTH_FAIL = 'AUTH FAIL',
}

export class AuthSuccess implements Action {
  type: string = actionTypes.AUTH_SUCCESS;
  constructor(
    public payload: {
      email: string;
      id: string;
      token: string;
      ExpirationDate: Date;
    }
  ) {}
}
export class AuthFail implements Action {
  type: string = actionTypes.AUTH_FAIL;
  constructor(public payload: string) {}
}

export class LoginStart implements Action {
  type: string = actionTypes.LOGIN_START;
  constructor(public payload: { email: string; password: string }) {}
}

export class Logout implements Action {
  readonly type: string = actionTypes.LOGOUT;
}
export class AutoLogin implements Action {
  readonly type: string = actionTypes.AUTO_LOGIN;
}
export type AuthActions =
  | AutoLogin
  | AuthSuccess
  | Logout
  | LoginStart
  | AuthFail;
