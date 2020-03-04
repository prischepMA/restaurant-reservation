import * as functions from 'firebase-functions';
import * as admin from 'firebase-admin';

admin.initializeApp();

export const usersCreate = functions.firestore
    .document('users/{userId}')
    .onCreate(async (snap, context) => {
        const user = snap.data();
        if (user && user.provider === 'facebook.com') {
            await snap.ref.set({
                emailVerified: true,
            }, { merge: true });
            return admin.auth().updateUser(user.uid, {
                emailVerified: true,
            });
        }

        return null;
    });