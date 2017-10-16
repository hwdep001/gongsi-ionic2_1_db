export interface LectureInterface {
  name?: string;
  num?: number;

  list?: Array<any>;

  //
  bl?: boolean;
}

export class Lecture implements LectureInterface {
  name?: string;
  num?: number;

  list?: Array<any>;

  //
  bl?: boolean;

  constructor(obj?: LectureInterface){
      this.name = obj && obj.name || null;
      this.num = obj && obj.num || 0;
      this.list = obj && obj.list || null;
      this.bl = obj && obj.bl || false;
  }
}