import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { NewgamePage } from './newgame';

@NgModule({
  declarations: [
    NewgamePage,
  ],
  imports: [
    IonicPageModule.forChild(NewgamePage),
  ],
})
export class NewgamePageModule {}
