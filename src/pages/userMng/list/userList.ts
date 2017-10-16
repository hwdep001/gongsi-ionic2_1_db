import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';

// firebase
import * as firebase from 'firebase';

// providers
import { LoadingService } from './../../../providers/loading-service/loading-service';

// pages
import { UserInfoPage } from './../info/userInfo';
import { UserPhotoPage } from './../photo/userPhoto';

@Component({
  selector: 'page-userList',
  templateUrl: 'userList.html',
})
export class UserListPage {

  userRef: firebase.firestore.CollectionReference;
  userUnSub: any;

  userList: Array<any>;
  loadedUserList: Array<any>;
  
  searchVal: string;
  searchClicked: boolean = false;

  constructor(
    public navCtrl: NavController,
    private _loading: LoadingService
  ) {
  }

  ionViewDidEnter() {
    this.initData();
    // console.log('ionViewDidEnter UserInfoPage');
  }
  
  ionViewWillLeave() {
    this.userUnSub();
    // console.log('ionViewWillLeave UserInfoPage');
  }

  initData() {
    this.userRef = firebase.firestore().collection("users");
    this.getUserList();
  }

  getUserList() {
    const loader = this._loading.getLoader(null, null);
    loader.present();

    this.userUnSub = this.userRef.orderBy("name").onSnapshot(querySnapshot => {

      let users = [];
      
      querySnapshot.forEach( user => {
        if(user && user.exists) {
          users.push(user.data());
        }
      });

      this.loadedUserList = users;
      this.initializeUsers();

      if(this.searchClicked) {
        this.searchUsers({
          target: {
            value: this.searchVal
          }
        });
      }
      
      loader.dismiss();
    });
  }

  initializeUsers(): void {
    this.userList = this.loadedUserList;
  }

  searchUsers(ev: any) {
    // Reset items back to all of the items
    this.initializeUsers();

    // set val to the value of the searchbar
    let val = ev.target.value;

    // if the value is an empty string don't filter the items
    if (val && val.trim() != '') {
      this.userList = this.userList.filter((item) => {
        return (item.email.toLowerCase().indexOf(val.toLowerCase()) > -1 
          || item.name.toLowerCase().indexOf(val.toLowerCase()) > -1);
      })
    }
  }

  startSearch() {
    this.searchClicked = true;
  }

  clearSearch(ev: any) {
    ev.target.value = null;
  }

  cancelSearch() {
    this.searchClicked = false;
    this.searchVal = null;
    this.initializeUsers();
  }

  showUserPhoto(photoURL: string) {
    this.navCtrl.push(UserPhotoPage, {photoURL: photoURL});
  }

  showUserInfo(key: string){
    this.navCtrl.push(UserInfoPage, {key: key, type: 0});
  }

}
