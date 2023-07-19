import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import {
  catchError,
  throwError,
  switchMap,
  map,
  of,
  mergeMap,
  forkJoin,
} from 'rxjs';
import { Post } from '../modals/post';
import * as PostActions from './post.actions';
import {PostService} from "./post.service";

@Injectable()
export class PostEffects {
  constructor(private action$: Actions, private http: HttpClient,
              private postService:PostService) {}
  postFetch$ = createEffect(() =>
    this.action$.pipe(
      ofType(PostActions.ActionTypes.FETCH_POSTS),
      switchMap(() => {
        return this.http.get<Post[]>(
          'https://myblog-8266d-default-rtdb.asia-southeast1.firebasedatabase.app/Posts.json'
        );
      }),
      map((posts: Post[]) => {
        if (posts) {
          return Object.values(posts);
        }
        return;
      }),
      catchError((error) => {
        console.log(error);
        return throwError(error);
      }),
      map((posts: any) => {
        return new PostActions.SetPosts(posts ? posts : ([] as Post[]));
      })
    )
  );
  postAdd$ = createEffect(() =>
    this.action$.pipe(
      ofType(PostActions.ActionTypes.ADD_POSTS),
      switchMap((action: any) => {
        console.log('Payload: ', action.payload);

        return this.http.post<Post>(
          'https://myblog-8266d-default-rtdb.asia-southeast1.firebasedatabase.app/Posts.json',
          action.payload
        );
      }),
      map((posts: any) => ({ type: '[Post] Add post successful' }))
    )
  );
  postUpdate$ = createEffect(() =>
    this.action$.pipe(
      ofType(PostActions.ActionTypes.UPDATE_POSTS),
      switchMap((action: any) =>
        this.http
          .get<any>(
            `https://myblog-8266d-default-rtdb.asia-southeast1.firebasedatabase.app/Posts.json`
          )
          .pipe(
            map((data: any) => {
              const filteredKeys = Object.keys(data).find(
                (key) => data[key]['_id'] === action.payload.id
              );
              const key: string = filteredKeys!.toString();
              const updatePost = { [key]: { ...action.payload.post } };
              return this.http.patch(
                `https://myblog-8266d-default-rtdb.asia-southeast1.firebasedatabase.app/Posts/${key}.json`,
                action.payload.post
              );
            }),
            switchMap((rq) => {
              console.log('Updated');
              return rq.pipe(
                map(() => ({ type: '[Post] Delete Successful' })),
                catchError((error) =>
                  of({ type: '[Post] Delete Error', error })
                )
              );
            })
          )
      )
    )
  );

  postDelete$ = createEffect(() =>
    this.action$.pipe(
      ofType(PostActions.ActionTypes.DELETE_POSTS),
      mergeMap((action: any) =>
        this.http
          .get<any>(
            `https://myblog-8266d-default-rtdb.asia-southeast1.firebasedatabase.app/Posts.json`
          )
          .pipe(
            map((data: any) => {
              const filteredKeys = Object.keys(data).filter(
                (key) => data[key]['_id'] === action.payload
              );
              return filteredKeys.map((key) => {
                this.postService.deleteImagesFromStorage(this.postService.getEditorImageUrls(data[key]));
                return this.http.delete(
                  `https://myblog-8266d-default-rtdb.asia-southeast1.firebasedatabase.app/Posts/${key}.json`
                )
                }

              );
            }),
            mergeMap((deleteRequests) => {
              console.log(deleteRequests);
              if (deleteRequests.length === 0) {
                return of({ type: '[Post] No Items Found' });
              }
              return forkJoin(deleteRequests).pipe(
                map(() => ({ type: '[Post] Delete Successful' })),
                catchError((error) =>
                  of({ type: '[Post] Delete Error', error })
                )
              );
            })
          )
      )
    )
  );
}
