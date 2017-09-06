import { Component } from '@angular/core';
import { Storage } from '@ionic/storage';
import { NewgamePage } from '../newgame/newgame';
import { HangarPage } from '../hangar/hangar';
import { NavController } from 'ionic-angular';

@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {

  constructor(public navCtrl: NavController, public storage: Storage) {

  }

  // Reset player NewToGame to null
  startGame() {
  /*
  Profile - Store all permanent information : NewToGame, HasPilot, Pilot Inventory, Achievements, Amount of pilots retired, amountof pets lost, etc.
  PilotInfo - Store all pilot stats. Name, Race, Prof, VIT, ATK, DEX, DEF, FTH, curEXP, maxEXP, Time, Newtogame, Energy, hasPet1,2,3
  PetOneInfo
  PetTwoInfo
  PetThreeInfo
  Possibly :
  PetOneChips - Might store the abilities/spells/powers of Pets
  PetTwoChips
  PetThreeChips
  */
      // Initiate profile
      var profileInit = { Time: this.updateTime(), curEnergy: "2", maxEnergy: "8", HasPilot: "No", Achievements:"None", Petventory: "None", Pet1: "No", Pet2: "No", Pet3: "No", PilotPrestige: "", Retired: "0", DeadPilots:"0", DeadPets: "0" }

      // Initiate pilot info
      var pilotInit = { Name: "", Race: "Human", Prof: "Default", curEXP: "12", maxEXP: "25", curVIT: "10", maxVIT: "10", ATK: "10", DEX: "8", DEF: "6", FTH: "6", Pet1: "No", Pet2: "No", Pet3: "No" }


      var profileInfo = JSON.stringify(profileInit);
      var pilotInfo = JSON.stringify(pilotInit);

      this.storage.set('Profile', profileInfo); // Sets basic game info for tracking. Not Player stats.
      this.storage.set('PilotInfo', pilotInfo); // Resets player stats to null.
      this.storage.set('FirstGame', 'First');
      this.navCtrl.push(NewgamePage); // Switches the page to start the game.
  }

   // Checks if the player has opened the app and/or made an account before.
  ionViewWillEnter() {

      this.storage.get('FirstGame').then((newToGame) => {

          // Check if null (first time ever playing)
          if (newToGame == null){
            // Do nothing. Wait for the player to click start.
          } else if(newToGame == "First") { 
            // If First, then he already started a character but never finished. Send him to pilot creation. 
            // If he already has a character, it will automatically send him to pet creation.
              this.navCtrl.push(NewgamePage);
          } else {
            // If not null, then he already has an account. Send him to hangar.
             this.navCtrl.push(HangarPage);    
          }        
      });
  }

  updateTime(){
    //EST

    // UTC Time. Resets day at 8 PM EST instead of midnight.
    var clientDate = new Date();
    var currentDay = clientDate.getUTCMonth().toString() + " " + clientDate.getUTCDate().toString() + " " + clientDate.getUTCHours().toString(); 

    return currentDay;
   }

}
