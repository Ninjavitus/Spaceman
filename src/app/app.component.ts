import { Component } from '@angular/core';
import { Platform } from 'ionic-angular';
import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';
import { Storage } from '@ionic/storage';
import { ScreenOrientation } from '@ionic-native/screen-orientation';

import { HomePage } from '../pages/home/home';
import { HangarPage } from '../pages/hangar/hangar';
@Component({
  templateUrl: 'app.html'
})
export class MyApp {
 
  rootPage:any = HangarPage;

  constructor(platform: Platform, statusBar: StatusBar, splashScreen: SplashScreen, public storage: Storage, private screenOrientation: ScreenOrientation) {
    platform.ready().then(() => {
      // Okay, so the platform is ready and our plugins are available.
      // Here you can do any higher level native things you might need.
      statusBar.styleDefault();
      splashScreen.hide();
      this.setStartPage();
      screenOrientation.lock(this.screenOrientation.ORIENTATIONS.PORTRAIT);
    });
  }

  setStartPage(){
  this.storage.get('FirstGame').then((newToGame) => {       

  if(newToGame == 'First'){
      // If they're new to the game, send them to HomePage
      this.rootPage = 'HomePage';  
  }
 });
}

}

