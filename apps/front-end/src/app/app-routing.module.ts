import { IntroducePageComponent } from './components/introduce-page/introduce-page.component';
import { RouterModule, Routes} from '@angular/router';
import { NgModule } from '@angular/core';
import { BlogPageComponent } from './components/blog-page/blog-page.component';
import {AdminDashboardComponent} from "./components/admin-dashboard/admin-dashboard.component";

const routes: Routes = [
  { path: '', component: IntroducePageComponent },
  { path: 'blog', component: BlogPageComponent},
  { path: 'admin-dashboard', component:AdminDashboardComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)
    ],

})
export class AppRoutingModule {}
