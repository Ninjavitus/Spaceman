import { Component } from '@angular/core';
import { Storage } from '@ionic/storage';
import { NewgamepetPage } from '../newgamepet/newgamepet';
import { IonicPage, NavController, NavParams } from 'ionic-angular';

/**
 * Generated class for the NewgamePage page.
 *
 * See http://ionicframework.com/docs/components/#navigation for more info
 * on Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-newgame',
  templateUrl: 'newgame.html',
})
export class NewgamePage {

  constructor(public navCtrl: NavController, public navParams: NavParams, public storage: Storage) {
    }

    ionViewWillEnter() {

        this.storage.get('PilotInfo').then((data) => {

            var pilotInfo = JSON.parse(data);

            // If he already has a pilot, move this nigga along.
            if (pilotInfo["HasPilot"] == "No") {
                this.navCtrl.push(NewgamepetPage);
            }
        });
    }

    // Update HasPilot from No to Yes
    updateOldPilotOne(pilotInfo) {

            pilotInfo["HasPilot"] = "Yes";

            var pilotInfoNew = JSON.stringify(pilotInfo);

            this.storage.set('PilotInfo', pilotInfoNew);
    }

    updateTime(){
    //EST

    // UTC Time. Resets day at 8 PM EST instead of midnight.
    var clientDate = new Date();
    var currentDay = clientDate.getUTCMonth().toString() + " " + clientDate.getUTCDate().toString() + " " + clientDate.getUTCHours().toString(); 

    return currentDay;
   }

    // Sets the Pilot's gender and saves it. Then shows the sprite, then shows a clickable pokeball.
    setGenderOne(sexe) {

        // Change displayed sprite. In the future, they'll get to choose what the base sprite is or get a random one.'
        document.getElementById("pilotures").innerHTML = '<img id="pilotSprite" src= "../assets/pilots/' + sexe + '.png" style= "width: 200px; height: 200px; padding-top: 15px" /><br>';

        // add button after they select a gender. Button changes based on gender. 1 for Male, 2 for Female
        if (sexe == "M") {
            // Give a new player their gender
            this.storage.set('PlayerGender', "M");
        } else {
            // Give a new player their gender
            this.storage.set('PlayerGender', "F");
        }
    }

    pilotNewStats() {
        setTimeout(() => {
                // Get stats
                this.storage.get('PilotInfo').then((stats) => {

                    var pilotInfo = JSON.parse(stats);

                    this.updateOldPilotOne(pilotInfo);
                });
                this.navCtrl.push(NewgamepetPage);
            }, 500);
    }

    nextPage(pilotName) {

        if (pilotName.length >= 4) {

            var pilotUpper = pilotName.charAt(0).toUpperCase();
            var pilotRest = pilotName.slice(1);
            var pilot = pilotUpper + pilotRest;

            // Get player gender
            this.storage.get('PlayerGender').then((genderPilot) => {

                if (genderPilot == "M" || genderPilot == "F") {

                    // Object containing all the player stats. Turned to string to save the values, then turned back to object
                    var pilotInit = { Time: this.updateTime(), Name: pilot, Race: "", Prof: "", curEnergy: "2", maxEnergy: "8", curEXP: "12", maxEXP: "25", curVIT: "10", maxVIT: "10", ATK: "10", DEX: "8", DEF: "6", FTH: "6", Pet1: "No", Pet2: "No", Pet3: "No" }

                    // Give a new player their stats. Will be accessed later for it's values.
                    this.storage.set('PilotInfo', JSON.stringify(pilotInit));

                    this.pilotNewStats();

                } else {
                    document.getElementById("nextError").innerText = "You must select a gender.";
                }
            });
        }else {
            document.getElementById("nextError").innerText = "Your pilot's name must be 4 letters or longer.";
        }
    }
}
