import {Post} from "./post";

export class Blog{
  posts: Post[];

  addPost(item:Post){
    this.posts.push(item)
  }

}
