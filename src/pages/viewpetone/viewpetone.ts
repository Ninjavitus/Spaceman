import { Component } from '@angular/core';
import { Storage } from '@ionic/storage';
import { HangarPage } from '../hangar/hangar';
import { ExploretempPage } from '../exploretemp/exploretemp';
import { IonicPage, ModalController, NavController, NavParams } from 'ionic-angular';

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

  constructor(public navCtrl: NavController, public navParams: NavParams, public storage: Storage, public modalCtrl: ModalController) {
  }

  public petStats1: any = "None"; // Saves allied pet stats on page load
  public petStats2: any = "None";
  public petStats3: any = "None";

  public petAlive1: any = "No"; // Saves if pet is alive or not. Will be set to yes on page load
  public petAlive2: any = "No";
  public petAlive3: any = "No";

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
    this.navCtrl.pop();
  }

  ionViewDidLoad() {
  //Check if we have pets, to see how many slides to generate
  this.storage.get('PilotInfo').then((data) => {
  var profileInfo = JSON.parse(data); 

  if(profileInfo["Pet1"] == "Yes"){
  setTimeout(() => {
  this.petSlide1();
 // SET PET1 STATS, if they have pet1
 this.storage.get('PetOneInfo').then((data1) => {
 this.petStats1 = JSON.parse(data1);
 if(this.petStats1 !== 'None'){
 if(parseInt(this.petStats1['curVIT']) > 0){ // If health greater than 0, pet is alive and we can spend energy on him.
 this.petAlive1 = 'Yes';
 }
 }
 });
  }, 100); 
  }

  if(profileInfo["Pet2"] == "Yes"){
  setTimeout(() => {
  this.petSlide2();
 // SET PET2 STATS
 this.storage.get('PetTwoInfo').then((data2) => {
 this.petStats2 = JSON.parse(data2);
 if(this.petStats2 !== 'None'){
 if(parseInt(this.petStats2['curVIT']) > 0){ // If health greater than 0, pet is alive and we can spend energy on him.
 this.petAlive2 = 'Yes';
 }
 }
 });
  }, 100); 
  }

  if(profileInfo["Pet3"] == "Yes"){
  setTimeout(() => {
  this.petSlide3();
 // SET PET3 STATS
 this.storage.get('PetThreeInfo').then((data3) => {
 this.petStats3 = JSON.parse(data3);
 if(this.petStats3 !== 'None'){
 if(parseInt(this.petStats3['curVIT']) > 0){ // If health greater than 0, pet is alive and we can spend energy on him.
 this.petAlive3 = 'Yes';
 }
 }
 });
  }, 100); 
  }
 });
}

// FEED pet button
feedPet(num) {
var currentPet;
 if(num == 1){
 currentPet = this.petStats1;
   if(this.petAlive1 !== 'No'){
    currentPet["status"] = 'fed';
    document.getElementById("pilotPageStatsStatus").innerText = currentPet["status"];
    // Save the changes
    this.storage.set('PetOneInfo', JSON.stringify(currentPet));
    } else {
     console.log('This pet is dead.')
    }
 } else if(num == 2) {
 currentPet = this.petStats2;
   if(this.petAlive2 !== 'No'){
    currentPet["status"] = 'hungry';
    document.getElementById("pilotPageStatsStatus").innerText = currentPet["status"];
    // Save the changes
    this.storage.set('PetTwoInfo', JSON.stringify(currentPet));
    } else {
     console.log('This pet is dead.')
    }
 } else if(num == 3) {
 currentPet = this.petStats3;
   if(this.petAlive3 !== 'No'){
    currentPet["status"] = 'full';
    document.getElementById("pilotPageStatsStatus").innerText = currentPet["status"];
    // Save the changes
    this.storage.set('PetThreeInfo', JSON.stringify(currentPet));
    } else {
     console.log('This pet is dead.')
    }
 }
}

// SLEEP pet button
sleepPet(num) {
var currentPet;
 if(num == 1){
 currentPet = this.petStats1;
   if(this.petAlive1 !== 'No'){
    currentPet["status"] = 'asleep';
    document.getElementById("pilotPageStatsStatus").innerText = currentPet["status"];
    // Save the changes
    this.storage.set('PetOneInfo', JSON.stringify(currentPet));
    } else {
     console.log('This pet is dead.')
    }
 } else if(num == 2) {
 currentPet = this.petStats2;
   if(this.petAlive2 !== 'No'){
    currentPet["status"] = 'asleep';
    document.getElementById("pilotPageStatsStatus").innerText = currentPet["status"];
    // Save the changes
    this.storage.set('PetTwoInfo', JSON.stringify(currentPet));
    } else {
     console.log('This pet is dead.')
    }
 } else if(num == 3) {
 currentPet = this.petStats3;
   if(this.petAlive3 !== 'No'){
    currentPet["status"] = 'asleep';
    document.getElementById("pilotPageStatsStatus").innerText = currentPet["status"];
    // Save the changes
    this.storage.set('PetThreeInfo', JSON.stringify(currentPet));
    } else {
     console.log('This pet is dead.')
    }
 }
}

// CLEAN pet button
cleanPet(num) {
var currentPet;
 if(num == 1){
 currentPet = this.petStats1;
   if(this.petAlive1 !== 'No'){
    currentPet["status"] = 'groomed';
    document.getElementById("pilotPageStatsStatus").innerText = currentPet["status"];
    // Save the changes
    this.storage.set('PetOneInfo', JSON.stringify(currentPet));
    } else {
     console.log('This pet is dead.')
    }
 } else if(num == 2) {
 currentPet = this.petStats2;
   if(this.petAlive2 !== 'No'){
    currentPet["status"] = 'clean';
    document.getElementById("pilotPageStatsStatus").innerText = currentPet["status"];
    // Save the changes
    this.storage.set('PetTwoInfo', JSON.stringify(currentPet));
    } else {
     console.log('This pet is dead.')
    }
 } else if(num == 3) {
 currentPet = this.petStats3;
   if(this.petAlive3 !== 'No'){
    currentPet["status"] = 'groomed';
    document.getElementById("pilotPageStatsStatus").innerText = currentPet["status"];
    // Save the changes
    this.storage.set('PetThreeInfo', JSON.stringify(currentPet));
    } else {
     console.log('This pet is dead.')
    }
 }
}

// TRAIN pet button
trainPet(num) {
var currentPet;
 if(num == 1){
 currentPet = this.petStats1;
   if(this.petAlive1 !== 'No'){
      let training = this.modalCtrl.create(ExploretempPage, {petStats: currentPet, petNum: num});
      training.present(); 
    } else {
     console.log('This pet is dead.')
    }
 } else if(num == 2) {
 currentPet = this.petStats2;
   if(this.petAlive2 !== 'No'){
      let training = this.modalCtrl.create(ExploretempPage, {petStats: currentPet, petNum: num});
      training.present(); 
    } else {
     console.log('This pet is dead.')
    }
 } else if(num == 3) {
 currentPet = this.petStats3;
   if(this.petAlive3 !== 'No'){
      let training = this.modalCtrl.create(ExploretempPage, {petStats: currentPet, petNum: num});
      training.present(); 
    } else {
     console.log('This pet is dead.')
    }
 }
}

petSlide1() {
  // Open pilot1 stats to get name and stuff
  this.storage.get('PetOneInfo').then((data) => {

  // Turn pet info into array for stats
  var pet = JSON.parse(data);

  var petName = pet["name"].toUpperCase(); //name

  // Calculate HP percentage based on current and max HP
  var petHP = (parseInt(pet["curVIT"])) / (parseInt(pet["maxVIT"]));
  var petPercentMath = (petHP * 100);
  var petPercent = petPercentMath.toString() + "%";

  // Calculate EXP percentage based on current and max EXP
  var petEXP = (parseInt(pet["curEXP"])) / (parseInt(pet["maxEXP"]));
  var petEXPercentMath = Math.ceil((petEXP * 100));
  var petEXPercent = petEXPercentMath.toString() + "%";
  var petEXPValue = pet["curEXP"] + " / " + pet["maxEXP"];

  // Used to create multiple <p>'s for ATK, DEF, etc.
  var petVIT = '<p id="pilotPageStats"><font color="#FF0000"><b>VIT</b></font> ' + pet["curVIT"] + '/' + pet["maxVIT"] + '</p><br>';
  var petATK = '<p id="pilotPageStats"><font color="#FFCC00"><b>ATK</b>&nbsp;&nbsp;&nbsp;</font>' + pet["ATK"] + '</p><br>';
  var petDEF = '<p id="pilotPageStats"><font color="#00cd00"><b>DEF</b>&nbsp;&nbsp;&nbsp;</font>' + pet["DEF"] + '</p><br>';
  var petDEX = '<p id="pilotPageStats"><font color="#007FFF"><b>SPD</b>&nbsp;&nbsp;&nbsp;</font>' + pet["DEX"] + '</p><br>';
  var petLVL = '<p id="pilotPageStats"><b>LEVEL</b>&nbsp;&nbsp;' + pet["LVL"] + '</p><br>';
  var petStatus = '<br><p id="pilotPageStatsStatus">' + pet["status"] + '</p><br>'; 
  //var pilotEnergy = '<br><p id="pilotPageStats">' + pet["LVL"] + '</p><br>';

  // Set pet likes/dislikes & hobbies
  var petHunger = '<p id="pilotPageRightHunger">' + pet["curHUNGER"] + ' / ' + pet["maxHUNGER"] + '</p><br>';
  var petThirst = '<p id="pilotPageRightThirst">' + pet["curTHIRST"] + ' / ' + pet["maxTHIRST"] + '</p><br>'; // Used as Energy for now
  var petLikes = '<p id="pilotPageRight">' + pet["likes"] + '</p><br>';
  var petDislikes = '<p id="pilotPageRight">' + pet["dislikes"] + '</p><br>'; 
  var petHobby = '<p id="pilotPageRight">' + pet["hobby"] + '</p><br>'; 

  //Player name and level
  document.getElementById("whitetext").innerText = petName;

  // Set player stats on page
  document.getElementById("pilotStatsDiv").innerHTML = petLVL + petVIT + petATK + petDEF + petDEX + petStatus;
  document.getElementById("pilotRightStatsDiv").innerHTML = petHunger + petThirst + petLikes + petDislikes + petHobby;

  // Adjust div width based on EXP %
  document.getElementById("expDiv").innerHTML = '<div id="experienceBar" style="text-align:center; width:' + petEXPercent + ';"></div><p id="exptxt" style="font-size:10px; color:#FFFFFF; text-align:center;">' + petEXPValue + '&nbsp;&nbsp;(' + petEXPercent + ')</p>';

  // Set player color and weapon type
  document.getElementById("pilotColor").innerHTML = '<img id="colorBadge" src="../assets/combat/' + pet["color"] + '.png" style="width: 64px; height: 64px;"/>';

  // Set pett's image
  var petImage = document.getElementById("pilotSprite") as HTMLImageElement;
  petImage.src = '../assets/pets/'+ pet["sprite"] + '.png';

    });  
}

petSlide2() {
  // Open pilot1 stats to get name and stuff
  this.storage.get('PetTwoInfo').then((data) => {

  // Turn pet info into array for stats
  var pet = JSON.parse(data);

  var petName = pet["name"].toUpperCase(); //name

  // Calculate HP percentage based on current and max HP
  var petHP = (parseInt(pet["curVIT"])) / (parseInt(pet["maxVIT"]));
  var petPercentMath = (petHP * 100);
  var petPercent = petPercentMath.toString() + "%";

  // Calculate EXP percentage based on current and max EXP
  var petEXP = (parseInt(pet["curEXP"])) / (parseInt(pet["maxEXP"]));
  var petEXPercentMath = Math.ceil((petEXP * 100));
  var petEXPercent = petEXPercentMath.toString() + "%";
  var petEXPValue = pet["curEXP"] + " / " + pet["maxEXP"];

  // Used to create multiple <p>'s for ATK, DEF, etc.
  var petVIT = '<p id="pilotPageStats"><font color="#FF0000"><b>VIT</b></font> ' + pet["curVIT"] + '/' + pet["maxVIT"] + '</p><br>';
  var petATK = '<p id="pilotPageStats"><font color="#FFCC00"><b>ATK</b>&nbsp;&nbsp;&nbsp;</font>' + pet["ATK"] + '</p><br>';
  var petDEF = '<p id="pilotPageStats"><font color="#00cd00"><b>DEF</b>&nbsp;&nbsp;&nbsp;</font>' + pet["DEF"] + '</p><br>';
  var petDEX = '<p id="pilotPageStats"><font color="#007FFF"><b>SPD</b>&nbsp;&nbsp;&nbsp;</font>' + pet["DEX"] + '</p><br>';
  var petLVL = '<p id="pilotPageStats"><b>LEVEL</b>&nbsp;&nbsp;' + pet["LVL"] + '</p><br>';
  var petStatus = '<br><p id="pilotPageStatsStatus">' + pet["status"] + '</p><br>'; 
  //var pilotEnergy = '<br><p id="pilotPageStats">' + pet["LVL"] + '</p><br>';

  // Set pet likes/dislikes & hobbies
  var petHunger = '<p id="pilotPageRightHunger">' + pet["curHUNGER"] + ' / ' + pet["maxHUNGER"] + '</p><br>';
  var petThirst = '<p id="pilotPageRightThirst">' + pet["curTHIRST"] + ' / ' + pet["maxTHIRST"] + '</p><br>'; // Used as Energy for now
  var petLikes = '<p id="pilotPageRight">' + pet["likes"] + '</p><br>';
  var petDislikes = '<p id="pilotPageRight">' + pet["dislikes"] + '</p><br>'; 
  var petHobby = '<p id="pilotPageRight">' + pet["hobby"] + '</p><br>'; 

  //Player name and level
  document.getElementById("whitetext2").innerText = petName;

  // Set player stats on page
  document.getElementById("pilotStatsDiv2").innerHTML = petLVL + petVIT + petATK + petDEF + petDEX + petStatus;
  document.getElementById("pilotRightStatsDiv2").innerHTML = petHunger + petThirst + petLikes + petDislikes + petHobby;

  // Adjust div width based on EXP %
  document.getElementById("expDiv2").innerHTML = '<div id="experienceBar" style="text-align:center; width:' + petEXPercent + ';"></div><p id="exptxt" style="font-size:10px; color:#FFFFFF; text-align:center;">' + petEXPValue + '&nbsp;&nbsp;(' + petEXPercent + ')</p>';

  // Set player color and weapon type
  document.getElementById("pilotColor2").innerHTML = '<img id="colorBadge" src="../assets/combat/' + pet["color"] + '.png" style="width: 64px; height: 64px;"/>';

  // Set pett's image
  var petImage = document.getElementById("pilotSprite2") as HTMLImageElement;
  petImage.src = '../assets/pets/'+ pet["sprite"] + '.png';

    });  
}

petSlide3() {
  // Open pilot1 stats to get name and stuff
  this.storage.get('PetThreeInfo').then((data) => {

  // Turn pet info into array for stats
  var pet = JSON.parse(data);

  var petName = pet["name"].toUpperCase(); //name

  // Calculate HP percentage based on current and max HP
  var petHP = (parseInt(pet["curVIT"])) / (parseInt(pet["maxVIT"]));
  var petPercentMath = (petHP * 100);
  var petPercent = petPercentMath.toString() + "%";

  // Calculate EXP percentage based on current and max EXP
  var petEXP = (parseInt(pet["curEXP"])) / (parseInt(pet["maxEXP"]));
  var petEXPercentMath = Math.ceil((petEXP * 100));
  var petEXPercent = petEXPercentMath.toString() + "%";
  var petEXPValue = pet["curEXP"] + " / " + pet["maxEXP"];

  // Used to create multiple <p>'s for ATK, DEF, etc.
  var petVIT = '<p id="pilotPageStats"><font color="#FF0000"><b>VIT</b></font> ' + pet["curVIT"] + '/' + pet["maxVIT"] + '</p><br>';
  var petATK = '<p id="pilotPageStats"><font color="#FFCC00"><b>ATK</b>&nbsp;&nbsp;&nbsp;</font>' + pet["ATK"] + '</p><br>';
  var petDEF = '<p id="pilotPageStats"><font color="#00cd00"><b>DEF</b>&nbsp;&nbsp;&nbsp;</font>' + pet["DEF"] + '</p><br>';
  var petDEX = '<p id="pilotPageStats"><font color="#007FFF"><b>SPD</b>&nbsp;&nbsp;&nbsp;</font>' + pet["DEX"] + '</p><br>';
  var petLVL = '<p id="pilotPageStats"><b>LEVEL</b>&nbsp;&nbsp;' + pet["LVL"] + '</p><br>';
  var petStatus = '<br><p id="pilotPageStatsStatus">' + pet["status"] + '</p><br>'; 
  //var pilotEnergy = '<br><p id="pilotPageStats">' + pet["LVL"] + '</p><br>';

  // Set pet likes/dislikes & hobbies
  var petHunger = '<p id="pilotPageRightHunger">' + pet["curHUNGER"] + ' / ' + pet["maxHUNGER"] + '</p><br>';
  var petThirst = '<p id="pilotPageRightThirst">' + pet["curTHIRST"] + ' / ' + pet["maxTHIRST"] + '</p><br>'; // Used as Energy for now
  var petLikes = '<p id="pilotPageRight">' + pet["likes"] + '</p><br>';
  var petDislikes = '<p id="pilotPageRight">' + pet["dislikes"] + '</p><br>'; 
  var petHobby = '<p id="pilotPageRight">' + pet["hobby"] + '</p><br>'; 

  //Player name and level
  document.getElementById("whitetext3").innerText = petName;

  // Set player stats on page
  document.getElementById("pilotStatsDiv3").innerHTML = petLVL + petVIT + petATK + petDEF + petDEX + petStatus;
  document.getElementById("pilotRightStatsDiv3").innerHTML = petHunger + petThirst + petLikes + petDislikes + petHobby;

  // Adjust div width based on EXP %
  document.getElementById("expDiv3").innerHTML = '<div id="experienceBar" style="text-align:center; width:' + petEXPercent + ';"></div><p id="exptxt" style="font-size:10px; color:#FFFFFF; text-align:center;">' + petEXPValue + '&nbsp;&nbsp;(' + petEXPercent + ')</p>';

  // Set player color and weapon type
  document.getElementById("pilotColor3").innerHTML = '<img id="colorBadge" src="../assets/combat/' + pet["color"] + '.png" style="width: 64px; height: 64px;"/>';

  // Set pett's image
  var petImage = document.getElementById("pilotSprite3") as HTMLImageElement;
  petImage.src = '../assets/pets/'+ pet["sprite"] + '.png';

    }); 
}

ionViewWillLeave() {
// Update energy on page leave
  this.storage.get('Profile').then((data) => {

     var profileInfo = JSON.parse(data);
     this.updateEnergy(profileInfo);
 });
}

}
