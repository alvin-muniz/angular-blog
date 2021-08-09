import {Component, Input, OnInit} from '@angular/core';
import {PostService} from '../service/post.service';
import {PostModel} from '../api-interface/post.model';
import {Subscription} from 'rxjs';

@Component({
  selector: 'app-post-detail-view',
  templateUrl: './post-detail-view.component.html',
  styleUrls: ['./post-detail-view.component.scss']
})
export class PostDetailViewComponent implements OnInit {

  @Input() currentPost: PostModel | null = null;

  constructor() {
  }

  ngOnInit(): void {
    console.log(this.currentPost, 'in detail view');
  }

  currentPostEmpty(): boolean {
    const emptyPost = {} as PostModel;
    console.log(this.currentPost?.id);
    console.log(emptyPost.id);
    const result = this.currentPost?.id === emptyPost.id ? true : false;
    console.log(result, 'equality');
    return result;
  }

}
