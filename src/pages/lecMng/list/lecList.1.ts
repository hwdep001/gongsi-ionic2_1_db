// import { TestSettingService } from './../../../providers/test-setting-service/test-setting-service';
// import { Component } from '@angular/core';
// import { NavController, NavParams } from 'ionic-angular';

// // firebase
// import * as firebase from 'firebase';

// // providers
// import { LoadingService } from './../../../providers/loading-service/loading-service';

// // models

// // pages
// import { WordCardPage } from './../../wordMng/card/wordCard';

// @Component({
//   selector: 'page-lecList',
//   templateUrl: 'lecList.html',
// })
// export class LecListPage {

//   type: number; // 0: word mng, 1: study
//   cat: firebase.firestore.DocumentSnapshot;
//   lecs: Array<firebase.firestore.DocumentSnapshot>;

//   // for type1
//   isTest: boolean = false;
//   lecRange: any = { lower: 1, upper: 1 };

//   selectTestType: number;
//   testTypes: Array<any>;
//   selectTestLvs: Array<number>;
//   testLvs: Array<any>;
//   selectTestCnt: number;
//   testCnts: Array<any>;
  

//   // checkbox
//   cbA: boolean = false;
//   cbs: Array<boolean>;

//   constructor(
//     public navCtrl: NavController,
//     private param: NavParams,
//     private _loading: LoadingService,
//     private _ts: TestSettingService
//   ) {
//     this.initData();
//   }

//   ionViewDidLoad() {
//     // console.log('ionViewDidLoad LecListPage');
//   }

//   initData() {
//     this.type = this.param.get('type');
//     this.cat = this.param.get(`catDS`);

//     this.getLecList();
//     this.getTestType();
//     this.getTestLv();
//     this.getTestCnt();
//   }

//   getLecList() {
//     const loader = this._loading.getLoader(null, null);
//     loader.present();

//     this.cat.ref.collection("list").orderBy("num").get().then(querySnapshot => {

//       let lecs = [];
      
//       querySnapshot.forEach( lec => {
//         if(lec && lec.exists) {
//           lecs.push(lec);
//         }
//       });

//       this.lecs = lecs;
//       this.initCheckbox(false);
      
//       loader.dismiss();
//     });
//   }
  
//   initCheckbox(bl: boolean) {
//     const size = this.lecs.length;
//     this.cbA = bl;
//     this.cbs = new Array<boolean>();
//     for(let i=0; i< size; i++) {
//       this.cbs.push(bl);
//     }

//     this.lecRange = { lower: 1, upper: size };
//   }

//   clickLec(lecDS: firebase.firestore.DocumentSnapshot) {

//     if(this.isTest) {
//       return;
//     }

//     let wordDSs: Array<firebase.firestore.DocumentSnapshot> = new Array();
//     lecDS.ref.collection("list").orderBy("num").get().then(qss => {
//       qss.forEach(word => {
//         if(word && word.exists) {wordDSs.push(word)}
//       });

//       this.navCtrl.push(WordCardPage, {wordDSs: wordDSs});
//     });
//   }

//   changeIsTest() {
//     this.isTest = !this.isTest;
//     if(!this.isTest) {
//       this.initCheckbox(false);
//     }
//   }

//   checkCb(cb: boolean) {
//     if(!cb) {
//       this.cbA = false;
//     } else {
//       let result: boolean = true;
//       this.cbs.every( (ele, index) => {
//         if(!ele) {
//           this.cbA = false;
//           result = false;
//         }
//         return ele;
//       });
//       if(result) {this.cbA = true;}
//     }
//   }


//   // type: 1
//   getTestType() {
//     this.testTypes = new Array<any>();
//     this._ts.getType().then(qss => {
//       qss.forEach(ttDss => {
//         if(ttDss && ttDss.exists) { this.testTypes.push(ttDss.data()); }
//       });
//       this.selectTestType = this.testTypes[0].value;
//     });
//   }

//   getTestLv() {
//     this.testLvs = new Array<any>();
//     this.selectTestLvs = new Array<number>();
//     this._ts.getLevel().then(qss => {
//       qss.forEach(tlDss => {
//         if(tlDss && tlDss.exists) { 
//           this.testLvs.push(tlDss.data());
//           this.selectTestLvs.push(tlDss.data().value);
//         }
//       });
//     });
//   }

//   getTestCnt() {
//     this.testCnts = new Array<any>();
//     this._ts.getCount().then(qss => {
//       qss.forEach(tcDss => {
//         if(tcDss && tcDss.exists) { this.testCnts.push(tcDss.data()); }
//       });
//       this.selectTestCnt = this.testCnts[0].value;
//     });
//   }

//   async startTest() {
//     let wordDSs: Array<firebase.firestore.DocumentSnapshot> = new Array();
    
//     for(let i=0; i<this.cbs.length; i++) {
//       if(this.cbs[i]) {
//         await this.lecs[i].ref.collection("list").orderBy("num").get().then(qss => {
//           qss.forEach(word => {
//             if(word && word.exists) {wordDSs.push(word)}
//           });
//         });
//       }
//     }

//     this.navCtrl.push(WordCardPage, {wordDSs: wordDSs});
//   }
// }