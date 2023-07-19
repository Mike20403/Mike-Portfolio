import {
  AfterViewInit,
  Component,
  OnDestroy,
  OnInit,
  ViewChild,
} from '@angular/core';
import { BlogService } from '../blog-page/blog-service';
import { Post } from '../blog-page/modals/post';
import { MatRow, MatTableDataSource } from '@angular/material/table';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort, Sort } from '@angular/material/sort';
import { LiveAnnouncer } from '@angular/cdk/a11y';
import { MatDialog, MatDialogRef } from '@angular/material/dialog';
import { DialogComponent } from './dialog/dialog.component';
import { PostEditorComponent } from './post-editor/post-editor.component';
import { PostDetailDialogComponent } from '../blog-page/Post/post-detail-dialog.component';
import {
  ActivatedRoute,
  NavigationStart,
  Router,
  RouterEvent,
} from '@angular/router';
import { filter, Subject, Subscription, take, takeUntil } from 'rxjs';
import { LoginDialogEntryComponent } from './admin-auth/login-dialog-entry.component';
import { Store } from '@ngrx/store';
import { AppState } from './admin-auth/app-reducers';
import { authState } from '@angular/fire/auth';
import * as AuthActions from './admin-auth/auth-actions';
import * as PostActions from '../blog-page/Post/post.actions';
@Component({
  selector: 'app-admin-dashboard',
  templateUrl: './admin-dashboard.component.html',
  styleUrls: ['./admin-dashboard.component.css'],
})
export class AdminDashboardComponent
  implements OnInit, AfterViewInit, OnDestroy
{
  posts!: Post[];
  selectedPost?: Post[];

  dataSource!: MatTableDataSource<Post>;
  displayedColumns: string[] = [
    '_id',
    '_title',
    '_article',
    '_imgURL',
    'deleteRow',
  ];
  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;

  constructor(
    private blogService: BlogService,
    private _liveAnnouncer: LiveAnnouncer,
    public dialog: MatDialog,
    public route: ActivatedRoute,
    public router: Router,
    private store: Store<AppState>
  ) {}

  ngOnInit(): void {

    this.store.dispatch(new AuthActions.AutoLogin());
    this.store.select('auth').subscribe((authState) => {
      if (!authState.user) {
        this.router.navigate(['auth'], { relativeTo: this.route });
      }
    });
    this.store.select('posts').subscribe((posts) => {
      this.posts = posts.posts;
      console.log('Admin-dashboard:', posts.posts, 'Type: ', posts.type);
      this.dataSource = new MatTableDataSource<Post>(this.posts);
      this.dataSource.paginator = this.paginator;
      this.dataSource.sort = this.sort;
    });
  }

  ngAfterViewInit() {}
  /** Announce the change in sort state for assistive technology. */
  announceSortChange(sortState: Sort) {
    // This example uses English messages. If your application supports
    // multiple language, you would internationalize these strings.
    // Furthermore, you can customize the message to add additional
    // details about the values being sorted.
    if (sortState.direction) {
      this._liveAnnouncer.announce(`Sorted ${sortState.direction}ending`);
    } else {
      this._liveAnnouncer.announce('Sorting cleared');
    }
  }
  getRecord(row: Post) {
    console.log(row);
    this.router.navigate(['../blog/post/',row._title],{relativeTo:this.route})

    console.log(this.router.url);
  }

  editPost(post: any, $event: MouseEvent) {
    this.dialog.open(PostEditorComponent, {
      data:{post,isEdited:true},

    });
    $event.stopPropagation();
  }
  openDialog(id: number) {
    const dialogRef = this.dialog.open(DialogComponent, {
      panelClass: 'warning-dialog',
    });
    dialogRef.disableClose = true;
    dialogRef.afterClosed().subscribe((result) => {
      console.log(`Dialog result: ${result}`);
      if (result == true) {
        // this.dataSource.data = this.dataSource.data.filter((data) => {
        //   return data._id != id;

        // })
        this.store.dispatch(new PostActions.DeletePost(id));
      }
      this.dialog.openDialogs.pop();
    });
  }
  openEditor() {
    const dialogRef = this.dialog.open(PostEditorComponent, {
      data:{
    post: {
      _id: {} as number,
      _title: '',
      _article: '',
      _hashtag: [] as string[],
      _preface: '',
      _content: '',
      _imgURL: 'https://dummyimage.com/900x400/ced4da/6c757d.jpg',
    },
        isEdited:false,
      }

    });
  }

  removeRow(id: number, $event: MouseEvent) {
    this.openDialog(id);
    $event.stopPropagation();
  }
  deletePost(post: any) {}

  ngOnDestroy(): void {}
}
