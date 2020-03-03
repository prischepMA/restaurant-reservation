import { Component, OnInit } from '@angular/core';
import { FirebaseAuthService } from '../../services/firebase/firebase-auth.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss']
})
export class RegisterComponent implements OnInit {

  constructor(private firebaseAuthService: FirebaseAuthService) { }

  ngOnInit() {
  }

  signUp() {
    this.firebaseAuthService.signUp('ya.pryshchep@yandex.by', '123456789');
  }

}
