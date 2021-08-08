import {Component, Input, OnInit} from '@angular/core';
import {PostModel} from '../api-interface/post.model';

@Component({
  selector: 'app-post-list',
  templateUrl: './post-list.component.html',
  styleUrls: ['./post-list.component.scss']
})
export class PostListComponent implements OnInit {

  @Input() currentPostList?: PostModel[] | null;


  constructor() { }

  ngOnInit(): void {
  }

}
