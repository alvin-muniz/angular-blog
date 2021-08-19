import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PostDetailViewComponent } from './post-detail-view.component';
import {By} from '@angular/platform-browser';
import {AppComponent} from '../app.component';
import {POST_R3_MARKER} from '@angular/compiler-cli/ngcc/src/host/ngcc_host';
import {PostModel} from '../api-interface/post.model';

describe('PostDetailViewComponent', () => {

  const currentPost = {
    id: 1,
    date: '1-22-2021',
    content: 'Hello There',
    title: 'Post Title'
  } as PostModel;

  const intialState = {

  };

  beforeEach(() => {
     TestBed.configureTestingModule({
      declarations: [ PostDetailViewComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
  });

  // describes flow for when current post is empty
  describe('Current Post is Empty', () => {
    let fixture: ComponentFixture<PostDetailViewComponent>;
    let component: PostDetailViewComponent;

    beforeEach(() => {
    fixture = TestBed.createComponent(PostDetailViewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges()
    });

    it('should have a title with showing empty post filler', () => {
      const title = fixture.debugElement.query(By.css('#title'));
      expect(title).toBeTruthy();
      expect(title.nativeElement.innerHTML).toEqual('Make your first post!');
    });

    it('should have a date showing empty post filler', () => {
      const postDate = fixture.debugElement.query(By.css('#post-date'));
      expect(postDate.nativeElement.innerText).toEqual('First Post');
    });

    it('should have a content showing empty post filler', () => {
      const content = fixture.debugElement.query(By.css('#content'));
      expect(content).not.toBeNull();
    });
  });

  // describes flow for when current post is not empty
  describe('Current Post is not Empty', () => {
    let fixture: ComponentFixture<PostDetailViewComponent>;
    let component: PostDetailViewComponent;

    beforeEach(() => {
      fixture = TestBed.createComponent(PostDetailViewComponent);
      component = fixture.componentInstance;
      component.currentPost = currentPost;
      fixture.detectChanges();
    });

    it('should have a title with showing empty post filler', () => {
      const title = fixture.debugElement.query(By.css('#title'));
      expect(title).toBeTruthy();
      expect(title.nativeElement.innerHTML).toEqual(component.currentPost?.title);
    });

    it('should have a date showing empty post filler', () => {
      const postDate = fixture.debugElement.query(By.css('#post-date'));
      expect(postDate.nativeElement.innerText).toEqual('Jan 22, 2021');
    });

    it('should have a content showing empty post filler', () => {
      const content = fixture.debugElement.query(By.css('#content'));
      expect(content.nativeElement.innerText).toEqual(component.currentPost?.content);
    });
  });



});
