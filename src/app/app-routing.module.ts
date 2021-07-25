import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import {AdminComponent} from './admin/admin.component';
import {ContentComponent} from './content/content.component';
import {PostFormComponent} from './admin/post-form/post-form.component';

const routes: Routes = [
  {
    path: 'admin',
    component: AdminComponent,
    children: [
      {
        path: 'post',
        component: PostFormComponent,
      },
      {
        path: '',
        redirectTo: 'admin',
        pathMatch: 'full'
      }
      ]
  },
  {
    path: '',
    component: ContentComponent
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
