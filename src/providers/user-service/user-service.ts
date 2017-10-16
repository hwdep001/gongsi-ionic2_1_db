import { Injectable } from '@angular/core';

// firebase
import * as firebase from 'firebase';

// models
import { User } from './../../model/User';

@Injectable()
export class UserService {

  userRef: firebase.firestore.CollectionReference;

  constructor(

  ) {
    this.userRef = firebase.firestore().collection("users");
  }

  /**
   * Set user.
   * @param user 
   */
  async setUser(user: User) {
    let result: boolean = false;

    await this.userRef.doc(`${user.uid}`).set(user);

    return result;
  }


  /**
   * Update user.
   * @param user 
   */
  async updateUser(user: User) {
    let result: boolean = false;

    await this.userRef.doc(`${user.uid}`).update(user)
    .then( () => result = true)
    .catch(err => console.log('saveUser ERROR: ' + err.message));

    return result;
  }


  /**
   * Read user.
   * @param key 
   */
  async getUser(key: string) {
    let result: User;
    
    await this.userRef.doc(`${key}`).get().then(querySnapshot => {
      if(querySnapshot && querySnapshot.exists) {
        result = querySnapshot.data();
      }
    });

    return result;
  }

}
