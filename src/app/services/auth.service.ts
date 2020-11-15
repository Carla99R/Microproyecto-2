import { Injectable } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/auth';
import { AngularFirestore } from '@angular/fire/firestore';
import { Router } from '@angular/router';
import firebase from 'firebase';
// import { firestore } from 'firebase-admin';
import { Observable } from 'rxjs';
import { FavCharacters } from '../models/FavCharacter';
import firestore from 'firebase';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  user: Observable<firebase.User>;
  userId: string;
  us;
  constructor(
    private afAuth: AngularFireAuth,
    private db: AngularFirestore,
    private router: Router,
  ) {
    this.user = afAuth.authState;
    this.user.subscribe(u => {
      if (u) {
        this.us = u;
        this.userId = u.uid;
      }
    });
  }

  async login(): Promise<void> {
    const provider = new firebase.auth.GoogleAuthProvider();
    await this.afAuth.signInWithPopup(provider);
  }

  authStateUser(): Observable<firebase.User> {
    return this.afAuth.authState;

  }

  signOut(): void {
    this.afAuth.signOut().then(s => {
      // Sign-out successful.
    }).catch((error) => {
      // An error happened.
    });
  }

  async addFavorites(id: number) {
    await this.db.collection('Favorites').doc(this.userId).get().subscribe(a => {
      if (a.exists) {
        this.db.collection('Favorites').doc(this.userId).update({
          favorites: firestore.firestore.FieldValue.arrayUnion(id),
        });
      } else {
        this.db.collection<FavCharacters>('Favorites').doc(this.userId).set({
          favorites: firestore.firestore.FieldValue.arrayUnion(id)
        });
      }
    });

  }

  deleteFavorites(id: number) {
    this.db.collection('Favorites').doc(this.userId).update({
      favorites: firestore.firestore.FieldValue.arrayRemove(id),
    });
  }

  getFavorites(id) {
    return this.db.collection<FavCharacters>('Favorites').doc(id).valueChanges();
  }


}
