import { Component } from '@angular/core';
import { Post } from '../modals/post';
import { BlogService } from '../blog-service';
import { Observable } from 'rxjs';
import { Store } from '@ngrx/store';
import { AppState } from '../../admin-dashboard/admin-auth/app-reducers';

@Component({
  selector: 'app-all-blog',
  templateUrl: './all-blog.component.html',
  styleUrls: ['./all-blog.component.css'],
})
export class AllBlogComponent {
  posts: Observable<{ posts: Post[] }> = this.store.select('posts');
  constructor(
    private blogService: BlogService,
    private store: Store<AppState>
  ) {
    console.log(this.posts);
  }
}
