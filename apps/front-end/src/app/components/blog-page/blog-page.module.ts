import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { BlogRoutingModule } from './blog-routing.module';
import { BlogPageComponent } from './blog-page.component';
import { BlogItemComponent } from './all-blog/blog-item/blog-item.component';
import { AllBlogComponent } from './all-blog/all-blog.component';
import { BlogListComponent } from './blog-list/blog-list.component';
import { RouterModule } from '@angular/router';
import { ReadmoreComponent } from '../helper/readmore/readmore.component';
import { PostDetailDialogComponent } from './Post/post-detail-dialog.component';
import { PostDetailComponent } from './Post/post-detail.component';

@NgModule({
  declarations: [
    BlogPageComponent,
    BlogItemComponent,
    AllBlogComponent,
    BlogListComponent,
    ReadmoreComponent,
    PostDetailDialogComponent,
    PostDetailComponent,
  ],
  imports: [CommonModule, RouterModule, BlogRoutingModule],
  exports: [RouterModule],
})
export class BlogPageModule {}
