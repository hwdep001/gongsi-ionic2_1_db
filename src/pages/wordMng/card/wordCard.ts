import { Component } from '@angular/core';
import { NavParams } from 'ionic-angular';

// firebase
import * as firebase from 'firebase';

// providers
import { LoadingService } from './../../../providers/loading-service/loading-service';
import { WordLevelService } from './../../../providers/word-level-service/word-level-service';

// models
import { Word } from './../../../model/Word';

@Component({
  selector: 'page-wordCard',
  templateUrl: 'wordCard.html',
})
export class WordCardPage {

  words: Array<firebase.firestore.DocumentReference>;
  curWord: Word = new Word();
  curLv: number = 0;

  bodyFlag: boolean = false;

  constructor(
    private param: NavParams,
    private _loading: LoadingService,
    private _wlv: WordLevelService
  ) {
    this.initData();
  }
  
  ionViewDidLoad() {
    // console.log('==> ionViewDidLoad WordCardPage');
  }

  initData() {
    let loading = this._loading.getLoader(null, null);
    loading.present();
    
    this.words = this.param.get("wordDRs");
    this.setCurWord(0);

    loading.dismiss();
  }

  setCurWord(index: number) {
    this.words[index].get().then(dss => {
      this.curWord = new Word(dss.data());
      this.curWord.key = dss.id;
      this.curWord.num = index + 1;

      this._wlv.selectLevel(this.curWord).then(level => {
        this.curLv = level;
      });
    })
  }

  prevWord(index: number) {
    this.bodyFlag = false;
    if( (index-1) > 0 ) {
      this.setCurWord(index-1-1);
    } else {
      this.setCurWord(this.words.length-1);
    }
  }

  nextWord(index: number) {
    this.bodyFlag = false;
    if( (index+1) <= this.words.length ) {
      this.setCurWord(index);
    } else {
      this.setCurWord(0);
    }
  }

  clickThumbs(thumbCode: number) {
    // const level = thumbCode + (this.curLv == undefined ? 0 : this.curLv);
    // let word = new Word(this.curWord.data());
    // word.key = this.curWord.id;
    // word.level = level;

    // if(level > 2 || level < -2){
    //   return;
    // } else if(this.curLv == undefined) {
    //   this._wlv.insertLevel(word).then(_ => this.curLv = level);
    // } else {
    //   this._wlv.updateLevel(word).then(_ => this.curLv = level);
    // }
  }

}