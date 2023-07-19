import {Component, Input, OnInit} from '@angular/core';
import {Post} from "../../modals/post";

@Component({
  selector: 'app-blog-item',
  templateUrl: './blog-item.component.html',
  styleUrls: ['./blog-item.component.css'],
})
export class BlogItemComponent implements OnInit {
  @Input() post?:Post;
  constructor() {
  }

  ngOnInit(): void {
  }
  refreshPage(route: string): void {
    window.location.href = route;
  }


}
