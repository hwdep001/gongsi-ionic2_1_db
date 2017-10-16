import { Component } from '@angular/core';

// providers
import { AuthService } from './../../providers/auth-service/auth-service';

@Component({
  selector: 'page-signin',
  templateUrl: 'signin.html',
})
export class SigninPage {

  constructor(
    private _auth: AuthService
  ) {
  }

  ionViewDidLoad() {
    // console.log('==> ionViewDidLoad SigninPage');
  }

  signInWithGoogle() {
    this._auth.googleLogin()
    .then(() =>  {})
    .catch(error => console.log(error));;
  }
}
