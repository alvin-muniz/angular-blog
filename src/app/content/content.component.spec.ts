import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ContentComponent } from './content.component';
import {HttpClientTestingModule} from '@angular/common/http/testing';
import {PostService} from '../service/post.service';
import {BehaviorSubject, of} from 'rxjs';
import {PostModel} from '../api-interface/post.model';

describe('ContentComponent', () => {

  const fakePostService = {
    currentPostListEvents: new BehaviorSubject<PostModel[] | null>(null),
    retrievePosts: () => {
      return(of(currentPostList));
    }
  } as PostService;

  const currentPostList = [
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



  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [{provide: PostService, useValue: fakePostService}]
    });
  });

  describe('on init flow', () => {

  beforeEach(() => {   });

  it('it should call loadPosts on init', () => {
      const component = new ContentComponent({} as PostService);
      spyOn(component, 'loadPosts');
      component.ngOnInit();
      expect(component.loadPosts).toHaveBeenCalled();
      });
  it('should listen to currentPost list events on Init', () => {
    // set the return of current post list at the top of the file and inject to test
    const component = new ContentComponent(fakePostService);
    spyOn(component, 'loadPosts').and.callThrough();
    spyOn(fakePostService, 'retrievePosts').and.callThrough();
    component.loadPosts();

    expect(fakePostService.retrievePosts).toHaveBeenCalled();

    expect(component.currentPostList).toEqual(currentPostList);
  });

  });
});
