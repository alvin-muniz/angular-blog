import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {PostModel} from '../api-interface/post.model';
import {Observable} from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class PostService {

  DEV_URL = 'http://localhost:9092';

  constructor(private http: HttpClient) { }

  savePost(post: PostModel): Observable<PostModel> {
    console.log('in the post service');
    return this.http.post<PostModel>(`${this.DEV_URL}/admin/posts`, post);
}
}
