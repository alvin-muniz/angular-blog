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

  @Input() currentPost?: PostModel | null;

  constructor() { }

  ngOnInit(): void {
  }

}
