import { IntroducePageComponent } from './components/introduce-page/introduce-page.component';
import { RouterModule, Routes } from '@angular/router';
import { NgModule } from '@angular/core';
import { BlogPageComponent } from './components/blog-page/blog-page.component';

const routes: Routes = [
  { path: '', component: IntroducePageComponent },
  { path: 'blog', component: BlogPageComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
