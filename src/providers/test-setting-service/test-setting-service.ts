import { Injectable } from '@angular/core';

// firebase
import * as firebase from 'firebase';

// models
import { NameValue } from './../../model/NameValue';

@Injectable()
export class TestSettingService {

  tsRef: firebase.firestore.CollectionReference;

  constructor() {
    this.tsRef = firebase.firestore().collection("testSetting");
  }

  getType(): Array<NameValue> {
    return new Array<NameValue>(
      { name: "카드", value: 0},
      { name: "객관식", value: 1},
    );;
  }

  getLevel(): Array<NameValue> {
    return new Array<NameValue>(
      { name: "Very easy", value: 2},
      { name: "Easy", value: 1},
      { name: "Normal", value: 0},
      { name: "Difficult", value: -1},
      { name: "Very Difficult", value: -2},
    );;
  }

  getCount(): Promise<firebase.firestore.QuerySnapshot> {
    return this.tsRef.doc("count").collection("list").orderBy("value").get();
  }

}
