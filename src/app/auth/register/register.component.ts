import { Component, OnInit } from '@angular/core';
import { FirebaseAuthService } from '../../services/firebase/firebase-auth.service';
import { FormGroup, FormBuilder, Validators, AbstractControl } from '@angular/forms';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss']
})
export class RegisterComponent implements OnInit {
  registrationForm: FormGroup;
  registrationSuccessed = false;
  registerError = false;

  constructor(private firebaseAuthService: FirebaseAuthService, private fb: FormBuilder) { }

  ngOnInit() {
    this.registrationForm = this.fb.group({
      firstName: [null, [Validators.required]],
      lastName: [null, [Validators.required]],
      email: [null, [Validators.required, Validators.email]],
      password: [null, [Validators.required, Validators.minLength(8)]],
      confirmPassword: [null, [Validators.required]]
    }, { validator: this.checkPasswords });
  }

  checkPasswords(group: FormGroup) {
    const pass = group.get('password').value;
    const confirmPass = group.get('confirmPassword').value;

    return pass === confirmPass ? null : { notSame: true };
  }

  signUp() {
    if (!this.registrationForm.valid) {
      this.validateForm();
    } else {
      this.firebaseAuthService.signUp(this.registrationForm.get('email').value.trim(), this.registrationForm.get('password').value,
        this.registrationForm.get('firstName').value.trim(), this.registrationForm.get('lastName').value.trim())
        .then(res => this.registrationSuccessed = true)
        .catch(err => {
          this.registerError = true;
        });
    }
  }

  validateForm() {
    for (const i in this.registrationForm.controls) {
      this.registrationForm.controls[i].markAsDirty();
      this.registrationForm.controls[i].updateValueAndValidity();
      this.registrationForm.controls[i].markAsTouched();
    }
  }

}
