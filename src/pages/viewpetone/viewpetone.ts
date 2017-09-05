import { Component } from '@angular/core';
import { Storage } from '@ionic/storage';
import { HangarPage } from '../hangar/hangar';
import { IonicPage, NavController, NavParams } from 'ionic-angular';

/**
 * Generated class for the ViewpetonePage page.
 *
 * See http://ionicframework.com/docs/components/#navigation for more info
 * on Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-viewpetone',
  templateUrl: 'viewpetone.html',
})
export class ViewpetonePage {

  constructor(public navCtrl: NavController, public navParams: NavParams, public storage: Storage) {
  }

  updateTime(){
    // UTC Time. Resets day at 8 PM EST instead of midnight.
    var clientDate = new Date();
    var currentDay = clientDate.getUTCMonth().toString() + " " + clientDate.getUTCDate().toString() + " " + clientDate.getUTCHours().toString(); 

    return currentDay;
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

  switchToHangar() {
    this.navCtrl.push(HangarPage);
  }

  ionViewDidLoad() {
  setTimeout(() => {
  // Open pilot1 stats to get name and stuff
  this.storage.get('PetOneInfo').then((data) => {

  /* All stats and placeholder values listed out here. All values are strings.
  name: pilot, 
  gender: F/M, 
  sprite: ".png", 
  LVL: "1", 
  curEXP: "0", maxEXP: "50", 
  curVIT: "10", maxVIT: "10", 
  ATK: "8", 
  DEF: "6", 
  SPD: "6", 
  color: "red", 
  WEPS: "none", 
  
  curHUNGER: "8", maxHUNGER: "8", 
  curTHIRST: "6", maxTHIRST: "6", 
  status: "normal", 
  likes: "steaks", dislikes: "shrooms", 
  hobby: "napping" */

  // Turn pet info into array for stats
  var pet = JSON.parse(data);

  var petName = pet["name"].toUpperCase(); //name

  // Calculate HP percentage based on current and max HP
  var petHP = (parseInt(pet["curVIT"])) / (parseInt(pet["maxVIT"]));
  var petPercentMath = (petHP * 100);
  var petPercent = petPercentMath.toString() + "%";

  // Calculate EXP percentage based on current and max EXP
  var petEXP = (parseInt(pet["curEXP"])) / (parseInt(pet["maxEXP"]));
  var petEXPercentMath = (petEXP * 100);
  var petEXPercent = petEXPercentMath.toString() + "%";
  var petEXPValue = pet["curEXP"] + " / " + pet["maxEXP"];

  // Used to create multiple <p>'s for ATK, DEF, etc.
  var petVIT = '<p id="pilotPageStats"><font color="#FF0000"><b>VIT</b></font> ' + pet["curVIT"] + '/' + pet["maxVIT"] + '</p><br>';
  var petATK = '<p id="pilotPageStats"><font color="#FFCC00"><b>ATK</b>&nbsp;&nbsp;&nbsp;</font>' + pet["ATK"] + '</p><br>';
  var petDEF = '<p id="pilotPageStats"><font color="#00cd00"><b>DEF</b>&nbsp;&nbsp;&nbsp;</font>' + pet["DEF"] + '</p><br>';
  var petDEX = '<p id="pilotPageStats"><font color="#007FFF"><b>SPD</b>&nbsp;&nbsp;&nbsp;</font>' + pet["DEX"] + '</p><br>';
  var petLVL = '<p id="pilotPageStats"><b>LEVEL</b>&nbsp;&nbsp;' + pet["LVL"] + '</p><br>';
  //var pilotEnergy = '<br><p id="pilotPageStats">' + pet["LVL"] + '</p><br>';

  // Set pet likes/dislikes & hobbies
  var petHunger = '<p id="pilotPageRight">' + pet["curHUNGER"] + ' / ' + pet["maxHUNGER"] + '</p><br>';
  var petThirst = '<p id="pilotPageRight">' + pet["curTHIRST"] + ' / ' + pet["maxTHIRST"] + '</p><br>'; // Used as Energy for now
  var petLikes = '<br><p id="pilotPageRight">' + pet["likes"] + '</p><br>';
  var petDislikes = '<p id="pilotPageRight">' + pet["dislikes"] + '</p><br>'; 
  var petHobby = '<p id="pilotPageRight">' + pet["hobby"] + '</p><br>'; 

  //Player name and level
  document.getElementById("whitetext").innerText = petName;

  // Set player stats on page
  document.getElementById("pilotStatsDiv").innerHTML = petLVL + petVIT + petATK + petDEF + petDEX;
  document.getElementById("pilotRightStatsDiv").innerHTML = petHunger + petThirst + petLikes + petDislikes + petHobby;

  // Adjust div width based on EXP %
  document.getElementById("expDiv").innerHTML = '<div id="experienceBar" style="text-align:center; width:' + petEXPercent + ';"></div><p id="exptxt" style="font-size:10px; color:#FFFFFF; text-align:center;">' + petEXPValue + '&nbsp;&nbsp;(' + petEXPercent + ')</p>';

  // Set player color and weapon type
  document.getElementById("pilotColor").innerHTML = '<img id="colorBadge" src="../assets/combat/' + pet["color"] + '.png" style="width: 64px; height: 64px;"/>';

  // Set pett's image
  var petImage = document.getElementById("pilotSprite") as HTMLImageElement;
  petImage.src = '../assets/pets/'+ pet["sprite"] + '.png';

    });
  }, 400);   
 }

ionViewWillLeave() {
// Update energy on page leave
  this.storage.get('Profile').then((data) => {

     var profileInfo = JSON.parse(data);
     this.updateEnergy(profileInfo);
 });
}

}
