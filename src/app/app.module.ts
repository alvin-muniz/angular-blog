import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { PostDetailViewComponent } from './post-detail-view/post-detail-view.component';
import { PostListComponent } from './post-list/post-list.component';
import { AdminComponent } from './admin/admin.component';
import { ContentComponent } from './content/content.component';
import { LoginComponent } from './admin/login/login.component';
import {FormsModule} from '@angular/forms';
import {HttpClientModule} from '@angular/common/http';

@NgModule({
  declarations: [
    AppComponent,
    PostDetailViewComponent,
    PostListComponent,
    AdminComponent,
    ContentComponent,
    LoginComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    HttpClientModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
