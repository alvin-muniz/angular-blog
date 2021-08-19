import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PostListComponent } from './post-list.component';
import {PostModel} from '../api-interface/post.model';
import {LoginComponent} from '../admin/login/login.component';

describe('PostListComponent', () => {

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

  beforeEach( () => {
      TestBed.configureTestingModule({
      declarations: [ PostListComponent ]
    })
    .compileComponents();
  });

  describe('post list functionality', () => {
    it('should display number of posts in current post which is 3', () => {
      const fixture = TestBed.createComponent(PostListComponent);

      const component = fixture.componentInstance;

      component.currentPostList = postList;

      expect(component.currentPostList.length).toBe(3);
      expect(component.currentPostList).toEqual(postList);

    });
  });
});
