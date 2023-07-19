import {Injectable} from "@angular/core";
import {ActivatedRouteSnapshot, Resolve, RouterStateSnapshot} from "@angular/router";
import {Post} from "../modals/post";
import {Store} from "@ngrx/store";
import {AppState} from "../../admin-dashboard/admin-auth/app-reducers";
import {Actions, ofType} from "@ngrx/effects";
import {map, of, switchMap, take} from "rxjs";
import * as PostAction from '../Post/post.actions'
@Injectable({
  providedIn: 'root'
})

export class PostResolverService implements Resolve < Post[] > {

  constructor(

              private store: Store < AppState > ,
              private action$: Actions) {

  }
  resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): any {


    return this.store.select('posts').pipe(
      take(1),
      map((state:any) => {
        return state.posts;
      }),
      switchMap(posts => {

        if (posts.length == 0) {
          this.store.dispatch(new PostAction.FetchPosts());

          return of(posts);
        } else {
          console.log("[Post Resolver]: ", posts);
          return of(posts);
        }
      }))




  }

}
