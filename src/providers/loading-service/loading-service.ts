import { Injectable } from '@angular/core';
import { LoadingController } from 'ionic-angular';

@Injectable()
export class LoadingService {

  constructor(
    private loadingCtrl: LoadingController
  ) {
    
  }

  getLoader(spinner: string, content: string, duration?: number, dismissOnPageChange?: boolean) {
    spinner = spinner ? spinner : "bubbles";
    content = content ? content : "Please wait...";
    duration = duration ? duration : 15000;
    dismissOnPageChange = dismissOnPageChange == true ? true : false;
    
    return this.loadingCtrl.create({
      spinner: spinner,
      content: content,
      duration: duration,
      dismissOnPageChange: dismissOnPageChange
    });
  }

}
