import * as fromAuth from './auth-reducer';
import { ActionReducerMap } from '@ngrx/store';
import * as fromPosts from '../../blog-page/Post/post.reducer';

export interface AppState {
  auth: fromAuth.State;
  posts: fromPosts.PostState;
}
export const AppReducers: ActionReducerMap<AppState> = {
  auth: fromAuth.authReducer,
  posts: fromPosts.PostsReducer,
};
