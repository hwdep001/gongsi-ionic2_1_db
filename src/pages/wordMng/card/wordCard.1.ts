// import { Component } from '@angular/core';
// import { NavParams } from 'ionic-angular';

// // firebase
// import * as firebase from 'firebase';

// // providers
// import { LoadingService } from './../../../providers/loading-service/loading-service';
// import { WordLevelService } from './../../../providers/word-level-service/word-level-service';

// // models
// import { Word } from './../../../model/Word';

// @Component({
//   selector: 'page-wordCard',
//   templateUrl: 'wordCard.html',
// })
// export class WordCardPage {

//   words: Array<firebase.firestore.DocumentSnapshot>;
//   curWord: firebase.firestore.DocumentSnapshot;
//   curLv: number = 0;

//   bodyFlag: boolean = false;

//   constructor(
//     private param: NavParams,
//     private _loading: LoadingService,
//     private _wlv: WordLevelService
//   ) {
//     this.initData();
//   }
  
//   ionViewDidLoad() {
//     // console.log('==> ionViewDidLoad WordCardPage');
//   }

//   initData() {
//     let loading = this._loading.getLoader(null, null);
//     loading.present();
    
//     this.words = this.param.get("wordDSs");
//     this.setCurWord(this.words[0]);

//     loading.dismiss();
//   }

//   setCurWord(wordDS: firebase.firestore.DocumentSnapshot) {
//     this.curWord = wordDS;
//     let word = new Word(this.curWord.data());
//     word.key = wordDS.id;

//     this._wlv.selectLevel(word).then(level => {
//       this.curLv = level;
//     });
//   }

//   prevWord(index: number) {
//     this.bodyFlag = false;
//     if( (index-1) > 0 ) {
//       this.setCurWord(this.words[index-1-1]);
//     } else {
//       this.setCurWord(this.curWord = this.words[this.words.length-1]);
//     }
//   }

//   nextWord(index: number) {
//     this.bodyFlag = false;
//     if( (index+1) <= this.words.length ) {
//       this.setCurWord(this.curWord = this.words[index]);
//     } else {
//       this.setCurWord(this.curWord = this.words[0]);
//     }
//   }

//   clickThumbs(thumbCode: number) {
//     const level = thumbCode + (this.curLv == undefined ? 0 : this.curLv);
//     let word = new Word(this.curWord.data());
//     word.key = this.curWord.id;
//     word.level = level;

//     if(level > 2 || level < -2){
//       return;
//     } else if(this.curLv == undefined) {
//       this._wlv.insertLevel(word).then(_ => this.curLv = level);
//     } else {
//       this._wlv.updateLevel(word).then(_ => this.curLv = level);
//     }
//   }

// }