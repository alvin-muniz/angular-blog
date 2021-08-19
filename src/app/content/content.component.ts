import {Component, OnChanges, OnInit} from '@angular/core';
import {PostModel} from '../api-interface/post.model';
import {BehaviorSubject, Subscription} from 'rxjs';
import {PostService} from '../service/post.service';
import {UserModel} from '../api-interface/user.model';

@Component({
  selector: 'app-content',
  templateUrl: './content.component.html',
  styleUrls: ['./content.component.scss']
})
export class ContentComponent implements OnInit {

  currentPostList: PostModel[] = {} as PostModel[];
  currentPost: PostModel = {} as PostModel;
  currentPostListEvents =  new BehaviorSubject<PostModel[] | null>(null);

  constructor(private postService: PostService) {
  }

  ngOnInit(): void {
    this.loadPosts();
  }

  loadPosts(): void {
    this.postService.retrievePosts().subscribe(
      retrievedPosts => {
        this.currentPostListEvents.next(retrievedPosts);
        this.currentPostList = retrievedPosts;
        if (this.currentPostList.length > 0) {
          this.currentPost = this.currentPostList[0];
        }
      }
    );
  }

}
