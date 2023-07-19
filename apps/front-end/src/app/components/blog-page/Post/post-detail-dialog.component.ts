import {Component, ElementRef, Inject, OnInit, Renderer2, ViewChild, ViewEncapsulation} from "@angular/core";
import {ActivatedRoute} from "@angular/router";
import {BlogService} from "../blog-service";
import {Post} from "../modals/post";
import {MAT_DIALOG_DATA, MatDialogRef} from "@angular/material/dialog";
import {DomSanitizer, SafeHtml} from "@angular/platform-browser";

@Component({
  template: `
    <div class="wrapper">
      <h1 class="bg-warning text-white fw-bold p-2" mat-dialog-title>Post Preview </h1>
      <!-- Page content-->
      <div class="container mt-5 p-5">
        <div class="row">
          <div class="col-lg-8">
            <!-- Post content-->
            <article>
              <!-- Post header-->
              <header class="mb-4">
                <!-- Post title-->
                <h1 class="fw-bolder mb-1">{{data._title}}</h1>
                <!-- Post meta content-->
                <div class="text-muted fst-italic mb-2">Posted on January 1, 2023 by Start Bootstrap</div>
                <!-- Post categories-->

                <a class="badge bg-secondary text-decoration-none link-light" href="#!">{{data._article}}</a>
              </header>
              <!-- Preview image figure-->
              <figure class="mb-4"><img class="img-fluid rounded" style="width: 900px;height: 400px" [src]="coverIMG" alt="..." /></figure>
              <!-- Post content-->
              <section class="mb-5" [innerHTML]="safeHtml" >

              </section>
            </article>
            <!-- Comments section-->
            <section class="mb-5">
              <div class="card bg-light">
                <div class="card-body">
                  <!-- Comment form-->
                  <form class="mb-4"><textarea class="form-control" rows="3" placeholder="Join the discussion and leave a comment!"></textarea></form>
                  <!-- Comment with nested comments-->
                  <div class="d-flex mb-4">
                    <!-- Parent comment-->
                    <div class="flex-shrink-0"><img class="rounded-circle" src="https://dummyimage.com/50x50/ced4da/6c757d.jpg" alt="..." /></div>
                    <div class="ms-3">
                      <div class="fw-bold">Commenter Name</div>
                      If you're going to lead a space frontier, it has to be government; it'll never be private enterprise. Because the space frontier is dangerous, and it's expensive, and it has unquantified risks.
                      <!-- Child comment 1-->
                      <div class="d-flex mt-4">
                        <div class="flex-shrink-0"><img class="rounded-circle" src="https://dummyimage.com/50x50/ced4da/6c757d.jpg" alt="..." /></div>
                        <div class="ms-3">
                          <div class="fw-bold">Commenter Name</div>
                          And under those conditions, you cannot establish a capital-market evaluation of that enterprise. You can't get investors.
                        </div>
                      </div>
                      <!-- Child comment 2-->
                      <div class="d-flex mt-4">
                        <div class="flex-shrink-0"><img class="rounded-circle" src="https://dummyimage.com/50x50/ced4da/6c757d.jpg" alt="..." /></div>
                        <div class="ms-3">
                          <div class="fw-bold">Commenter Name</div>
                          When you put money directly to a problem, it makes a good headline.
                        </div>
                      </div>
                    </div>
                  </div>
                  <!-- Single comment-->
                  <div class="d-flex">
                    <div class="flex-shrink-0"><img class="rounded-circle" src="https://dummyimage.com/50x50/ced4da/6c757d.jpg" alt="..." /></div>
                    <div class="ms-3">
                      <div class="fw-bold">Commenter Name</div>
                      When I look at the universe and all the ways the universe wants to kill us, I find it hard to reconcile that with statements of beneficence.
                    </div>
                  </div>
                </div>
              </div>
            </section>
          </div>
          <!-- Side widgets-->
          <div class="col-lg-4">
            <!-- Search widget-->
            <div class="card mb-4">
              <div class="card-header">Search</div>
              <div class="card-body">
                <div class="input-group">
                  <input class="form-control" type="text" placeholder="Enter search term..." aria-label="Enter search term..." aria-describedby="button-search" />
                  <button class="btn btn-primary" id="button-search" type="button">Go!</button>
                </div>
              </div>
            </div>
            <!-- Categories widget-->
            <div class="card mb-4">
              <div class="card-header">Categories</div>
              <div class="card-body">
                <div class="row">
                  <div class="col-sm-6">
                    <ul class="list-unstyled mb-0">
                      <li><a href="#!">Web Design</a></li>
                      <li><a href="#!">HTML</a></li>
                      <li><a href="#!">Freebies</a></li>
                    </ul>
                  </div>
                  <div class="col-sm-6">
                    <ul class="list-unstyled mb-0">
                      <li><a href="#!">JavaScript</a></li>
                      <li><a href="#!">CSS</a></li>
                      <li><a href="#!">Tutorials</a></li>
                    </ul>
                  </div>
                </div>
              </div>
            </div>
            <!-- Side widget-->
            <div class="card mb-4">
              <div class="card-header">Side Widget</div>
              <div class="card-body">You can put anything you want inside of these side widgets. They are easy to use, and feature the Bootstrap 5 card component!</div>
            </div>
          </div>
        </div>
      </div>
      <!-- Footer-->
      <footer class="py-5 bg-dark">
        <div class="container"><p class="m-0 text-center text-white">Copyright &copy; Your Website 2023</p></div>
      </footer>
    </div>
  `,
  styles:[]
,
  encapsulation: ViewEncapsulation.None,
})
export class PostDetailDialogComponent implements OnInit{
  @ViewChild("postcontent") postContent!:ElementRef;
  postTitle!: string;
  postArr!:Post[];
  safeHtml!: SafeHtml;
  coverIMG:string = 'https://dummyimage.com/900x400/ced4da/6c757d.jpg';
  constructor(
    private sanitizer: DomSanitizer,
    private routes:ActivatedRoute,
  private postService:BlogService,
  dialogRef:MatDialogRef<PostDetailDialogComponent>,
              @Inject(MAT_DIALOG_DATA) public data:Post){

  }
  ngOnInit(): void {
    this.safeHtml = this.sanitizer.bypassSecurityTrustHtml(this.data._content);
    this.coverIMG = this.data._imgURL;

    console.log(this.data._content);
    // this.postTitle = this.routes.snapshot.paramMap.get('title')!;
    // // Or use this.route.paramMap.subscribe(params => this.postTitle = params.get('title'));
    // this.postArr = this.postService.posts.slice();
    //  this.postArr = this.postArr.filter((post,id,array) => {
    //   return post._title == this.postTitle;
    // },)
    // this.postTitle = this.postArr['0']._title;
  }
}
