import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppComponent } from './app.component';
import { HeaderComponent } from './components/header/header.component';
import { IntroducePageComponent } from './components/introduce-page/introduce-page.component';
import { PersonalCardComponent } from './components/personal-card/personal-card.component';
import { AvtModalComponent } from './components/avt-modal/avt-modal.component';
import { HttpClientModule } from '@angular/common/http';
import { AngularFireModule } from '@angular/fire/compat';
import { AngularFireStorageModule } from '@angular/fire/compat/storage';
import { AngularFireDatabaseModule } from '@angular/fire/compat/database';
import { environment } from '../environments/environment';
import { AppRoutingModule } from './app-routing.module';
import { AppearDirective } from './directives/appear.directive';
import { TimelinesComponent } from './components/timelines/timelines.component';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { SkillsListComponent } from './components/skills-list/skills-list.component';
import { SkillItemComponent } from './components/skills-list/skill-item/skill-item.component';
import { EditorComponent } from './components/editor/editor.component';
import { FormsModule } from '@angular/forms';
import { CKEditorModule } from '@ckeditor/ckeditor5-angular';
import { BlogPageModule } from './components/blog-page/blog-page.module';
import { AdminDashboardComponent } from './components/admin-dashboard/admin-dashboard.component';
import { MatInputModule } from '@angular/material/input';

import { MatPaginatorModule } from '@angular/material/paginator';
import { MatSort, MatSortModule } from '@angular/material/sort';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatTable, MatTableModule } from '@angular/material/table';
import { MatDialogModule } from '@angular/material/dialog';
import { DialogComponent } from './components/admin-dashboard/dialog/dialog.component';
import { PostEditorComponent } from './components/admin-dashboard/post-editor/post-editor.component';

@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    IntroducePageComponent,
    PersonalCardComponent,
    AvtModalComponent,
    AppearDirective,
    TimelinesComponent,
    SkillsListComponent,
    SkillItemComponent,
    EditorComponent,
    AdminDashboardComponent,
    DialogComponent,
    PostEditorComponent,

  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    AngularFireModule.initializeApp(environment.firebase),
    AngularFireStorageModule,
    AngularFireDatabaseModule,
    AppRoutingModule,
    FontAwesomeModule,
    CKEditorModule,
    FormsModule,
    BlogPageModule,
    BrowserAnimationsModule,
    MatTableModule,
    MatPaginatorModule,
    MatProgressSpinnerModule,
    MatSortModule,
    MatDialogModule,
  ],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
