import { BrowserModule } from '@angular/platform-browser';
import { ErrorHandler, NgModule } from '@angular/core';
import { IonicStorageModule } from '@ionic/storage';
import { IonicApp, IonicErrorHandler, IonicModule } from 'ionic-angular';
import { SplashScreen } from '@ionic-native/splash-screen';
import { StatusBar } from '@ionic-native/status-bar';

import { MyApp } from './app.component';
import { HomePage } from '../pages/home/home';
import { NewgamePage } from '../pages/newgame/newgame';
import { NewgamepetPage } from '../pages/newgamepet/newgamepet';
import { HangarPage } from '../pages/hangar/hangar';
import { ViewpetonePage } from '../pages/viewpetone/viewpetone';
import { BattlePage } from '../pages/battle/battle';
import { ExplorePage } from '../pages/explore/explore';


@NgModule({
  declarations: [
    MyApp,
    HomePage,
    NewgamePage,
    NewgamepetPage,
    HangarPage,
    ViewpetonePage,
    BattlePage,
    ExplorePage
  ],
  imports: [
    BrowserModule,
    IonicModule.forRoot(MyApp),
    IonicStorageModule.forRoot()
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    MyApp,
    HomePage,
    NewgamePage,
    NewgamepetPage,
    HangarPage,
    ViewpetonePage,
    BattlePage,
    ExplorePage
  ],
  providers: [
    StatusBar,
    SplashScreen,
    {provide: ErrorHandler, useClass: IonicErrorHandler},
    Storage
  ]
})
export class AppModule {}
