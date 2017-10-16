import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';

// firebase
import * as firebase from 'firebase';

// providers
import { LoadingService } from './../../../providers/loading-service/loading-service';

// models

// pages
import { CatListPage } from './../../catMng/list/catList';

@Component({
  selector: 'page-subList',
  templateUrl: 'subList.html',
})
export class SubListPage {

  subRef: firebase.firestore.CollectionReference;

  subs: Array<firebase.firestore.DocumentSnapshot>;

  constructor(
    public navCtrl: NavController,
    private _loading: LoadingService
  ) {
    this.initData();
  }

  ionViewDidLoad() {
    // console.log('ionViewDidLoad SubListPage');
  }

  initData() {
    this.subRef = firebase.firestore().collection("words");
    this.getCatList();
  }

  getCatList() {
    const loader = this._loading.getLoader(null, null);
    loader.present();

    this.subRef.orderBy("num").get().then(querySnapshot => {

      let subs = [];
      
      querySnapshot.forEach( sub => {
        if(sub && sub.exists) {
          subs.push(sub);
        }
      });

      this.subs = subs;
      
      loader.dismiss();
    });
  }

  clickSub(subDS: firebase.firestore.DocumentSnapshot) {
    this.navCtrl.push(CatListPage, {type: 0, key: subDS.id});
  }

}
