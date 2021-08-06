import { Component, OnInit } from '@angular/core';
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

  // currentPostListEventSubscription: Subscription | null = null;
  currentPostListEvents =  new BehaviorSubject<PostModel[] | null>(null);

  constructor(private postService: PostService) {
    // this.currentPostListEventSubscription = this.postService.currentPostListEvents.subscribe(currentPostList => (this.currentPostList = currentPostList));
  }

  ngOnInit(): void {
    console.log('retrieving posts');
    this.postService.retrievePosts().subscribe(
      retrievedPosts => {
        console.log(retrievedPosts, 'Retrieved Posts');
        this.currentPostListEvents.next(retrievedPosts);
      }
    );
  }

  setContent(postList: PostModel[] | null, currentPost: PostModel | undefined): void {
    console.log('set content is called in ');
  }

}
