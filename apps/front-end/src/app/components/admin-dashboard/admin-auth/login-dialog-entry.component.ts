import {Component, Inject, OnDestroy, OnInit} from '@angular/core';
import {MAT_DIALOG_DATA, MatDialog, MatDialogRef} from "@angular/material/dialog";
import {Form, FormBuilder, FormControl, FormGroup, Validators} from "@angular/forms";
import {filter, Observable, Subject, Subscription, takeUntil} from "rxjs";
import {AuthResponse} from "./auth.effect";
import * as AppActions from './auth-actions'
import {Store} from "@ngrx/store";
import {AppState} from "./app-reducers";
import {authState} from "@angular/fire/auth";
import {ActivatedRoute, NavigationStart, Router, RouterEvent} from "@angular/router";
import {LoginDialogTemplateComponent} from "./login-dialog-template /login-dialog-template-.component";
@Component({
  selector: 'app-admin-auth',
  template: ``,
  styles: [`
    `],
})

export class LoginDialogEntryComponent implements OnInit,OnDestroy {
  _routerSubscription!:Subscription;
  currentDialog!:MatDialogRef<any>;
  destroy = new Subject <any>;
constructor(
  public dialog: MatDialog,
  private router: Router,
  private route: ActivatedRoute,
  private store: Store<AppState>

           ) {
  this.openDialog();


}
ngOnDestroy() {
  this._routerSubscription.unsubscribe();
}

  openDialog() {
  this.route.params.pipe(takeUntil(this.destroy)).subscribe(
    (params => {
      // if(this.currentDialog){
      //   this.currentDialog.close();
      // }
      this.store.select('auth').subscribe(
        (authState) => {
          console.log("ACT: ",authState.actionType)
          console.log(this.router.url);
          if (!authState.user && authState.actionType != 'LOGIN START' && authState.actionType != 'AUTH FAIL'){

            this.currentDialog = this.dialog.open(LoginDialogTemplateComponent,{
            });

            console.log(this.router.url);


            this.currentDialog.disableClose = true;
            this.currentDialog.afterClosed().subscribe(
              (result) => {
                console.log("Dialog was closed");

              }
            )
          }

        }

      )

    })
  )

  // Bắt sự kiện khi ở admin-dashboard và navigate đi route khác, thì tắt dialog
  this._routerSubscription = this.router.events
    .pipe( filter((event: RouterEvent | any) => event instanceof NavigationStart),
      filter(() => !!this.currentDialog)

    )
    .subscribe(() => {
      this.currentDialog.close();
      console.log("Dialog close on navigating")
    });
}

  ngOnInit(): void {
    this.destroy.next('destroyed');
  }



}
