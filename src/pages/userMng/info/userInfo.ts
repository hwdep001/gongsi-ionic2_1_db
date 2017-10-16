import { Component } from '@angular/core';
import { NavParams, NavController, AlertController, ToastController } from 'ionic-angular';

// firebase
import * as firebase from 'firebase';

// providers
import { AuthService } from './../../../providers/auth-service/auth-service';
import { UserService } from './../../../providers/user-service/user-service';
import { WordLevelService } from './../../../providers/word-level-service/word-level-service';

// models
import { User } from './../../../model/User';

// pages
import { UserPhotoPage } from './../photo/userPhoto';

@Component({
  selector: 'page-userInfo',
  templateUrl: 'userInfo.html',
})
export class UserInfoPage {

  key: string;
  type: number; // 1: my info, 0: user detail
  user: User = new User();

  userUnSub: any;

  constructor(
    private param: NavParams,
    private navCtrl: NavController,
    private alertCtrl: AlertController,
    private toastCtrl: ToastController,
    private _auth: AuthService,
    private _user: UserService,
    private _wlv: WordLevelService
  ) {
  }
  
  ionViewDidEnter() {
    this.initData();
  //   console.log('ionViewDidEnter UserInfoPage');
  }
  
  ionViewWillLeave() {
    this.userUnSub();
    // console.log('ionViewWillLeave UserInfoPage');
  }

  initData() {
    this.key = this.param.get('key');
    this.type = this.param.get('type');
    this.getUser();
  }

  getUser() {
    this.userUnSub = firebase.firestore().collection("users").doc(`${this.key}`).onSnapshot(doc => {
      if(doc && doc.exists) {
        this.user = doc.data();
      }
    });
  }

  showUserPhoto(photoURL: string) {
    this.navCtrl.push(UserPhotoPage, {photoURL: photoURL});
  }

  signOut() {
    this._auth.signOut();
  }

  deleteWordLevel() {
    this._wlv.deleteAllLevel().then(_ => {
      this.showToast("top", "초기화되었습니다.");
    })
  }

  changeAuth() {

    if(this._auth.min && this.user.uid == this._auth.uid) {
      return;
    }

    let alert = this.alertCtrl.create();
    alert.setTitle("인증 상태 변경");

    alert.addInput({
      type: 'radio',
      label: '승인',
      value: 'true',
      checked: this.user.authenticated ? true : false
    });
    alert.addInput({
      type: 'radio',
      label: '대기',
      value: 'false',
      checked: this.user.authenticated ? false : true
    });

    alert.addButton('Cancel');
    alert.addButton({
      text: 'Select',
      handler: data => {
        const sData: boolean = data == "true" ? true : false;
        if(this.user.authenticated != sData) {
          this._user.updateUser(new Object({
            uid: this.user.uid,
            authenticated: sData
          }))
          .then( result => {this.showToast("top", "변경되었습니다.")})
          .catch(error => {console.log("changeAuth - " + error)});
        }
      }
    });

    alert.present();
  }

  private showToast(position: string, message: string, duration?: number) {
    let toast = this.toastCtrl.create({
      message: message,
      position: position,
      duration: (duration == null) ? 2500 : duration
    });

    toast.present(toast);
  }

}
