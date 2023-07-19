import {Component, OnInit} from '@angular/core';
import {ActivatedRoute, Router} from "@angular/router";

@Component({
  selector: 'app-blog-page',
  templateUrl: './blog-page.component.html',
  styleUrls: ['./blog-page.component.css'],
})
export class BlogPageComponent implements OnInit{
  constructor(public router:Router,
  private route: ActivatedRoute) {

  }

  ngOnInit(): void {

  }
}
