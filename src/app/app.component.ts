import { Component } from '@angular/core';
import { Store, select } from '@ngrx/store';
import { State, showHeaderFooter } from './router-store/reducers';
import { Router } from '@angular/router';
import { FirebaseAuthService } from './services/firebase/firebase-auth.service';

import { AngularFirestore, AngularFirestoreDocument } from '@angular/fire/firestore';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {

  showHeaderFooter$;

  constructor(private state: Store<State>,
              private router: Router,
              private firebaseAuthService: FirebaseAuthService) {
    this.showHeaderFooter$ = this.state.pipe(select(showHeaderFooter));
  }

  navigateToLoginPage() {
    this.router.navigate(['/auth/login']);
  }

  logout() {
    this.firebaseAuthService.signOut();
  }

  isLoggedIn() {
    return this.firebaseAuthService.userData;
  }

}
