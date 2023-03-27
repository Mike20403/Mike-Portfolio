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
import { BlogPageComponent } from './components/blog-page/blog-page.component';

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
    BlogPageComponent,
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    AngularFireModule.initializeApp(environment.firebase),
    AngularFireStorageModule,
    AngularFireDatabaseModule,
    AppRoutingModule,
    FontAwesomeModule,
  ],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
