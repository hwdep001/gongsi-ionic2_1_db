export interface WordInterface {
  head1?: string;
  head2?: string;
  body1?: string;
  body2?: string;
  num?: number;

  subKey?: string;
  catKey?: string;
  lecKey?: string;

  //
  level?: number;
}

export class Word implements WordInterface {
  key?: string;
  head1?: string;
  head2?: string;
  body1?: string;
  body2?: string;
  num?: number;
  
  subKey?: string;
  catKey?: string;
  lecKey?: string;

  //
  level?: number;

  constructor(obj?: WordInterface){
      this.head1 = obj && obj.head1 || null;
      this.head2 = obj && obj.head2 || null;
      this.body1 = obj && obj.body1 || null;
      this.body2 = obj && obj.body2 || null;
      this.num = obj && obj.num || 0;

      this.subKey = obj && obj.subKey || null;
      this.catKey = obj && obj.catKey || null;
      this.lecKey = obj && obj.lecKey || null;

      this.level = obj && obj.level || 0;
  }
}