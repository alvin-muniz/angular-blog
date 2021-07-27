import { Component, OnInit } from '@angular/core';
import {FormBuilder, FormControl, FormGroup, Validators} from '@angular/forms';

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



  constructor(fb: FormBuilder) {
    this.titleControl = fb.control('', [Validators.required, Validators.minLength(5)]);
    this.contentControl = fb.control('', [Validators.required, Validators.minLength(1200)]);
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
    console.log('post is saved');
  }

}
