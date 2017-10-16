import { Component } from '@angular/core';

// providers
import { AuthService } from './../../providers/auth-service/auth-service';

@Component({
  selector: 'page-home',
  templateUrl: 'home.html',
})
export class HomePage {

  constructor(
    private _auth: AuthService
  ) {
  }

  ionViewDidLoad() {
    // console.log('ionViewDidLoad HomePage');
  }

  clickSignOutBtn() {
    this._auth.signOut();
  }

}
