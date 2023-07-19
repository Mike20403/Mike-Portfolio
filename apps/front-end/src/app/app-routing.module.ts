import { IntroducePageComponent } from './components/introduce-page/introduce-page.component';
import { RouterModule, Routes} from '@angular/router';
import { NgModule } from '@angular/core';
import {AdminDashboardComponent} from "./components/admin-dashboard/admin-dashboard.component";
import {LoginDialogEntryComponent} from "./components/admin-dashboard/admin-auth/login-dialog-entry.component";
import {PostResolverService} from "./components/blog-page/Post/posts-resolver.service";

const routes: Routes = [
  { path: '', component: IntroducePageComponent },
  {
    path: 'blog',

    loadChildren: () => import('./components/blog-page/blog-page.module').then(x => x.BlogPageModule) },
  {

   path: 'admin-dashboard',resolve: {
      post:PostResolverService
    }, component:AdminDashboardComponent,
  children:[

    {
    // Sử dụng AuthGuard để kiểm tra xác thực trước khi truy cập route này
       path:'auth', component:LoginDialogEntryComponent}
  ]}
];

@NgModule({
  imports: [RouterModule.forRoot(routes,{onSameUrlNavigation: 'reload'})
    ],

})
export class AppRoutingModule {}
