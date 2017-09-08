import { Component } from '@angular/core';
import { Storage } from '@ionic/storage';
import { ViewpetonePage } from '../viewpetone/viewpetone';
import { ExplorePage } from '../explore/explore';
import { HomePage } from '../home/home';
import { IonicPage, ModalController, NavController, NavParams } from 'ionic-angular';
import { BattlePage } from '../battle/battle';

/**
 * Generated class for the HangarPage page.
 *
 * See http://ionicframework.com/docs/components/#navigation for more info
 * on Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-hangar',
  templateUrl: 'hangar.html',
})
export class HangarPage {

  constructor(public navCtrl: NavController, public navParams: NavParams, public storage: Storage, public modalCtrl: ModalController) {
  }

  ionViewDidLoad() {
      setTimeout(() => {
      // Check if player has a Pet1, 2 and 3
        this.storage.get('PilotInfo').then((data) => {

            var gameInfo = JSON.parse(data);
            var pet1 = gameInfo["Pet1"]; 
            var pet2 = gameInfo["Pet2"]; 
            var pet3 = gameInfo["Pet3"]; 

            // Check if player already has a 1st pet.
            if (pet1 == "Yes") {
            // Open pilot1 stats to get name and stuff
             this.storage.get('PetOneInfo').then((data1) => {
             var petInfo1 = JSON.parse(data1);
             var petName1 = petInfo1["name"].toUpperCase();
             document.getElementById("pokeHangar1").innerHTML = '<img id="pokeSprite1" src="../assets/hangar/' + petInfo1["sprite"] + '.png" style="width: 70px; height: 70px;" />';
              });
             } 

            // Check if player already has a 2nd pet.
            if (pet2 == "Yes") {
            // Open pilot1 stats to get name and stuff
             this.storage.get('PetTwoInfo').then((data2) => {
             var petInfo2 = JSON.parse(data2);
             var petName2 = petInfo2["name"].toUpperCase();
             document.getElementById("pokeHangar2").innerHTML = '<img id="pokeSprite2" src="../assets/hangar/' + petInfo2["sprite"] + '.png" style="width: 70px; height: 70px;" />';
              });
             }

            // Check if player already has a 3rd pet.
            if (pet3 == "Yes") {
            // Open pilot1 stats to get name and stuff
             this.storage.get('PetThreeInfo').then((data3) => {
             var petInfo3 = JSON.parse(data3);
             var petName3 = petInfo3["name"].toUpperCase();
             document.getElementById("pokeHangar3").innerHTML = '<img id="pokeSprite3" src="../assets/hangar/' + petInfo3["sprite"] + '.png" style="width: 70px; height: 70px;" />';
              });
             }

             // Check to update energy on page load
             this.updateEnergy(gameInfo);
        });
      }, 500);   
  }

  updateTime(){
    // UTC Time. Resets day at 8 PM EST instead of midnight.
    var clientDate = new Date();
    var currentDay = clientDate.getUTCMonth().toString() + " " + clientDate.getUTCDate().toString() + " " + clientDate.getUTCHours().toString(); 

    return currentDay;
   }

   setMyStyles() {
   //document.getElementById('testdiv').style.height = "10%";
  }

   // Global energy for now
   updateEnergy(gameInfo){
      // Create an array with the last saved player date
      var oldDate = gameInfo["Time"].split(" ");
      var serverDate = this.updateTime();

      // Create an array with the current server time
      var currentDate = serverDate.split(" ");

      /*
      0 - Month (0 to 11)
      1 - Date Number (1 to 31)
      2 - Hour (0 to 23)
      */
    
    //1. Check if the current month is greater than the old month. If yes, update automatically.
    //2. Check if current date is more recent. If yes, update automatically.
    //3. if current Hour is greater than last saved Hour, then an hour has passed. Update energy.
    if (currentDate[0] > oldDate[0]){

      // Update energy & time
      gameInfo["curEnergy"] = gameInfo["maxEnergy"];
      gameInfo["Time"] = serverDate;
      this.storage.set('Profile', JSON.stringify(gameInfo));
      console.log("Energy updated. New month.");

    } else if (currentDate[1] > oldDate[1]){ 

      // Update energy & time
      gameInfo["curEnergy"] = gameInfo["maxEnergy"];
      gameInfo["Time"] = serverDate;
      this.storage.set('Profile', JSON.stringify(gameInfo));
      console.log("Energy updated. New day.");

      } else if (currentDate[2] > oldDate[2]){

      // Update energy & time
      gameInfo["curEnergy"] = gameInfo["maxEnergy"];
      gameInfo["Time"] = serverDate;
      this.storage.set('Profile', JSON.stringify(gameInfo));
      console.log("Energy updated. New hour.");
      } 
   }

  exploreModal() {
   let exploreCity = this.modalCtrl.create(ExplorePage);
   exploreCity.present();
  }

  addPet(){
  this.storage.get('PilotInfo').then((data) => {
  
     var gameInfo = JSON.parse(data);
     var pet1 = gameInfo["Pet1"]; 
     var pet2 = gameInfo["Pet2"]; 
     var pet3 = gameInfo["Pet3"]; 

     // Check if Pet 1,2,3 is already taken
     if (pet1 == "No"){
     gameInfo["Pet1"] = "Yes";
     this.storage.set('PilotInfo', JSON.stringify(gameInfo));
     this.storage.set('PetOneInfo', JSON.stringify(this.randomPet()));
     } else if (pet2 == "No"){
     gameInfo["Pet2"] = "Yes";
     this.storage.set('PilotInfo', JSON.stringify(gameInfo));
     this.storage.set('PetTwoInfo', JSON.stringify(this.randomPet()));  
     } else if (pet3 == "No"){
     gameInfo["Pet3"] = "Yes";
     this.storage.set('PilotInfo', JSON.stringify(gameInfo));
     this.storage.set('PetThreeInfo', JSON.stringify(this.randomPet()));
     }
  });
  }

  // Change planet and start the battle
  explorePlanet(planetName, levelAmount) {
  // Send them to battle page and pass the planet as variable
  this.navCtrl.push(BattlePage, {planet: planetName, level: levelAmount});
  }

  viewPet(num){
  // Check if player has a Pilot1, 2 and 3
  this.storage.get('PilotInfo').then((data) => {

      var petInfo = JSON.parse(data);
      var petNum = "Pet" + num.toString();
      var pet = petInfo[petNum]; 

      // Check if player has a pilot in that slot. If no, send error message.
      if (num == 1){
        if(pet == "Yes"){
           this.navCtrl.push(ViewpetonePage);
          } else {
          document.getElementById("petError").innerText = "You don't have a pilot in that slot.";
          }
      } else if (num == 2){
        if(pet == "Yes"){
           //this.navCtrl.push(ViewpilottwoPage);
          } else {
          document.getElementById("petError").innerText = "You don't have a pilot in that slot.";
          }
      } else if (num == 3){
        if(pet == "Yes"){
          // this.navCtrl.push(ViewpilotthreePage);
          } else {
          document.getElementById("petError").innerText = "You don't have a pilot in that slot.";
          }
      }
    });
  }

  setPlus(){
  var petOne = { name: "PLUSLE", gender: "M", sprite: "5", LVL: "1", curEXP: "15", maxEXP: "50", curVIT: "10", maxVIT: "10", ATK: "8", DEF: "6", DEX: "6", FTH: "4", color: "gold", PROF: "none", curHUNGER: "8", maxHUNGER: "8", curTHIRST: "6", maxTHIRST: "6", status: "normal", likes: "steaks", dislikes: "shrooms", hobby: "none" };
  this.storage.set('PetTwoInfo', JSON.stringify(petOne));  
  }

    // Assign a random Pet upon opening the pokeball. Add reveal animation in the future.
    randomPet() {
        var petChance = Math.round(Math.random() * 100) + 1;

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
            return petOne;
    }

  // Reset player NewToGame to null
  startGame() {
  /*
  Profile - Store all permanent information : NewToGame, HasPilot, Pilot Inventory, Achievements, Amount of pilots retired, amountof pets lost, etc.
  */
      // Initiate profile
      var profileInit = { Time: this.updateTime(), curEnergy: "2", maxEnergy: "8", HasPilot: "No", Achievements:"None", Petventory: "None", Pet1: "Yes", Pet2: "Yes", Pet3: "Yes", PilotPrestige: "", Retired: "0", DeadPilots:"0", DeadPets: "0" };

      var profileInfo = JSON.stringify(profileInit);

      this.storage.set('ProfileNew', profileInfo); // Sets basic game info for tracking. Not Player stats.
  }

ionViewWillLeave() {
// Update energy on page leave
  this.storage.get('ProfileNew').then((data) => {

     var profileInfo = JSON.parse(data);
     this.updateEnergy(profileInfo);
 });
}

}
