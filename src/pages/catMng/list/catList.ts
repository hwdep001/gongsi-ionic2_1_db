import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';

// firebase
import * as firebase from 'firebase';

// providers
import { LoadingService } from './../../../providers/loading-service/loading-service';

// models

// pages
import { LecListPage } from './../../lecMng/list/lecList';

@Component({
  selector: 'page-catList',
  templateUrl: 'catList.html',
})
export class CatListPage {

  type: number;
  sub: firebase.firestore.DocumentSnapshot;

  cats: Array<firebase.firestore.DocumentSnapshot>;

  constructor(
    public navCtrl: NavController,
    private param: NavParams,
    private _loading: LoadingService
  ) {
    this.initData();
  }

  ionViewDidLoad() {
    // console.log('ionViewDidLoad CatListPage');
  }

  initData() {
    this.type = this.param.get('type');
    let subKey = this.param.get(`key`);

    this.getSubDS(subKey).then(dss => {
      if(dss && dss.exists) {
        this.sub = dss;
        this.getCatList();
      }
    });
  }

  getSubDS(subKey: string): Promise<firebase.firestore.DocumentSnapshot> {
    return firebase.firestore().collection("words").doc(`${subKey}`).get();
  }

  getCatList() {
    const loader = this._loading.getLoader(null, null);
    loader.present();

    this.sub.ref.collection("list").orderBy("num").get().then(querySnapshot => {

      let cats = [];
      
      querySnapshot.forEach( cat => {
        if(cat && cat.exists) {
          cats.push(cat);
        }
      });

      this.cats = cats;
      
      loader.dismiss();
    });
  }

  clickCat(catDS: firebase.firestore.DocumentSnapshot) {
    this.navCtrl.push(LecListPage, {type: this.type, catDS: catDS});
  }

}
