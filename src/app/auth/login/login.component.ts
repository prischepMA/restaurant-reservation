import { Component, OnInit } from '@angular/core';
import { FirebaseAuthService } from '../../services/firebase/firebase-auth.service';
import { FormBuilder, Validators, FormGroup } from '@angular/forms';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  passwordVisible = false;
  loginForm: FormGroup;
  loginError = false;

  constructor(private firebaseAuthService: FirebaseAuthService, private fb: FormBuilder) { }

  ngOnInit() {
    this.loginForm = this.fb.group({
      email: [null, [Validators.required, Validators.email]],
      password: [null, [Validators.required]],
    });
  }

  signIn() {
    this.loginError = false;
    if (!this.loginForm.valid) {
      this.validateForm();
    } else {
      this.firebaseAuthService.signIn(this.loginForm.controls.email.value.trim(), this.loginForm.controls.password.value)
        .catch(error => {
          this.loginError = true;
          this.loginForm.reset();
          this.validateForm();
        });
    }
  }

  validateForm() {
    for (const i in this.loginForm.controls) {
      this.loginForm.controls[i].markAsDirty();
      this.loginForm.controls[i].updateValueAndValidity();
      this.loginForm.controls[i].markAsTouched();
    }
  }
}
