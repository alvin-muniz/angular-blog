import { TestBed } from '@angular/core/testing';

import { PostService } from './post.service';
import {HttpClientTestingModule, HttpTestingController} from '@angular/common/http/testing';
import {UserService} from './user.service';
import {JwtInterceptor} from '../jwt.interceptor';
import {BehaviorSubject} from 'rxjs';
import {UserModel} from '../api-interface/user.model';
import {AppComponent} from '../app.component';
import {HttpClient} from '@angular/common/http';
import {PostModel} from '../api-interface/post.model';

describe('PostService', () => {

  const DEV_URL = 'http://localhost:9092';

  let postService: PostService;
  let http: HttpTestingController;
  const fakeUserService = {
    userEvents: new BehaviorSubject<UserModel | null>(null),
    logout: () => {},
    retrieveUser: () => {}
  } as UserService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [{provide: UserService, useValue: fakeUserService}]
    });
  });

  beforeEach(() => {
    postService = TestBed.inject(PostService);
    http = TestBed.inject(HttpTestingController);
  });

  it('should be created', () => {
    expect(postService).toBeTruthy();
  });

  describe('constructor flow', () => {
    it('should load a user on creation', () => {
      const service = new PostService({} as HttpClient, fakeUserService);
      const user = {username: 'alvin', password: 'hello', id: 1, token: '12345'} as UserModel;
      fakeUserService.userEvents.next(user);
      fakeUserService.userEvents.subscribe(() => { expect(service.user).toEqual(user); });
    });

  });

  describe('http calls with logged in user', () => {
    let user: UserModel;

    beforeEach(() => {
      user = {username: 'alvin', password: 'hello', id: 1, token: '12345'} as UserModel;
      fakeUserService.userEvents.next(user);
    });

    it('retrievePosts should get posts', () => {
      // Given a list of posts to be returned
      const postList = [
        {
          id: 1,
          date: '1-22-2021',
          content: 'Hello There',
          title: 'Post Title'
        } as PostModel,
        {
          id: 2,
          date: '1-24-2021',
          content: 'Hello There',
          title: 'Post Title'
        } as PostModel,
        {
          id: 3,
          date: '1-26-2021',
          content: 'Hello There',
          title: 'Post Title'
        } as PostModel
      ] as PostModel[];

      // temp array to show the returned posts
      let actualPosts: Array<PostModel> = [];

      postService.retrievePosts().subscribe((posts: Array<PostModel>) => actualPosts = posts);
      const req = http.expectOne(`${DEV_URL}/admin/posts/${user?.id}`);
      req.flush(postList);
      expect(req.request.method).toBe('GET');
      expect(actualPosts.length).not.toBe(0);
      expect(actualPosts).toEqual(postList);

      http.verify();

    });

    it('savePosts should save a post to the back end', () => {
      const post = {
        id: 1,
        date: '1-22-2021',
        content: 'Hello There',
        title: 'Post Title'
      };

      let actualPost: PostModel = {} as PostModel;


      postService.savePost(post).subscribe(retrievedPost => actualPost = retrievedPost);
      const req = http.expectOne(`${DEV_URL}/admin/posts`);
      req.flush(post);

    })
  });


});
