import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { NewgamepetPage } from './newgamepet';

@NgModule({
  declarations: [
    NewgamepetPage,
  ],
  imports: [
    IonicPageModule.forChild(NewgamepetPage),
  ],
})
export class NewgamepetPageModule {}
