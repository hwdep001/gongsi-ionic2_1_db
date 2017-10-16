import { Component } from '@angular/core';

import * as firebase from 'firebase';

import { WordLevelService } from './../../../providers/word-level-service/word-level-service';

import { Subject } from './../../../model/Subject';

@Component({
  selector: 'page-tab1',
  templateUrl: 'tab1.html'
})
export class Tab1Page {

  wordRef: firebase.firestore.CollectionReference;
  subs: Array<any>;

  // test config
  testRef: firebase.firestore.CollectionReference;

  constructor(
    private _wlv: WordLevelService
  ) {
    this.wordRef = firebase.firestore().collection("words");
    this.testRef = firebase.firestore().collection("testSetting");
    this.subs = [
      new Subject({key: "ew", name: '영단어', num: 1}), 
      new Subject({key: "lw", name: '외래어', num: 2})
    ];
  }

  createSubject() {
    this.subs.forEach(sub => {
      this.wordRef.doc(`${sub.key}`).set(Object.assign({}, sub));
    });
  }

  removeSubject() {
    this.subs.forEach(sub => {
      this.wordRef.doc(`${sub.key}`).delete();
    });
  }

  createCategory() {
    this.subs.forEach(sub => {
      for(let i=1; i<=2; i++) {
        this.wordRef.doc(`${sub.key}`).collection("list").add({
          name: `C${i}`,
          num: i
        })
        // .then(docRef => {
        //   docRef.update({key: docRef.id});
        // });
      }
    });
  }

  removeCategory() {
    this.subs.forEach(sub => {
      this.wordRef.doc(`${sub.key}`).collection("list").get().then(querySnapshot => {
        querySnapshot.forEach(cat => {
          if(cat && cat.exists) {
            cat.ref.delete();
          }
        });
      });
    });
  }

  createLecture() {
    this.subs.forEach(sub => {
      this.wordRef.doc(`${sub.key}`).collection("list").orderBy("num").get().then(querySnapshot => {
        querySnapshot.forEach(cat => {
          if(cat && cat.exists) {
            for(let i=1; i<=2; i++) {
              cat.ref.collection("list").add({
                name: `L${i}`,
                num: i
              })
              // .then(docRef => {
              //   docRef.update({key: docRef.id});
              // });
            }
          }
        });
      });
    });
  }

  removeLecture() {
    this.subs.forEach(sub => {
      this.wordRef.doc(`${sub.key}`).collection("list").get().then(querySnapshot => {
        querySnapshot.forEach(cat => {
          if(cat && cat.exists) {
            cat.ref.collection("list").get().then(querySnapshot => {
              querySnapshot.forEach(lec => {
                if(lec && lec.exists) {
                  lec.ref.delete();
                }
              });
            });
          }
        });
      });
    });
  }

  createWord() {
    this.subs.forEach(sub => {
      this.wordRef.doc(`${sub.key}`).collection("list").orderBy("num").get().then(querySnapshot => {
        querySnapshot.forEach(cat => {
          if(cat && cat.exists) {
            cat.ref.collection("list").get().then(querySnapshot => {
              querySnapshot.forEach(lec => {
                if(lec && lec.exists) {
                  for(let i=1; i<=2; i++) {
                    lec.ref.collection("list").add({
                      head1: `W${i}-h1`,
                      head2: `W${i}-h2`,
                      body1: `W${i}-b1`,
                      body2: `W${i}-b2`,
                      num: i,
                      subKey: sub.key,
                      catKey: cat.id,
                      catName: cat.data().name,
                      lecKey: lec.id,
                      lecName: lec.data().name
                    })
                    // .then(docRef => {
                    //   docRef.update({key: docRef.id});
                    // });
                  }
                }
              });
            });
          }
        });
      });
    });
  }

  removeWord() {
    this.subs.forEach(sub => {
      this.wordRef.doc(`${sub.key}`).collection("list").orderBy("num").get().then(querySnapshot => {
        querySnapshot.forEach(cat => {
          if(cat && cat.exists) {
            cat.ref.collection("list").get().then(querySnapshot => {
              querySnapshot.forEach(lec => {
                if(lec && lec.exists) {
                  lec.ref.collection("list").get().then(querySnapshot => {
                    querySnapshot.forEach(word => {
                      if(word && word.exists) {
                        word.ref.delete();
                      }
                    });
                  });
                }
              });
            });
          }
        });
      });
    });
  }

  deleteLevel() {
    this._wlv.deleteAllLevel();
  }

  createTestType() {
    const ref = this.testRef.doc("type").collection("list");
    ref.doc("0").set({
      name:"카드",
      value: 0
    });
    ref.doc("1").set({
      name:"객관식",
      value: 1
    });
  }

  createWorldLevel() {
    const ref = this.testRef.doc("level").collection("list");
    ref.doc("2").set({
      name:"Very easy",
      value: 2
    });
    ref.doc("1").set({
      name:"Easy",
      value: 1
    });
    ref.doc("0").set({
      name:"Normal",
      value: 0
    });
    ref.doc("-1").set({
      name:"Difficult",
      value: -1
    });
    ref.doc("-2").set({
      name:"Very difficult",
      value: -2
    });
  }

  createTestCnt() {
    const ref = this.testRef.doc("count").collection("list");
    for(let i=10; i<=200; i=i+10) {
      ref.doc(`${i}`).set({
        value: i
      });
    }
  }



  /////////////////////////////////////////////////////////////////////
  /////////////////////////////////////////////////////////////////////
  /////////////////////////////////////////////////////////////////////
  
  createGss() {
    const subKey = "ew";
    const catName = "경선식";
    this.wordRef.doc(`${subKey}`).collection("list").add({
      name: "경선식",
      num: 3
    }).then(catRef => {
      const catKey = catRef.id;
      for(let i=1; i<=80; i++) {
        let lecName = (i<10 ? '0'+i : i);
        catRef.collection("list").add({
          name: lecName,
          num: i
        }).then(lecRef => {
          const lecKey = lecRef.id;
          for(let i=1; i<=60; i++) {
            lecRef.collection("list").add({
              head1: `W${i}-h1`,
              head2: `W${i}-h2`,
              body1: `W${i}-b1`,
              body2: `W${i}-b2`,
              num: i,
              subKey: subKey,
              catKey: catKey,
              catName: catName,
              lecKey: lecKey,
              lecName: lecName
            })
          }
        })
      }
    });
  }

  removeGss() {
    this.wordRef.doc(`ew`).collection("list").where("name", "==", "경선식").get().then(qss => {
      qss.forEach(dss => {
        dss.ref.delete();
      })
    })
  }
}
