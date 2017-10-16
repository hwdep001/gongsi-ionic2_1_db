export interface CategoryInterface {
  name?: string;
  num?: number;

  list?: Array<any>;
}

export class Category implements CategoryInterface {
  name?: string;
  num?: number;

  list?: Array<any>;

  constructor(obj?: CategoryInterface) {
      this.name = obj && obj.name || null;
      this.num = obj && obj.num || 0;
      this.list = obj && obj.list || null;
  }
}