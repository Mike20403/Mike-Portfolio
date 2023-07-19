import { Post} from "../modals/post";
import * as PostActions from './post.actions'

export interface PostState {
  posts: Post[],
  type: string,
}

const initialState = {
  posts: [] as Post[],
  type: ''

}


export function PostsReducer(state = initialState, action: any) {
  switch (action.type) {
    case PostActions.ActionTypes.FETCH_POSTS:
      return { ...state, type: 'FETCH POSTS'}
    case PostActions.ActionTypes.ADD_POSTS:
      return { ...state, posts: [...state.posts, action.payload], type:'ADD POSTS' }
    case PostActions.ActionTypes.SET_POSTS:
      return { ...state, posts: action.payload, type:'SET POST'}
    case PostActions.ActionTypes.DELETE_POSTS:
      return { ...state, posts: [...state.posts].filter((post, index) => {
          return !(post._id === action.payload)
        })
        ,type: 'DELETE POST'
      }
    case PostActions.ActionTypes.UPDATE_POSTS:

      const updatedPost = {
        ...state.posts[action.payload.id],
        ...action.payload.post
      };

      const updatedPosts = [...state.posts];
      console.log("[UpdatedPost]: ",updatedPost);
      updatedPosts[action.payload.id] = updatedPost;

      return {
        ...state,
        posts: updatedPosts,
        type :'UPDATE POST'
      };
    default:
      return state;
  }
}
