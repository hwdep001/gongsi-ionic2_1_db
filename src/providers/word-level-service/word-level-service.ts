import { Injectable } from '@angular/core';
import { SQLite, SQLiteObject } from '@ionic-native/sqlite';

// models
import { Word } from './../../model/Word';

@Injectable()
export class WordLevelService {

  private sql: SQLite;
  private sqlOb: SQLiteObject;

  constructor(
  ) {
    if(this.sqlOb == null) {
      this.createTable();
    }
  }

  createTable() {
    this.sql = new SQLite();
    this.sql.create({
      name: 'data.db',
      location: 'default'
    })
    .then( (db: SQLiteObject) => {
      const sql = "CREATE TABLE IF NOT EXISTS word_level (" 
                + "sub TEXT, cat TEXT, lec TEXT, word TEXT, lv INTEGER, "
                + "PRIMARY KEY(sub, cat, lec, word) )"
      db.executeSql(sql, {})
      .then(res => {
        console.log("TABLE CREATED: " + res);
        this.sqlOb = db;
      })
      .catch(e => console.log(e));
    }).catch(e => console.log(e));
  }

  public selectLevel(word: Word): Promise<number> {
    return new Promise((resolve, reject) => {
      const sql = "SELECT * FROM word_level WHERE sub=? AND cat=? AND lec=? AND word=?";
      const param = [word.subKey, word.catKey, word.lecKey, word.key];

      this.sqlOb.executeSql(sql, param).then((data) => {
        let lv: number;
        if(data.rows.length > 0) {
          for(let i = 0; i < data.rows.length; i++) {
            lv = data.rows.item(i).lv;
          }
        }
        resolve(lv);
      }, (error) => {
        reject(error);
      });
    });
  }

  public insertLevel(word: Word) {
    return new Promise((resolve, reject) => {
      const sql = "INSERT INTO word_level (sub, cat, lec, word, lv) VALUES (?, ?, ?, ?, ?)";
      const param = [word.subKey, word.catKey, word.lecKey, word.key, word.level];

      resolve(this.sqlOb.executeSql(sql, param));
    });
  }

  public updateLevel(word: Word) {
    return new Promise((resolve, reject) => {
      const sql = "UPDATE word_level SET lv=? WHERE sub=? AND cat=? AND lec=? AND word=?";
      const param = [word.level, word.subKey, word.catKey, word.lecKey, word.key];

      resolve(this.sqlOb.executeSql(sql, param));
    });
  }

  public deleteLevel(word: Word) {
    return new Promise((resolve, reject) => {
      const sql = "DELETE FROM word_level WHERE sub=? AND cat=? AND lec=? AND word=?";
      const param = [word.subKey, word.catKey, word.lecKey, word.key];

      resolve(this.sqlOb.executeSql(sql, param));
    });
  }

  public deleteAllLevel() {
    return new Promise((resolve, reject) => {
      const sql = "DELETE FROM word_level";
      const param = [];

      resolve(this.sqlOb.executeSql(sql, param));
    });
  }
}
