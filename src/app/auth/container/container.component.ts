import { Component, OnInit } from '@angular/core';
import { FirebaseAuthService } from '../../services/firebase/firebase-auth.service';

@Component({
  selector: 'app-container',
  templateUrl: './container.component.html',
  styleUrls: ['./container.component.scss']
})
export class ContainerComponent implements OnInit {

  constructor(private firebaseAuthService: FirebaseAuthService) { }

  ngOnInit() {
  }

  signInWithGoogle() {
    this.firebaseAuthService.googleAuth();
  }

  signInWithFacebook() {
    this.firebaseAuthService.facebookAuth();
  }

}
