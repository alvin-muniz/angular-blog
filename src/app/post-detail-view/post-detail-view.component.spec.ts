import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PostDetailViewComponent } from './post-detail-view.component';
import {By} from '@angular/platform-browser';
import {AppComponent} from '../app.component';

describe('PostComponent', () => {
  let component: PostDetailViewComponent;
  let fixture: ComponentFixture<PostDetailViewComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PostDetailViewComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(PostDetailViewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should have a title with name \'On building intuition in heart and programming\'', () => {
    const title = fixture.debugElement.query(By.css('#title'));
    expect(title).toBeTruthy();
    expect(title.nativeElement.innerHTML).toEqual('On building intuition in heart and programming');
  });



  it('should have a date showing the post date', () => {
    const postDate = fixture.debugElement.query(By.css('#post-date'));
    const dateObject = new Date();
    component.date = dateObject.toDateString();
    expect(postDate.nativeElement.innerText).toEqual(dateObject.toDateString());
  });

});
