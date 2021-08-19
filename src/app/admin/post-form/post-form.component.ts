import { Component, OnInit } from '@angular/core';
import {FormBuilder, FormControl, FormGroup, Validators} from '@angular/forms';
import {PostService} from '../../service/post.service';
import {PostModel} from '../../api-interface/post.model';
import {JwtInterceptor} from '../../jwt.interceptor';

@Component({
  selector: 'app-post-form',
  templateUrl: './post-form.component.html',
  styleUrls: ['./post-form.component.scss']
})
export class PostFormComponent implements OnInit {

  titleControl: FormControl;
  contentControl: FormControl;
  dateControl: FormControl;
  postForm: FormGroup;



  constructor(fb: FormBuilder, private postService: PostService,
              private httpInterceptor: JwtInterceptor) {
    this.titleControl = fb.control('', [Validators.required, Validators.minLength(5)]);
    this.contentControl = fb.control('', [Validators.required, Validators.minLength(10)]);
    this.dateControl = fb.control('', [Validators.required]);


    this.postForm = fb.group({
      title: this.titleControl,
      content: this.contentControl,
      date: this.dateControl,
      enabled: true
    },
      {});
  }

  ngOnInit(): void {

  }

  savePost(): void {
    let post: PostModel;
    post = {
      content: this.postForm.controls['content'].value,
      title: this.postForm.controls['title'].value,
      date: this.postForm.controls['date'].value
    } as PostModel;

    this.postService.savePost(post).subscribe(
      retrievedPost => {
      }
    )
    ;

  }

}
