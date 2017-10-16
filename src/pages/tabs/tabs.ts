import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';

import { Tab3Page } from './tab3/tab3';
import { Tab2Page } from './tab2/tab2';
import { Tab1Page } from './tab1/tab1';

@Component({
  selector: 'page-tabs',
  templateUrl: 'tabs.html',
})
export class TabsPage {

  tab1Root: any = Tab1Page;
  tab2Root: any = Tab2Page;
  tab3Root: any = Tab3Page;

  constructor() {
  }

}
