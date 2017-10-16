// default
import { Component, ViewChild } from '@angular/core';
import { Nav, Platform } from 'ionic-angular';
import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';

// add
import { App, MenuController, AlertController } from 'ionic-angular';

// firebase
import { AngularFireAuth } from 'angularfire2/auth';

// providers
import { Storage } from '@ionic/storage';
import { LoadingService } from './../providers/loading-service/loading-service';
import { AuthService } from './../providers/auth-service/auth-service';
import { WordLevelService } from './../providers/word-level-service/word-level-service';

// models
import { MenuTitleInterface } from './../model/MenuTitleInterface';
import { PageInterface } from './../model/PageInterface';

// pages
import { SigninPage } from './../pages/signin/signin';
import { HomePage } from './../pages/home/home';
import { UserListPage } from './../pages/userMng/list/userList';
  import { UserInfoPage } from './../pages/userMng/info/userInfo';
import { SubListPage } from './../pages/subMng/list/subList';
import { CatListPage } from './../pages/catMng/list/catList';
import { TabsPage } from './../pages/tabs/tabs';

// utils
import { CommonUtil } from './../utils/commonUtil';


@Component({
  templateUrl: 'app.html'
})
export class MyApp {
  @ViewChild(Nav) nav: Nav;

  rootPage:any;
  lastBack: any;
  
  navigatePages: PageInterface[];
  studyPages: PageInterface[];
  adminPages: PageInterface[];
  accountPages: PageInterface[];
  menuTitle: MenuTitleInterface = {
    header: null,
    navigate: null,
    study: null,
    admin: null,
    account: null
  }
  
  constructor(
    private platform: Platform,
    private statusBar: StatusBar, 
    private splashScreen: SplashScreen,

    private app: App,
    private menu: MenuController,
    private alertCtrl: AlertController,

    private afAuth: AngularFireAuth,
    private storage: Storage,
    private _loading: LoadingService,
    private _auth: AuthService,
    private _wlv: WordLevelService
  ) {
    this.initializeApp();
    this.subscribeAuth();
    CommonUtil.isNumberEmpty(1);
  }

  initializeApp() {
    this.platform.ready().then(() => {
      // Okay, so the platform is ready and our plugins are available.
      // Here you can do any higher level native things you might need.
      this.statusBar.styleDefault();
      this.splashScreen.hide();
      this.platform.registerBackButtonAction(() => this.exitApp());
      this.savePlatform();
    });
  }

  subscribeAuth() {
    this.afAuth.authState.subscribe((auth) => {
      this.initializeMenu(auth);
    });
  }

  async initializeMenu(auth) {
    let loader = this._loading.getLoader(null, null);
    loader.present();

    await this._auth.signinProcess(auth);
    this.setPages();

    loader.dismiss();
    if(auth != null && this._auth.authenticated) {
      this.nav.setRoot(HomePage);
    } else if(auth != null && !this._auth.authenticated) {
      this.nav.setRoot(UserInfoPage, {type: 1, key: this._auth.uid});
    } else {
      this.nav.setRoot(SigninPage);
    }
  }

  setPages() {
    const homePage: PageInterface = { title: '대시보드', name: 'HomePage',  component: HomePage, icon: 'home' };
    const tabsPage: PageInterface = { title: 'Tabs', name: 'TabsPage', component: TabsPage, icon: 'home'};
    const ewPage: PageInterface = { title: '영단어', name: 'EwPage',  component: CatListPage, param: {type: 1, key: "ew"}, icon: 'book' };
    const lwPage: PageInterface = { title: '외래어', name: 'LwPage',  component: CatListPage, param: {type: 1, key: "lw"}, icon: 'book' };
    const userListPage: PageInterface = { title: '유저 관리', name: 'UserListPage', component: UserListPage, icon: 'people'};
    const subListPage: PageInterface = { title: '단어 관리', name: 'SubListPage', component: SubListPage, icon: 'logo-wordpress'};
    const myInfoPage: PageInterface = { title: '내 정보', name: 'MyInfoPage', component: UserInfoPage, param: {type: 1, key: this._auth.uid, }, icon: 'information-circle'};

    if(this._auth.authenticated){
      this.navigatePages = [];
      this.navigatePages.push(homePage);

      this.studyPages = [];
      this.studyPages.push(ewPage);
      this.studyPages.push(lwPage);
    }

    if(this._auth.min) {
      this.adminPages = [];
      this.adminPages.push(userListPage);
      this.adminPages.push(subListPage);
      this.adminPages.push(tabsPage);
    }

    if(this._auth != null){
      this.accountPages = [];
      this.accountPages.push(myInfoPage);
    }

    this.menuTitle.header = "Menu";
    this.menuTitle.navigate = "Navigate";
    this.menuTitle.study = "Study";
    this.menuTitle.admin = "Admin";
    this.menuTitle.account = "Account";
  }

  savePlatform() {
    
    let thisPlatform = null;

    if(this.platform.is('browser')) {
      thisPlatform = "browser";
    } else if (this.platform.is('core')) {
      thisPlatform = "core";
    } else if (this.platform.is('android')) {
      thisPlatform = "android";
    } else if (this.platform.is('ios')) {
      thisPlatform = "ios";
    }

    this.storage.set("platform", thisPlatform)
    .then(platform => {
      console.log("MyApp - Current platform: " + platform);
    });
  }

  private exitApp() {
    
    const overlay = this.app._appRoot._overlayPortal.getActive();
    const nav = this.app.getActiveNavs()[0];

    if(this.menu.isOpen()) {
      this.menu.close();
    }else if(overlay && overlay.dismiss) {
      overlay.dismiss();
    } else if(nav.getActive().name == "TestCardPage"){
      this.showConfirmAlert("테스트를 종료하시겠습니까?", ()=> {
        nav.pop();  
      });
    } else if(nav.canGoBack()){
      nav.pop();
    } else if(Date.now() - this.lastBack < 500) {
      this.showConfirmAlert("EXIT?", () => {
        this.platform.exitApp();
      });
    }
    this.lastBack = Date.now();
  }

  openPage(page) {
    this.nav.setRoot(page.component, page.param);
  }

  isActive(page: PageInterface) {
    // let childNav = this.nav.getActiveChildNavs()[0];

    // Tabs are a special case because they have their own navigation
    // if (childNav) {
    //   if (childNav.getSelected() && childNav.getSelected().root === page.tabComponent) {
    //     return 'primary';
    //   }
    //   return;
    // }
    // console.log(this.nav.getActive().name + " / " + page.name);
    if (this.nav.getActive()) {
      if(this.nav.getActive().name === page.name) {
        return 'primary';
      } 

      // UserInfoPage
      else if (this.nav.getActive().name == "UserInfoPage" && page.name == "MyInfoPage"
                  && this.nav.getActive().getNavParams().get("type") == 1) {
        return 'primary';
      } else if (this.nav.getActive().name == "UserInfoPage" && page.name == "UserListPage"
                  && this.nav.getActive().getNavParams().get("type") == 0) {
        return 'primary';
      }

      // UserPhotoPage
      else if (this.nav.getActive().name == "UserPhotoPage" && page.name == "UserListPage") {
        return 'primary';
      }
    }
    return;
  }

  showConfirmAlert(message: string, yesHandler) {
    let confirm = this.alertCtrl.create({
      message: message,
      buttons: [
        { text: 'No' },
        {
          text: 'Yes',
          handler: () => {
            yesHandler();
          }
        }
      ]
    });
    confirm.present();
  }

}

