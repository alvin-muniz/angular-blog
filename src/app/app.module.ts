import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { PostDetailViewComponent } from './post-detail-view/post-detail-view.component';
import { PostListComponent } from './post-list/post-list.component';
import { AdminComponent } from './admin/admin.component';
import { ContentComponent } from './content/content.component';
import { LoginComponent } from './admin/login/login.component';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {HTTP_INTERCEPTORS, HttpClientModule} from '@angular/common/http';
import { PostFormComponent } from './admin/post-form/post-form.component';
import {UserService} from './service/user.service';
import {PostService} from './service/post.service';
import {JwtInterceptor} from './jwt.interceptor';
import {CommonModule} from '@angular/common';

@NgModule({
  declarations: [
    AppComponent,
    PostDetailViewComponent,
    PostListComponent,
    AdminComponent,
    ContentComponent,
    LoginComponent,
    PostFormComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    HttpClientModule,
    ReactiveFormsModule,
    CommonModule
  ],
  providers: [
    UserService,
    PostService,
    {
      provide: HTTP_INTERCEPTORS,
      useExisting:  JwtInterceptor,
      multi: true
    }
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
