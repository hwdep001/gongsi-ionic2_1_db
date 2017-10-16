import { LecTestPage } from './../test/lecTest';
import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';

// firebase
import * as firebase from 'firebase';

// providers
import { LoadingService } from './../../../providers/loading-service/loading-service';

// models

// pages
import { WordCardPage } from './../../wordMng/card/wordCard';

@Component({
  selector: 'page-lecList',
  templateUrl: 'lecList.html',
})
export class LecListPage {

  type: number; // 0: word mng, 1: study
  cat: firebase.firestore.DocumentSnapshot;
  lecs: Array<firebase.firestore.DocumentSnapshot>;

  constructor(
    public navCtrl: NavController,
    private param: NavParams,
    private _loading: LoadingService
  ) {
    this.initData();
  }

  ionViewDidLoad() {
    // console.log('ionViewDidLoad LecListPage');
  }

  initData() {
    this.type = this.param.get('type');
    this.cat = this.param.get(`catDS`);

    this.getLecList();
  }

  getLecList() {
    const loader = this._loading.getLoader(null, null);
    loader.present();

    this.cat.ref.collection("list").orderBy("num").get().then(querySnapshot => {

      let lecs = [];
      
      querySnapshot.forEach( lec => {
        if(lec && lec.exists) {
          lecs.push(lec);
        }
      });

      this.lecs = lecs;
      
      loader.dismiss();
    });
  }

  clickLec(lecDS: firebase.firestore.DocumentSnapshot) {

    let wordDRs: Array<firebase.firestore.DocumentReference> = new Array();
    lecDS.ref.collection("list").orderBy("num").get().then(qss => {
      qss.forEach(word => {
        if(word && word.exists) {wordDRs.push(word.ref)}
      });

      this.navCtrl.push(WordCardPage, {wordDRs: wordDRs});
    });
  }

  moveLecTestPage() {
    this.navCtrl.push(LecTestPage, {catDS: this.cat});
  }
}