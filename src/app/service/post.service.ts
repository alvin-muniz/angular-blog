import {Injectable, OnInit} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {PostModel} from '../api-interface/post.model';
import {BehaviorSubject, Observable, Subscription} from 'rxjs';
import {UserModel} from '../api-interface/user.model';
import {UserService} from './user.service';
import {isNotNullOrUndefined} from 'codelyzer/util/isNotNullOrUndefined';

@Injectable({
  providedIn: 'root'
})
export class PostService {

  DEV_URL = 'http://localhost:9092';
  user: UserModel | null = null;
  userEventsSubscription: Subscription | null = null;

  currentPostListEvents = new BehaviorSubject <PostModel[] | null>(null);


  constructor(private http: HttpClient,
              private userService: UserService) {
    this.userEventsSubscription = this.userService.userEvents.subscribe(user => (this.user = user));
  }

  savePost(post: PostModel): Observable<PostModel> {
    console.log('in the post service');
    return this.http.post<PostModel>(`${this.DEV_URL}/admin/posts`, post);
  }


  retrievePosts(): Observable<PostModel[]> {
    if (this.user) {
      console.log('user');
      return this.http.get<PostModel[]>(`${this.DEV_URL}/admin/posts/${this.user?.id}`);
    } else {
      return this.http.get<PostModel[]>(`${this.DEV_URL}/posts`);
    }
  }

}
