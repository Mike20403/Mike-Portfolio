import {AfterViewInit, Component, OnInit, ViewChild} from '@angular/core';
import {FaIconLibrary} from "@fortawesome/angular-fontawesome";
import {faCoffee} from "@fortawesome/free-solid-svg-icons";
import {
  faFacebook,
  faGithub,
  faGoogle,
  faLinkedin,
  faTwitter
} from '@fortawesome/free-brands-svg-icons';
import {AppState} from "./components/admin-dashboard/admin-auth/app-reducers";
import {Store} from "@ngrx/store";
import {authState} from "@angular/fire/auth";
import {AlertComponent} from "./components/helper/alert/alert.component";
import {HttpClient} from "@angular/common/http";
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent implements OnInit,AfterViewInit{
  title = 'front-end';
  alertMsg:string = '';
  @ViewChild(AlertComponent) alertComponent!: AlertComponent;
  constructor(private library: FaIconLibrary,
              private store:Store<AppState>,
              private http:HttpClient) {
    // Add an icon to the library for convenient access in other components
    library.addIcons(faCoffee,faLinkedin,faGithub,faFacebook,faGoogle,faTwitter);
  }

ngAfterViewInit() {
setTimeout(()=>{
  this.store.select('auth').subscribe(
    (authState) => {
      if (authState.actionType == 'AUTH SUCCESS'){
        this.alertMsg = "Login Successful!";
        this.alertComponent.onTimeout();
      }
    }
  )
},0)
}
ngOnInit() {

}





}
