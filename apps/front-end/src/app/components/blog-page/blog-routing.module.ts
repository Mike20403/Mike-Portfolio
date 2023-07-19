import {NgModule} from "@angular/core";
import {RouterModule, Routes} from "@angular/router";

import {BlogPageComponent} from "./blog-page.component";
import {AllBlogComponent} from "./all-blog/all-blog.component";
import {BlogListComponent} from "./blog-list/blog-list.component";

import {PostResolverService} from "./Post/posts-resolver.service";
import {PostDetailComponent} from "./Post/post-detail.component";

const routes:Routes = [{
  path:'',
  component:BlogPageComponent,
  resolve:  {
    post:PostResolverService
  },
  children: [
    { path: '',redirectTo: 'blog-list', pathMatch:"full"},
    { path: 'blog-list', resolve:  {
        post:PostResolverService
      },component:BlogListComponent},
    { path: 'blog-all', resolve:  {
        post:PostResolverService
      },component:AllBlogComponent},
    { path: 'post/:title', resolve:  {
        post:PostResolverService
      }, component: PostDetailComponent },

  ]
}]

@NgModule({
  imports:[RouterModule.forChild(routes)],
  exports:[RouterModule]
})

export class BlogRoutingModule{

}
