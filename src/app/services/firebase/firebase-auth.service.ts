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

export interface SignUpOptions {
    type: string;
    firstName?: string;
    lastName?: string;
}

@Injectable()
export class FirebaseAuthService {

    public userData: Observable<User>;

    constructor(private afAuth: AngularFireAuth,
                private afs: AngularFirestore,
                private router: Router,
                private ngZone: NgZone) {
        this.afAuth.authState.subscribe(async user => {
            if (user) {
                const userRef: AngularFirestoreDocument<User> = this.afs.doc(`users/${user.uid}`);
                await this.checkEmailVerifacation(userRef, user);
                this.userData = userRef.valueChanges();
                this.checkEmailVerifacation(userRef, user);
                userRef.valueChanges().subscribe((res) => {
                    console.log(res);
                });
            } else {
                this.userData = null;
            }
        });
    }

    async checkEmailVerifacation(userRef: AngularFirestoreDocument<User>, fbUser: FirebaseUser) {
        const user = await userRef.get().toPromise();
        if (user.data() && user.data().emailVerified !== fbUser.emailVerified) {
            userRef.update({
                emailVerified: true
            });
        }
    }

    signIn(email: string, password: string) {
        return new Promise((resolve, reject) => {
            this.afAuth.auth.signInWithEmailAndPassword(email, password)
                .then((result) => {
                    this.ngZone.run(() => {
                        this.router.navigate(['main']);
                    });
                }).catch((error) => {
                    reject(error.message);
                });
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

                this.setUserData(result.user, { type: result.additionalUserInfo.providerId });
            }).catch((error) => {
                console.log(error);
            });
    }

    signUp(email: string, password: string, firstName: string, lastName: string) {
        return new Promise((resolve, reject) => {
            this.afAuth.auth.createUserWithEmailAndPassword(email, password)
                .then((result) => {
                    this.sendVerificationMail();
                    this.setUserData(result.user, {
                        type: 'password',
                        firstName,
                        lastName
                    });
                    resolve(true);
                }).catch((error) => {
                    console.log(error.message);
                    reject(error);
                });
        });
    }

    sendVerificationMail() {
        return this.afAuth.auth.currentUser.sendEmailVerification()
            .then(() => {
                // this.router.navigate(['verify-email-address']);
            });
    }

    async setUserData(user: FirebaseUser, options: SignUpOptions) {
        const userRef: AngularFirestoreDocument<any> = this.afs.doc(`users/${user.uid}`);
        const userRefValue = await userRef.get().toPromise();
        if (!userRefValue.exists) {
            const userData: User = {
                uid: user.uid,
                email: user.email,
                displayName: user.displayName ? user.displayName : `${options.firstName} ${options.lastName}`,
                firstName: options.firstName ? options.firstName : null,
                lastName: options.lastName ? options.lastName : null,
                emailVerified: user.emailVerified,
                provider: options.type
            };
            return userRef.set(userData);
        }
    }

    signOut() {
        return this.afAuth.auth.signOut();
    }
}
