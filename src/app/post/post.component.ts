import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-post',
  templateUrl: './post.component.html',
  styleUrls: ['./post.component.scss']
})
export class PostComponent implements OnInit {

  date?: string;
  constructor() { }

  ngOnInit(): void {

    this.date = new Date().toDateString();

  }

}
