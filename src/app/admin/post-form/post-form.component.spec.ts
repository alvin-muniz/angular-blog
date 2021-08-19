import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PostFormComponent } from './post-form.component';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {HttpClientTestingModule} from '@angular/common/http/testing';
import {PostService} from '../../service/post.service';
import {Subject} from 'rxjs';
import {UserModel} from '../../api-interface/user.model';
import {UserService} from '../../service/user.service';
import {Router} from '@angular/router';

describe('PostFormComponent', () => {
  let component: PostFormComponent;
  let fixture: ComponentFixture<PostFormComponent>;

  const fakePostService = {
    retrievePosts: () => {}
  } as PostService;


  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PostFormComponent ],
      imports: [FormsModule, ReactiveFormsModule],
      providers: [HttpClientTestingModule, {provide: PostService, useValue: fakePostService}]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(PostFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
