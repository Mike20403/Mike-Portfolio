import {Action} from "@ngrx/store";
import {Post} from "../modals/post";


export enum ActionTypes {
  ADD_POSTS ='ADD POSTS',
  DELETE_POSTS = 'DELETE POSTS',
  FETCH_POSTS = 'FETCH POSTS',
  GET_POSTS = 'GET POSTS',
  SET_POSTS = 'SET POST',
  UPDATE_POSTS ='UPDATE POST'

}

export  class AddPosts implements Action {
  type: string = ActionTypes.ADD_POSTS;
  constructor(private payload:Post){

  }
}

export class DeletePost implements Action {
  type: string = ActionTypes.DELETE_POSTS;
  constructor(private payload: number) {
  }

}

export class FetchPosts implements Action {
  type: string = ActionTypes.FETCH_POSTS;
  constructor() {
  }

}

export class GetPosts implements Action {
  type: string = ActionTypes.GET_POSTS
  constructor(){

  }

}
export class SetPosts implements Action {
  type:string = ActionTypes.SET_POSTS;
  constructor(private payload:Post[]){}
}

export class UpdatePosts implements Action {
  type: string = ActionTypes.UPDATE_POSTS;
  constructor(private payload: {id:number, post:Post}) {
  }

}

export type ActionUnion = SetPosts | UpdatePosts | GetPosts |FetchPosts | DeletePost |AddPosts;
