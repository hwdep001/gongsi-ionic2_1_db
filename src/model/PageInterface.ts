export interface PageInterface {
    title: string;
    name?: string;
    component: any;
    icon: string;
    signout?: boolean;
    index?: number;
    tabName?: string;
    tabComponent?: any;
    param?: CustomObject;
  }