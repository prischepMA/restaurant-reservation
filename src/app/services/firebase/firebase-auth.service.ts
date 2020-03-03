import { Injectable, NgZone } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/auth';
import { AngularFirestore, AngularFirestoreDocument } from '@angular/fire/firestore';
import { Router } from '@angular/router';
import { auth } from 'firebase/app';
import { Observable } from 'rxjs';

export interface FirebaseUser {
    uid: string;
    email: string;
    displayName: string;
    photoURL: string;
    emailVerified: boolean;
}

export interface User {
    uid: string;
    email: string;
    firstName: string;
    lastName: string;
    emailVerified: boolean;
    displayName: string;
    provider: string;
}

@Injectable()
export class FirebaseAuthService {

    public userData: Observable<User>;

    constructor(private afAuth: AngularFireAuth,
                private afs: AngularFirestore,
                private router: Router,
                private ngZone: NgZone) {
        this.afAuth.authState.subscribe(user => {
            console.log('userState', user);
            if (user) {
                const userRef: AngularFirestoreDocument<User> = this.afs.doc(`users/${user.uid}`);
                this.userData = userRef.valueChanges();
                userRef.valueChanges().subscribe((res) => {
                    console.log(res);
                });
            } else {
                this.userData = null;
            }
        });
    }

    signIn(email: string, password: string) {
        return this.afAuth.auth.signInWithEmailAndPassword(email, password)
            .then((result) => {
                this.ngZone.run(() => {
                    this.router.navigate(['main']);
                });
            }).catch((error) => {
                console.log(error.message);
            });
    }

    googleAuth() {
        return this.authLogin(new auth.GoogleAuthProvider());
    }

    facebookAuth() {
        return this.authLogin(new auth.FacebookAuthProvider());
    }

    authLogin(provider) {
        return this.afAuth.auth.signInWithPopup(provider)
            .then((result) => {
                this.ngZone.run(() => {
                    this.router.navigate(['main']);
                });

                this.setUserData(result.user, result.additionalUserInfo.providerId);
            }).catch((error) => {
                console.log(error);
            });
    }

    signUp(email: string, password: string) {
        return this.afAuth.auth.createUserWithEmailAndPassword(email, password)
            .then((result) => {
                this.sendVerificationMail();
                this.setUserData(result.user, 'password');
            }).catch((error) => {
                console.log(error.message);
            });
    }

    sendVerificationMail() {
        return this.afAuth.auth.currentUser.sendEmailVerification()
            .then(() => {
                // this.router.navigate(['verify-email-address']);
            });
    }

    async setUserData(user: FirebaseUser, provider: string) {
        const userRef: AngularFirestoreDocument<any> = this.afs.doc(`users/${user.uid}`);
        const userRefValue = await userRef.get().toPromise();
        if (!userRefValue.exists) {
            const userData: User = {
                uid: user.uid,
                email: user.email,
                displayName: user.displayName,
                firstName: null,
                lastName: null,
                emailVerified: user.emailVerified,
                provider
            };
            return userRef.set(userData, {
                merge: true
            });
        }
    }

    signOut() {
        return this.afAuth.auth.signOut();
    }
}
