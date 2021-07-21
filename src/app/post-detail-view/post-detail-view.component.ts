import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-post-detail-view',
  templateUrl: './post-detail-view.component.html',
  styleUrls: ['./post-detail-view.component.scss']
})
export class PostDetailViewComponent implements OnInit {

  date?: string;
  constructor() { }

  ngOnInit(): void {

    this.date = new Date().toDateString();

  }

}