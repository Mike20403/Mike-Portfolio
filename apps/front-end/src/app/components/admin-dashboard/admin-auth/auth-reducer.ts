import { User } from './user.model';
import * as Authactions from './auth-actions';

export interface State {
  user: User | null;
  authError: string | null;
  loading: boolean;
  actionType: string | null;
}
const initialState: State = {
  user: null,
  authError: null,
  loading: false,
  actionType: null,
};

export function authReducer(state: State = initialState, action: any) {
  switch (action.type) {
    case Authactions.actionTypes.AUTH_SUCCESS:
      const user = new User(
        action.payload.email,
        action.payload.id,
        action.payload.token,
        action.payload.ExpirationDate
      );
      return {
        ...state,
        user: user,
        authError: null,
        loading: false,
        actionType: 'AUTH SUCCESS',
      };
    case Authactions.actionTypes.LOGOUT:
      return { ...state, user: null, authError: null, actionType: 'LOGOUT' };
    case Authactions.actionTypes.LOGIN_START:
      return {
        ...state,
        authError: null,
        loading: true,
        actionType: 'LOGIN START',
      };
    case Authactions.actionTypes.AUTH_FAIL:
      return {
        ...state,
        user: null,
        authError: action.payload,
        loading: false,
        actionType: 'AUTH FAIL',
      };
    default:
      return state;
  }
}
