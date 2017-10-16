// default
import { BrowserModule } from '@angular/platform-browser';
import { ErrorHandler, NgModule } from '@angular/core';
import { IonicApp, IonicErrorHandler, IonicModule } from 'ionic-angular';
import { SplashScreen } from '@ionic-native/splash-screen';
import { StatusBar } from '@ionic-native/status-bar';
import { SQLite } from '@ionic-native/sqlite'
import { IonicStorageModule } from '@ionic/storage';

// firebase
import { AngularFireModule } from 'angularfire2';
import { AngularFireDatabaseModule } from 'angularfire2/database';
import { AngularFirestoreModule } from 'angularfire2/firestore';
import { AngularFireAuthModule } from 'angularfire2/auth';
import { environment } from './../pages/environments/environment';

// pages
import { MyApp } from './app.component';
import { SigninPage } from './../pages/signin/signin';
import { HomePage } from './../pages/home/home';
import { SubListPage } from './../pages/subMng/list/subList';
import { CatListPage } from './../pages/catMng/list/catList';
import { LecListPage } from './../pages/lecMng/list/lecList';
  import { LecTestPage } from './../pages/lecMng/test/lecTest';
import { WordCardPage } from './../pages/wordMng/card/wordCard';
import { UserListPage } from './../pages/userMng/list/userList';
  import { UserInfoPage } from './../pages/userMng/info/userInfo';
  import { UserPhotoPage } from './../pages/userMng/photo/userPhoto';
import { TabsPage } from './../pages/tabs/tabs';
  import { Tab3Page } from './../pages/tabs/tab3/tab3';
  import { Tab2Page } from './../pages/tabs/tab2/tab2';
  import { Tab1Page } from './../pages/tabs/tab1/tab1';

//providers
import { LoadingService } from '../providers/loading-service/loading-service';
import { AuthService } from '../providers/auth-service/auth-service';
import { UserService } from '../providers/user-service/user-service';
import { WordLevelService } from '../providers/word-level-service/word-level-service';
import { TestSettingService } from '../providers/test-setting-service/test-setting-service';

@NgModule({
  declarations: [
    MyApp,
    SigninPage,
    HomePage,
    SubListPage,
    CatListPage,
    LecListPage,
      LecTestPage,
    WordCardPage,
    UserListPage,
      UserInfoPage,
      UserPhotoPage,
    TabsPage,
    Tab1Page,
    Tab2Page,
    Tab3Page
  ],
  imports: [
    BrowserModule,
    IonicModule.forRoot(MyApp, {tabsPlacement: 'top'}),
    IonicStorageModule.forRoot(),
    AngularFireModule.initializeApp(environment.firebase),
    AngularFireDatabaseModule,
    AngularFirestoreModule,
    AngularFireAuthModule
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    MyApp,
    SigninPage,
    HomePage,
    SubListPage,
    CatListPage,
    LecListPage,
      LecTestPage,
    WordCardPage,
    UserListPage,
      UserInfoPage,
      UserPhotoPage,
    TabsPage,
    Tab1Page,
    Tab2Page,
    Tab3Page
  ],
  providers: [
    StatusBar,
    SplashScreen,
    SQLite,
    {provide: ErrorHandler, useClass: IonicErrorHandler},
    LoadingService,
    AuthService,
    UserService,
    WordLevelService,
    TestSettingService
  ]
})
export class AppModule {}
