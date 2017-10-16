import { Word } from './../../../model/Word';
import { CommonUtil } from './../../../utils/commonUtil';
import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';

// firebase
import * as firebase from 'firebase';

// providers
import { LoadingService } from './../../../providers/loading-service/loading-service';
import { TestSettingService } from './../../../providers/test-setting-service/test-setting-service';

// models
import { NameValue } from './../../../model/NameValue';

// pages
import { WordCardPage } from './../../wordMng/card/wordCard';

@Component({
  selector: 'page-lecTest',
  templateUrl: 'lecTest.html',
})
export class LecTestPage {

  cat: firebase.firestore.DocumentSnapshot;
  lecs: Array<firebase.firestore.DocumentSnapshot>;

  lecRange: any = { lower: 1, upper: 1 };

  selectTestType: number;
  selectTestLvs: Array<number>;
  selectTestCnt: number;
  selectLecType: number = 0;  // 0: Checkbox, 1: Range

  testTypes: Array<NameValue>;
  testLvs: Array<NameValue>;
  testCnts: Array<any>;
  
  isStartBtn: boolean = false;

  // checkbox
  cbA: boolean = false;
  cbs: Array<boolean>;

  constructor(
    public navCtrl: NavController,
    private param: NavParams,
    private _loading: LoadingService,
    private _ts: TestSettingService
  ) {
    this.initData();
  }

  ionViewDidLoad() {
    // console.log('ionViewDidLoad LecTestPage');
  }

  initData() {
    this.cat = this.param.get(`catDS`);

    this.getLecList();
    this.getTestType();
    this.getTestLv();
    this.getTestCnt();
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
      this.initCheckbox(false);
      
      loader.dismiss();
    });
  }
  
  initCheckbox(bl: boolean) {
    const size = this.lecs.length;
    this.cbA = bl;
    this.cbs = new Array<boolean>();
    for(let i=0; i< size; i++) {
      this.cbs.push(bl);
    }

    this.lecRange = { lower: 1, upper: size };
  }

  checkCb(cb: boolean) {
    if(!cb) {
      this.cbA = false;
    } else {
      let result: boolean = true;
      this.cbs.every( (ele, index) => {
        if(!ele) {
          this.cbA = false;
          result = false;
        }
        return ele;
      });
      if(result) {this.cbA = true;}
    }
  }

  checkStartBtn() {
    if(this.selectTestLvs.length == 0) {
      this.isStartBtn = false;
      return;
    }

    if(this.selectLecType == 0) {
      let isExistTrue: boolean = false;
      this.cbs.every( (ele, index) => {
        if(ele) {
          isExistTrue = true;
        }
        return !ele;
      });
      if(!isExistTrue) {
        this.isStartBtn = false;
        return;
      }
    }

    this.isStartBtn = true;
  }

  getTestType() {
    this.testTypes = this._ts.getType();
    this.selectTestType = this.testTypes[0].value;
  }

  getTestLv() {
    this.selectTestLvs = new Array<number>();
    this.testLvs = this._ts.getLevel();
    this.testLvs.forEach(lv => {
      this.selectTestLvs.push(lv.value);
    })
  }

  getTestCnt() {
    this.testCnts = new Array<any>();
    this._ts.getCount().then(qss => {
      qss.forEach(tcDss => {
        if(tcDss && tcDss.exists) { this.testCnts.push(tcDss.data()); }
      });
      this.selectTestCnt = this.testCnts[0].value;
    });
  }

  async startTest() {
    let st = new Date().getTime();
    console.log("----------------------------------");
    console.log("type : " + this.selectTestType);
    console.log("level: " + this.selectTestLvs);
    console.log("count: " + this.selectTestCnt);

    let wordRefs: Array<firebase.firestore.DocumentReference> = new Array();

    if(this.selectLecType == 0) {
      // checkbox
      for(let i=0; i<this.cbs.length; i++) {
        if(this.cbs[i]) {
          wordRefs.pushArray(this.cat.data()[this.lecs[i].id]);
        }
      }
    } else {
      // range
      for(let i=this.lecRange.lower; i<=this.lecRange.upper; i++) {
        wordRefs.pushArray(this.cat.data()[this.lecs[i-1].id]);
      }
    }
    console.log("wordRefs length: " + wordRefs.length);

    [0,1,3].forEach(i => {
      wordRefs.shuffleArray();
    });
      
    const searchSize: number = this.selectTestCnt > wordRefs.length ? wordRefs.length : this.selectTestCnt;
    wordRefs.splice(searchSize);

    console.log("wordRefs length: " + wordRefs.length);
    console.log("time : " + CommonUtil.msToHH_mm_ss(new Date().getTime()-st));
    console.log("----------------------------------");

    this.navCtrl.push(WordCardPage, {wordDRs: wordRefs});
  }
}