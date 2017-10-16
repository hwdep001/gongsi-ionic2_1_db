import { Component } from '@angular/core';
import { NavParams, NavController } from 'ionic-angular';

// providers


@Component({
  selector: 'page-userPhoto',
  templateUrl: 'userPhoto.html',
})
export class UserPhotoPage {

  photoURL: string;

  constructor(
    private param: NavParams,
    private navCtrl: NavController
  ) {
    this.photoURL = this.param.get('photoURL');
  }

  ionViewDidLoad() {
    // console.log('ionViewDidLoad UserPhotoPage');
  }

  closePhoto() {
    this.navCtrl.pop();
  }

}
