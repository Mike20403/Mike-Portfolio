import { Component, OnDestroy, OnInit } from '@angular/core';
import { FirebaseService } from '../../services/firebase-services';
import { Subscription } from 'rxjs';
import { FaIconLibrary} from "@fortawesome/angular-fontawesome";


@Component({
  selector: 'app-personal-card',
  templateUrl: './personal-card.component.html',
  styleUrls: ['./personal-card.component.css'],
})
export class PersonalCardComponent implements OnInit, OnDestroy {
  avatarUrl: string = '';
  avtSubscription!: Subscription;
  // Icons



  constructor(private firebaseService: FirebaseService,
            public lib:FaIconLibrary) {}

  ngOnDestroy(): void {
    if (this.avtSubscription) {
      this.avtSubscription.unsubscribe();
    }
  }

  ngOnInit() {
    this.avtSubscription = this.firebaseService
      .getAvatarfromStorage()
      .subscribe((avtObj) => {
        this.avatarUrl = avtObj.payload.child('downloadURL').val();
        console.log(this.avatarUrl);
      });
  }

  onClick() {}
}
