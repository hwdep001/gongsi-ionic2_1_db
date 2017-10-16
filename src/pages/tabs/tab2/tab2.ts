import { CommonUtil } from './../../../utils/commonUtil';
import { Subject } from './../../../model/Subject';
import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';

// firebase
import * as firebase from 'firebase';

@Component({
  selector: 'page-tab2',
  templateUrl: 'tab2.html'
})
export class Tab2Page {

  wordRef: firebase.firestore.CollectionReference;
  subs: Array<any>;

  constructor(
    public navCtrl: NavController
  ) {
    this.wordRef = firebase.firestore().collection("words");
    this.subs = [
      new Subject({key: "ew", name: '영단어', num: 1}), 
      // new Subject({key: "lw", name: '외래어', num: 2})
    ];
  }

  createSubject() {
    this.subs.forEach(sub => {
      this.wordRef.doc(`${sub.key}`).set(Object.assign({}, sub));
    });
  }

  createCategory() {
    this.subs.forEach(sub => {
      for(let i=1; i<=1; i++) {
        let catName: string = `C${i}`;
        this.wordRef.doc(`${sub.key}`).collection("list").doc(catName).set({
          name: catName,
          num: i
        });
      }
    });
  }

  createLecture() {
    this.subs.forEach(sub => {
      this.wordRef.doc(`${sub.key}`).collection("list").orderBy("num").get().then(querySnapshot => {
        querySnapshot.forEach(cat => {
          if(cat && cat.exists) {
            for(let i=1; i<=2; i++) {
              let lecName: string = `L${i}`;
              cat.ref.collection("list").doc(lecName).set({
                name: lecName,
                num: i,
                bl: false
              });
            }
          }
        });
      });
    });
  }

  async createWord() {
    const st = new Date().getTime();

    for(let sub of this.subs) {
      // console.log(sub.key + ": start---------------------------");
      
      let subQss: firebase.firestore.QuerySnapshot;
      let catQss: firebase.firestore.QuerySnapshot;
      let lecQss: firebase.firestore.QuerySnapshot;
      let wordRef: firebase.firestore.DocumentReference;
      
      subQss = await this.wordRef.doc(`${sub.key}`).collection("list").orderBy("num").get();
    
      subQss.forEach(async catDss => {
        if(catDss && catDss.exists) {
          // console.log(sub.key + " - " + catDss.data().name + ": start---------------------------");
          catQss = await catDss.ref.collection("list").get();

          catQss.forEach(async lecDss => {
            if(lecDss && lecDss.exists) {

              // console.log(sub.key + " - " + catDss.data().name + " - " + lecDss.data().name + ": start---------------------------");
              
              for(let i=1; i<=2; i++) {
                // console.log(i+": start");
                
                wordRef = await lecDss.ref.collection("list").add({
                  head1: `W${i}-h1`,
                  head2: `W${i}-h2`,
                  body1: `W${i}-b1`,
                  body2: `W${i}-b2`,
                  num: i,
                  subKey: sub.key,
                  catKey: catDss.id,
                  lecKey: lecDss.id
                });
              }
              
              // console.log(sub.key + " - " + catDss.data().name + " - " + lecDss.data().name + ": end-----------------------------");
            }
          });

          // console.log(sub.key + " - " + catDss.data().name + ": end-----------------------------");
        }
      });
      // console.log(sub.key + ": end-----------------------------");
    }

    console.log(CommonUtil.msToHH_mm_ss(new Date().getTime() - st));
  }

  async syncWord() {

    for(let sub of this.subs) {
      const subQss = await this.wordRef.doc(`${sub.key}`).collection("list").get();
      subQss.forEach(async catDss => {
        if(catDss && catDss.exists) {
          const catQss = await catDss.ref.collection("list").get();
          
          catQss.forEach(async lecDss => {
            const lecKey = lecDss.id;
            let refArr = new Array();

            if(lecDss && lecDss.exists) {
              const lecQss = await lecDss.ref.collection("list").get();
              lecQss.forEach(async wordDss => {
                if(wordDss && wordDss.exists) {
                  refArr.push(wordDss.ref);
                }
              });
            }

            catDss.ref.update({
              [lecKey]: refArr
            });
          });
        }
      });
    }
  }


  createGss() {
    const subKey = "ew";
    const catKey = "경선식";
    const catRef = this.wordRef.doc(`${subKey}`).collection("list").doc(catKey);

    catRef.set({
      name: "경선식",
      num: 3
    }).then(() => {
      
      for(let i=1; i<=2; i++) {
        let lecKey: string = (i<10 ? '0'+i : i).toString();
        let lecRef = catRef.collection("list").doc(lecKey);
        catRef.collection("list").doc(lecKey).set({
          name: lecKey,
          num: i
        }).then(() => {
          
          for(let i=1; i<=60; i++) {
            lecRef.collection("list").add({
              head1: `W${i}-h1`,
              head2: `W${i}-h2`,
              body1: `W${i}-b1`,
              body2: `W${i}-b2`,
              num: i,
              subKey: subKey,
              catKey: catKey,
              lecKey: lecKey
            });
            // .then(docRef => {
            //   docRef.update({key: docRef.id});
            // });
          }
        })
      }
    });
  }


  async test1(){
    // let ref1 = firebase.firestore().collection("test").doc("k12Dkpqy7xuEEo4XU3MN");
    // let testDss1 = await ref1.get();
    // let t1 = testDss1.data().L1[0].users.user1;
    // console.log(t1);

    let item1 = firebase.database().ref("catgory2Id/list/subCategory1Id/list/item1Id");
    firebase.database().ref("test/L1/0").once('value', dss => {
      console.log();
      firebase.database().ref(dss.val().ref.pieces_.join("/")).once('value', dss => {
        dss.val().name;
      });
    });
    
    
  }

}
