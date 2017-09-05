import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { HangarPage } from './hangar';

@NgModule({
  declarations: [
    HangarPage,
  ],
  imports: [
    IonicPageModule.forChild(HangarPage),
  ],
})
export class HangarPageModule {}
