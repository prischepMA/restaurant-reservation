import { Component, OnInit } from '@angular/core';
import { FirebaseAuthService } from '../../services/firebase/firebase-auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  passwordVisible = false;

  constructor(private firebaseAuthService: FirebaseAuthService) { }

  ngOnInit() {
  }

  signIn() {
    this.firebaseAuthService.signIn('ya.pryshchep@yandex.by', '123456789');
  }
}
