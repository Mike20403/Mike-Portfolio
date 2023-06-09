import {NgModule} from "@angular/core";
import {RouterModule, Routes} from "@angular/router";

import {BlogPageComponent} from "./blog-page.component";
import {AllBlogComponent} from "./all-blog/all-blog.component";
import {BlogListComponent} from "./blog-list/blog-list.component";
import {PostDetailComponent} from "./Post/post-detail.component";

const routes:Routes = [{
  path:'blog',
  component:BlogPageComponent,
  children: [
    { path: 'blog-list',component:BlogListComponent},
    { path: 'blog-all',component:AllBlogComponent},
    { path: 'post/:title', component: PostDetailComponent }
  ]
}]

@NgModule({
  imports:[RouterModule.forChild(routes)],
  exports:[RouterModule]
})

export class BlogRoutingModule{

}
