import {Component, OnDestroy, OnInit} from '@angular/core';
import {FirebaseService} from "../../services/firebase-services";
import {Subscription} from "rxjs";
import {faFacebook, faGithub, faGoogle, faLinkedin} from "@fortawesome/free-brands-svg-icons";

@Component({
  selector: 'app-personal-card',
  templateUrl: './personal-card.component.html',
  styleUrls: ['./personal-card.component.css']
})
export class PersonalCardComponent implements OnInit, OnDestroy {
  avatarUrl: string = "";
  avtSubscription!: Subscription;
  // Icons
  linkedinIcon = faLinkedin;
  fbIcon = faFacebook;
  githubIcon = faGithub;
  gmailIcon = faGoogle;

  constructor(private firebaseService: FirebaseService) {

  }

  ngOnDestroy(): void {
    if (this.avtSubscription) {
      this.avtSubscription.unsubscribe();
    }
  }

  ngOnInit() {
    this.avtSubscription = this.firebaseService.getImagefromStorage().subscribe(
      (avtObj) => {
        this.avatarUrl = avtObj.payload.child('downloadURL').val();
      })

  }

  onClick() {

  }
}
