import {Component, OnInit} from '@angular/core';
import {BlogService} from "../blog-service";
import {Post} from "../modals/post";
import {ActivatedRoute, Router} from "@angular/router";
import {AppState} from "../../admin-dashboard/admin-auth/app-reducers";
import {Store} from "@ngrx/store";
import {Observable} from "rxjs";

@Component({
  selector: 'app-blog-list',
  templateUrl: './blog-list.component.html',
  styleUrls: ['./blog-list.component.css'],
})
export class BlogListComponent implements OnInit{
  posts!:Post[];
  wrapped:boolean = false;
  constructor(private blogService:BlogService,
              private router:Router,
              private routes:ActivatedRoute,
              private store:Store<AppState>) {
  }

  ngOnInit(): void {
    this.store.select('posts').subscribe(
    posts => {
      this.posts = posts.posts;
    })
  }
onSeemore(){
    this.router.navigate(['../blog-all'],{ relativeTo: this.routes })
}
  refreshPage(route: string): void {
    window.location.href = route;
  }

}
