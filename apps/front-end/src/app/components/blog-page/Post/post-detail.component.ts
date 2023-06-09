import {Component, OnInit} from "@angular/core";
import {ActivatedRoute} from "@angular/router";
import {BlogService} from "../blog-service";
import {Post} from "../modals/post";

@Component({
  template: `
    <div>
      {{postTitle}}
    </div>
  `,
  styles:['div { background: pink; }']

,
})
export class PostDetailComponent implements OnInit{
  postTitle!: string;
  postArr!:Post[];
  constructor(private routes:ActivatedRoute,
  private postService:BlogService){

  }
  ngOnInit(): void {
    this.postTitle = this.routes.snapshot.paramMap.get('title')!;
    // Or use this.route.paramMap.subscribe(params => this.postTitle = params.get('title'));
    this.postArr = this.postService.posts.slice();
     this.postArr = this.postArr.filter((post,id,array) => {
      return post._title == this.postTitle;
    },)
    this.postTitle = this.postArr['0']._title;
  }
}
