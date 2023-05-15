import {Component, OnInit} from '@angular/core';
import {BlogService} from "../blog-service";
import {Post} from "../modals/post";

@Component({
  selector: 'app-blog-list',
  templateUrl: './blog-list.component.html',
  styleUrls: ['./blog-list.component.css'],
})
export class BlogListComponent implements OnInit{
  posts:Post[] = this.blogService.posts;
  wrapped:boolean = false;
  constructor(private blogService:BlogService) {
  }

  ngOnInit(): void {
  }


}
