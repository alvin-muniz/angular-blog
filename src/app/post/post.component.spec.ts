import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PostComponent } from './post.component';
import {By} from '@angular/platform-browser';

describe('PostComponent', () => {
  let component: PostComponent;
  let fixture: ComponentFixture<PostComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PostComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(PostComponent);
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
