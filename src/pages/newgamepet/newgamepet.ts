import { Component } from '@angular/core';
import { HangarPage } from '../hangar/hangar';
import { Storage } from '@ionic/storage';
import { IonicPage, NavController, NavParams } from 'ionic-angular';

/**
 * Generated class for the NewgamepetPage page.
 *
 * See http://ionicframework.com/docs/components/#navigation for more info
 * on Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-newgamepet',
  templateUrl: 'newgamepet.html',
})
export class NewgamepetPage {

  constructor(public navCtrl: NavController, public navParams: NavParams, public storage: Storage) {
    }

    ionViewWillEnter() {

        this.storage.get('PilotInfo').then((data) => {

            var pilotInfo = JSON.parse(data);

            if (pilotInfo["Pet1"] == "Yes") {
                this.navCtrl.push(HangarPage);
            }

        });
    }

    updateOldPetOne() {
        this.storage.get('PilotInfo').then((data) => {

            var pilotInfo = JSON.parse(data);
            pilotInfo["Pet1"] = "Yes";

            var pilotInfoNew = JSON.stringify(pilotInfo);

            // Update storage. NewGame set to No, Pet1 set to Yes so players can't get back to this page.
            this.storage.set('PilotInfo', pilotInfoNew);

            this.storage.get('PilotInfo').then((data) => {

            this.storage.set('FirstGame', 'No');
             });
        });
    }

    // Assign a random Pet upon opening the pokeball. Add reveal animation in the future.
    randomPetOne(petName) {
        var petChance = Math.round(Math.random() * 100) + 1;

        if (petName.length >= 4) {

            if (petChance <= 29) {    //30% chance to get Bulbasaur
                var petOne = { name: "BULBASAUR", gender: "M", sprite: "1", LVL: "1", curEXP: "33", maxEXP: "50", curVIT: "10", maxVIT: "10", ATK: "8", DEF: "6", DEX: "6", FTH: "4", color: "green", PROF: "none", curHUNGER: "8", maxHUNGER: "8", curTHIRST: "6", maxTHIRST: "6", status: "normal", likes: "steaks", dislikes: "shrooms", hobby: "napping" };
            }
            else if (petChance >= 30 && petChance <= 59) {    //30% chance to get Charmander
                var petOne = { name: "CHARMANDER", gender: "M", sprite: "2", LVL: "1", curEXP: "45", maxEXP: "50", curVIT: "10", maxVIT: "10", ATK: "8", DEF: "6", DEX: "6", FTH: "4", color: "red", PROF: "none", curHUNGER: "8", maxHUNGER: "8", curTHIRST: "6", maxTHIRST: "6", status: "normal", likes: "steaks", dislikes: "shrooms", hobby: "running" };
            }
            else if (petChance >= 60 && petChance <= 89) {    //30% chance to get Mudkips
                var petOne = { name: "MUDKIPZ", gender: "M", sprite: "3", LVL: "1", curEXP: "49", maxEXP: "50", curVIT: "10", maxVIT: "10", ATK: "8", DEF: "6", DEX: "6", FTH: "4", color: "blue", PROF: "none", curHUNGER: "8", maxHUNGER: "8", curTHIRST: "6", maxTHIRST: "6", status: "normal", likes: "steaks", dislikes: "shrooms", hobby: "eating" };
            }
            else if (petChance >= 90 && petChance <= 99) {    //9% chance to get Poliwhirl
                var petOne = { name: "POLIWHIRL", gender: "M", sprite: "4", LVL: "1", curEXP: "50", maxEXP: "50", curVIT: "10", maxVIT: "10", ATK: "8", DEF: "6", DEX: "6", FTH: "4", color: "purple", PROF: "none", curHUNGER: "8", maxHUNGER: "8", curTHIRST: "6", maxTHIRST: "6", status: "normal", likes: "steaks", dislikes: "shrooms", hobby: "fighting" };
            }
            else {    //1% chance to get Plusle
                var petOne = { name: "PLUSLE", gender: "M", sprite: "5", LVL: "1", curEXP: "15", maxEXP: "50", curVIT: "10", maxVIT: "10", ATK: "8", DEF: "6", DEX: "6", FTH: "4", color: "gold", PROF: "none", curHUNGER: "8", maxHUNGER: "8", curTHIRST: "6", maxTHIRST: "6", status: "normal", likes: "steaks", dislikes: "shrooms", hobby: "none" };
            }

            document.getElementById("petpictures").innerHTML = '<img id="pilotSprite" src= "../assets/pets/' + petOne["sprite"] + '.png" style="width: 200px; height: 200px; padding-top: 15px" /><br>';
            document.getElementById("petError").innerText = "You've received "+ petOne["name"] + "!";

            this.storage.set('PetOneInfo', JSON.stringify(petOne));
        } else {
            document.getElementById("petError").innerText = "Your pet's name must be 4 letters or longer.";
        }
    }

    petNewStats() {
        setTimeout(() => {
            // Get stats
            this.storage.get('PetOneInfo').then((stats) => {

                this.updateOldPetOne();
                document.getElementById("petError").innerText = "Success!";
            });
            this.navCtrl.push(HangarPage);
        }, 500);
    }

    setPetName(petOne, petName) {
        petOne["name"] = petName;

        this.storage.set('PetOneInfo', JSON.stringify(petOne));
    }

    petNextOne(petName) {

        if (petName.length >= 4) {

            var petUpper = petName.charAt(0).toUpperCase();
            var petRest = petName.slice(1);
            var pet = petUpper + petRest;

            // Get player stats
            this.storage.get('PetOneInfo').then((stats) => {

                var pet1 = JSON.parse(stats);

                this.setPetName(pet1, pet);
                this.petNewStats();
            });
        } else {
            document.getElementById("petError").innerText = "Your pet's name must be 4 letters or longer.";
        }
    }
}
