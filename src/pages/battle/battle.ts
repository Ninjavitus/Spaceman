import { Component } from '@angular/core';
import { Storage } from '@ionic/storage';
import { HangarPage } from '../hangar/hangar';
import { IonicPage, NavController, NavParams } from 'ionic-angular';

/**
 * Generated class for the BattlePage page.
 *
 * See http://ionicframework.com/docs/components/#navigation for more info
 * on Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-battle',
  templateUrl: 'battle.html',
})
export class BattlePage {

  constructor(public navCtrl: NavController, public navParams: NavParams, public storage: Storage) {
  }

  public petTarget: number = 1; // Goes up every time a pet completes an action. If petTarget == 1 then Pet1's turn, if 2 then pet2, etc.
  public petTurns: any = ["", "", ""];// Used to determine order of attack and decide which pet attacked which enemy
  public enemyAmount: any;
  public enemyStats: any; // Saves enemy stats on page load

  public petStats1: any = "None"; // Saves allied pet stats on page load
  public petStats2: any = "None";
  public petStats3: any = "None";

  public petAlive1: any = "No"; // Saves if pet is alive or not. Will be set to yes on page load
  public petAlive2: any = "No";
  public petAlive3: any = "No";

  public eneAlive1: any = "No";// Saves if enemy is alive or not. Will be set to yes on page load
  public eneAlive2: any = "No";
  public eneAlive3: any = "No";

  public enemyDeadCount: number = 0;
  public petDeadCount: number = 0;

  public buttonClicked: boolean = false; //ASSIST button 1
  public buttonClicked2: boolean = false; //ASSIST button 2
  public buttonClicked3: boolean = false; //ASSIST button 3

  public showEnemy1: boolean = false; //ATTACK target 1
  public showEnemy2: boolean = false; //ATTACK target 2
  public showEnemy3: boolean = false; //ATTACK target 3

  public resetOrder: boolean = false; //Resets all the previously chosen targets
  public startCombat: boolean = false; //Start combat button

  public turnBG1: boolean = false; //Set the BG behind whose turn it is
  public turnBG2: boolean = false; 
  public turnBG3: boolean = false; 

  public onButtonClick(target) {
   if(this.petTarget == 1){
   this.petTurns[0] = "DEF" + target;
   this.buttonClicked = !this.buttonClicked; // Bring back first pet assist button
   this.buttonClicked2 = !this.buttonClicked2; // Remove 2nd pet assist button since it will be his turn now.
   this.turnBG1 = !this.turnBG1;
   this.turnBG2 = !this.turnBG2;
   this.petTarget++;
   } else if(this.petTarget == 2){
   this.petTurns[1] = "DEF" + target;
   this.buttonClicked2 = !this.buttonClicked2; // Bring back 2nd pet assist button since it's 3rd pet's turn now
   this.buttonClicked3 = !this.buttonClicked3; // Remove third player button
   this.turnBG2 = !this.turnBG2;
   this.turnBG3 = !this.turnBG3;
   this.petTarget++;
   } else if(this.petTarget == 3){
   this.petTarget++;
   this.petTurns[2] = "DEF" + target;
   // Now that all actions have been taken, remove all buttons and show FIGHT and RESET buttons.
   this.buttonClicked = false;
   this.buttonClicked2 = false; 
   this.showEnemy1 = false; 
   this.showEnemy2 = false;
   this.showEnemy3 = false;
   // Make FIGHT and RESET buttons appear
   this.resetOrder = true;
   this.startCombat = true;
   // Remove BG
   this.turnBG3 = false;
   }
  }

  ionViewDidLoad() {
  setTimeout(() => {
  var planet = this.navParams.get('planet');
  var level = this.navParams.get('level');

  var planetImage = document.getElementById("battlefield") as HTMLImageElement;
  planetImage.style.background = 'url("/assets/planets/' + planet + '.png")' + 'no-repeat';
  planetImage.style.backgroundSize = 'cover';
  //planetImage.setAttribute("style","position:absolute; top: 33%; width:100%");

   this.partySprites();
   this.planetEnemies(planet, level);
   }, 200);  
  }

  // Animate test
  animateTest(num, who){

  var pokeFieldNum = "Field" + num; // Animate all pokemon
  var pokeMove;

  var pos = 0;
  var moveBack = 0;
  var moveFront = 1;
  var moveToDefault = 1;
  if(who == 'E'){
  pokeMove = document.getElementById("evil" + pokeFieldNum) as HTMLImageElement;
  var moveTimer = setInterval(animateThisEnemy, 6); //5 For Auto x2 version, 7 for regular.
  } else if(who == 'P'){
  pokeMove = document.getElementById("poke" + pokeFieldNum) as HTMLImageElement;
  var moveTimer = setInterval(animateThisAlly, 6); //5 For Auto x2 version, 7 for regular. 
  }

  var initialPosition;
  
  if(num == 1){
  initialPosition = 21;
  }else if(num == 2){
  initialPosition = 7;
  }else if(num == 3){
  initialPosition = 10;
  }

  function animateThisAlly(){
  
    var currentPosition = initialPosition - moveBack; // Get the current position
    var newPositionFront = currentPosition + moveFront;
    var newPositionFinal = newPositionFront - moveToDefault;

    if (pos == 40) {
      clearInterval(moveTimer);
      console.log("Finished");
    } else if(pos <= 6) {
      pokeMove.style.left = currentPosition + '%'; //Move him back 4%. Current Pos at 6%
      moveBack++;
      pos++; 
    } else if(pos > 6 && pos < 28){
      pokeMove.style.left = newPositionFront + '%'; //Move him forward 8%
      moveFront++;
      pos++; 
    } else if(pos >= 28){ // If he's not back where he started,
      pokeMove.style.left = newPositionFinal + '%'; //Move him back
      moveToDefault++;
        if(newPositionFinal == initialPosition){
        // If he's back to where he started
        pos = 40;
        }
    }
    }

  function animateThisEnemy(){
  
    var currentPosition = initialPosition - moveBack; // Get the current position
    var newPositionFront = currentPosition + moveFront;
    var newPositionFinal = newPositionFront - moveToDefault;

    if (pos == 40) {
      clearInterval(moveTimer);
      console.log("Finished");
    } else if(pos <= 6) {
      pokeMove.style.right = currentPosition + '%'; //Move him back 4%. Current Pos at 6%
      moveBack++;
      pos++; 
    } else if(pos > 6 && pos < 28){
      pokeMove.style.right = newPositionFront + '%'; //Move him forward 8%
      moveFront++;
      pos++; 
    } else if(pos >= 28){ // If he's not back where he started,
      pokeMove.style.right = newPositionFinal + '%'; //Move him back
      moveToDefault++;
        if(newPositionFinal == initialPosition){
        // If he's back to where he started
        pos = 40;
        }
    }
    }
    if(who == "E"){ //Animate if enemy, else animate ally
    animateThisEnemy();
    } else if(who == "P"){
    animateThisAlly();
    }
  }

  // Sets the sprites of your pet party
  partySprites() {
    // Check how many pets the player has and place them on the screen
  this.storage.get('PilotInfo').then((data) => {
  
  var profileInfo = JSON.parse(data); 
 
  if(profileInfo["Pet1"] == "Yes"){
  this.storage.get('PetOneInfo').then((data1) => {
  var petInfo1 = JSON.parse(data1);
  this.petStats1 = petInfo1; // Set Pet stats as public variable
  this.petAlive1 = "Yes";
  this.turnBG1 = true;
  document.getElementById("pokeView1").innerHTML = '<img id="pokeBattle1" src="../assets/combat/' + petInfo1["sprite"] + '.png" style="width: 70px; height: 70px;" /><div id="petHP1"><h1>'+ petInfo1["curVIT"] + ' / ' + petInfo1["maxVIT"] +'</h1></div>';
   });  
  }

  if(profileInfo["Pet2"] == "Yes"){
  this.storage.get('PetTwoInfo').then((data2) => {
  var petInfo2 = JSON.parse(data2);
  this.petStats2 = petInfo2; 
  this.petAlive2 = "Yes";
  this.buttonClicked2 = true; // If they have a 2nd or 3rd Pet, add the ASSIST buttons.
  document.getElementById("pokeView2").innerHTML = '<img id="pokeBattle2" src="../assets/combat/' + petInfo2["sprite"] + '.png" style="width: 70px; height: 70px;" /><div id="petHP2"><h1>'+ petInfo2["curVIT"] + ' / ' + petInfo2["maxVIT"] +'</h1></div>';
   });   
  }

  if(profileInfo["Pet3"] == "Yes"){
  this.storage.get('PetThreeInfo').then((data3) => {
  var petInfo3 = JSON.parse(data3);
  this.petStats3 = petInfo3; 
  this.petAlive3 = "Yes";
  document.getElementById("pokeView3").innerHTML = '<img id="pokeBattle3" src="../assets/combat/' + petInfo3["sprite"] + '.png" style="width: 70px; height: 70px;" /><div id="petHP3"><h1>'+ petInfo3["curVIT"] + ' / ' + petInfo3["maxVIT"] +'</h1></div>';
   this.buttonClicked3 = true;
  }); 
  }

   });
  }

  planetEnemies(planet, level){
  // Check what planet it is
  if(planet == "grass") {
   // Predetermined monsters for every level. Can find RNG and goodies (loot) when venturing into the Wilderness
   // AB = Ability 1,2,3. L1,2,3,4,5 = Loot 1 to 5. 1 common, 5 super rare. 
   // Determine base stats for all enemies found on this planet, then generate new instances of the enemies (with their stats scaling with lvl)
   var level1 = { amount: "1", name: "POLIWHIRL", sprite: "4", LVL: "1", curVIT: "8", maxVIT: "8", ATK: "4", DEF: "3", DEX: "3", FTH: "1", color: "purple", PROF: "none", AB1: "", AB2: "", AB3: "", L1: "", L2: "", L3: "", L4: "", L5: ""};
   var level2 = { amount: "1", name: "MUDKIPS", sprite: "3", LVL: "1", curVIT: "8", maxVIT: "8", ATK: "4", DEF: "3", DEX: "3", FTH: "1", color: "blue", PROF: "none", AB1: "", AB2: "", AB3: "", L1: "", L2: "", L3: "", L4: "", L5: ""};
   var level3 = { amount: "1", name: "PLUSLE", sprite: "5", LVL: "1", curVIT: "8", maxVIT: "8", ATK: "4", DEF: "3", DEX: "3", FTH: "1", color: "gold", PROF: "none", AB1: "", AB2: "", AB3: "", L1: "", L2: "", L3: "", L4: "", L5: ""};
   var level4 = { amount: "1", name: "UMBREON", sprite: "6", LVL: "1", curVIT: "8", maxVIT: "8", ATK: "4", DEF: "3", DEX: "3", FTH: "1", color: "red", PROF: "none", AB1: "", AB2: "", AB3: "", L1: "", L2: "", L3: "", L4: "", L5: ""};

   // New stats = Base Stats * (Level / 2)
   var level5 = { amount: "1", name: "POLIWHIRL", sprite: "4", LVL: "1", curVIT: "8", maxVIT: "8", ATK: "4", DEF: "3", DEX: "3", FTH: "1", color: "purple", PROF: "none", AB1: "", AB2: "", AB3: "", L1: "", L2: "", L3: "", L4: "", L5: ""};
   var level6 = { amount: "1", name: "POLIWHIRL", sprite: "4", LVL: "1", curVIT: "8", maxVIT: "8", ATK: "4", DEF: "3", DEX: "3", FTH: "1", color: "purple", PROF: "none", AB1: "", AB2: "", AB3: "", L1: "", L2: "", L3: "", L4: "", L5: ""};
   var level7 = { amount: "1", name: "POLIWHIRL", sprite: "4", LVL: "1", curVIT: "8", maxVIT: "8", ATK: "4", DEF: "3", DEX: "3", FTH: "1", color: "purple", PROF: "none", AB1: "", AB2: "", AB3: "", L1: "", L2: "", L3: "", L4: "", L5: ""};
   var level8 = { amount: "1", name: "POLIWHIRL", sprite: "4", LVL: "1", curVIT: "8", maxVIT: "8", ATK: "4", DEF: "3", DEX: "3", FTH: "1", color: "purple", PROF: "none", AB1: "", AB2: "", AB3: "", L1: "", L2: "", L3: "", L4: "", L5: ""};
 
   // If multiple enemies we need to nest the objects/arrays. Amount determines how many enemies in the object
   var level9 = {
                   amount: "2",
                   enemy1 : { 'name': "POLIWHIRL", 'sprite': "4", 'LVL': "1", 'curVIT': "8", 'maxVIT': "8", 'ATK': "4", 'DEF': "3", 'DEX': "3", 'FTH': "1", 'color': "red", 'PROF': "none", 'AB1': "", 'AB2': "", 'AB3': "", 'L1': "", 'L2': "", 'L3': "", 'L4': "", 'L5': ""},
                   enemy2 : { 'name': "UMBREON", 'sprite': "6", 'LVL': "1", 'curVIT': "8", 'maxVIT': "8", 'ATK': "4", 'DEF': "3", 'DEX': "3", 'FTH': "1", 'color': "red", 'PROF': "none", 'AB1': "", 'AB2': "", 'AB3': "", 'L1': "", 'L2': "", 'L3': "", 'L4': "", 'L5': ""}
                      };

   // If multiple enemies we need to nest the objects/arrays. Amount determines how many enemies in the object
   var level10 = {
                   amount: "3",
                   enemy1 : { 'name': "POLIWHIRL", 'sprite': "4", 'LVL': "1", 'curVIT': "8", 'maxVIT': "8", 'ATK': "4", 'DEF': "3", 'DEX': "3", 'FTH': "1", 'color': "red", 'PROF': "none", 'AB1': "", 'AB2': "", 'AB3': "", 'L1': "", 'L2': "", 'L3': "", 'L4': "", 'L5': ""},
                   enemy2 : { 'name': "UMBREON", 'sprite': "6", 'LVL': "1", 'curVIT': "8", 'maxVIT': "8", 'ATK': "4", 'DEF': "3", 'DEX': "3", 'FTH': "1", 'color': "red", 'PROF': "none", 'AB1': "", 'AB2': "", 'AB3': "", 'L1': "", 'L2': "", 'L3': "", 'L4': "", 'L5': ""},
                   enemy3 : { 'name': "MUDKIPS", 'sprite': "3", 'LVL': "1", 'curVIT': "8", 'maxVIT': "8", 'ATK': "4", 'DEF': "3", 'DEX': "3", 'FTH': "1", 'color': "red", 'PROF': "none", 'AB1': "", 'AB2': "", 'AB3': "", 'L1': "", 'L2': "", 'L3': "", 'L4': "", 'L5': ""}
                      };

   // Make array with all enemies, then use level & array to determine which enemy
   //var allEnemiesSTR = {evil1: JSON.stringify(enemy1), evil2: JSON.stringify(enemy2), evil3: JSON.stringify(enemy3), evil4: JSON.stringify(enemy4), evil5: JSON.stringify(enemy5), evil6: JSON.stringify(enemy6), evil7: JSON.stringify(enemy7), evil8: JSON.stringify(enemy8), evil9: JSON.stringify(enemy9), evil10: JSON.stringify(enemy10)};
   var allEnemies = {evil1: level1, evil2: level2, evil3: level3, evil4: level4, evil5: level5, evil6: level6, evil7: level7, evil8: level8, evil9: level9, evil10: level10 };
   
   // Get which level it is, and the amount of enemies in that level
   var levelInfo = allEnemies["evil" + level];

   this.enemyStats = levelInfo;
   this.enemyAmount = levelInfo["amount"];

   // If there are more than one enemies, get their information.
   var enemyInfo1 = levelInfo["enemy1"];
   var enemyInfo2 = levelInfo["enemy2"];
   var enemyInfo3 = levelInfo["enemy3"];

   if(levelInfo["amount"] == '1') {
   this.eneAlive1 = "Yes";
   this.showEnemy1 = true; // Shows attack button
   document.getElementById("evilView1").innerHTML = '<img id="evilBattle1" src="../assets/combat/' + levelInfo["sprite"] + '.png" style="width: 70px; height: 70px;" /><div id="eneHP1"><h1>'+ levelInfo["curVIT"] + ' / ' + levelInfo["maxVIT"] +'</h1></div>';
 
   } else if(levelInfo["amount"] == '2') {
   this.eneAlive1 = "Yes";
   this.eneAlive2 = "Yes";
   this.showEnemy1 = true;
   this.showEnemy2 = true;
  document.getElementById("evilView1").innerHTML = '<img id="evilBattle1" src="../assets/combat/' + enemyInfo1["sprite"] + '.png" style="width: 70px; height: 70px;" /><div id="eneHP1"><h1>'+ enemyInfo1["curVIT"] + ' / ' + enemyInfo1["maxVIT"] +'</h1></div>';
  document.getElementById("evilView2").innerHTML = '<img id="evilBattle2" src="../assets/combat/' + enemyInfo2["sprite"] + '.png" style="width: 70px; height: 70px;" /><div id="eneHP2"><h1>'+ enemyInfo2["curVIT"] + ' / ' + enemyInfo2["maxVIT"] +'</h1></div>';

   } else if(levelInfo["amount"] == '3') {
   this.eneAlive1 = "Yes";
   this.eneAlive2 = "Yes";
   this.eneAlive3 = "Yes";
   this.showEnemy1 = true; 
   this.showEnemy2 = true;
   this.showEnemy3 = true;
  document.getElementById("evilView1").innerHTML = '<img id="evilBattle1" src="../assets/combat/' + enemyInfo1["sprite"] + '.png" style="width: 70px; height: 70px;" /><div id="eneHP1"><h1>'+ enemyInfo1["curVIT"] + ' / ' + enemyInfo1["maxVIT"] +'</h1></div>';
  document.getElementById("evilView2").innerHTML = '<img id="evilBattle2" src="../assets/combat/' + enemyInfo2["sprite"] + '.png" style="width: 70px; height: 70px;" /><div id="eneHP2"><h1>'+ enemyInfo2["curVIT"] + ' / ' + enemyInfo2["maxVIT"] +'</h1></div>';
  document.getElementById("evilView3").innerHTML = '<img id="evilBattle3" src="../assets/combat/' + enemyInfo3["sprite"] + '.png" style="width: 70px; height: 70px;" /><div id="eneHP3"><h1>'+ enemyInfo3["curVIT"] + ' / ' + enemyInfo3["maxVIT"] +'</h1></div>';
   }
  
   }
  }

  // Choose which pet attacks and save that value to the petTurns array.
  chooseTarget(target){
  // Determine the fight order. Ally pet goes first, then enemy, then ally pet, then enemy, etc.
   if(this.petTarget == 1){
   this.petTurns[0] = "ATK" + target;
   this.petTarget++;
   this.buttonClicked = !this.buttonClicked; // Bring back first pet assist button
   this.buttonClicked2 = !this.buttonClicked2; // Remove 2nd pet assist button since it will be his turn now.
   this.turnBG1 = !this.turnBG1;
   this.turnBG2 = !this.turnBG2;
   } else if(this.petTarget == 2){
   this.petTurns[1] = "ATK" + target;
   this.petTarget++;
   this.buttonClicked2 = !this.buttonClicked2; // Bring back 2nd pet assist button since it's 3rd pet's turn now
   this.buttonClicked3 = !this.buttonClicked3; // Remove third player button
   this.turnBG2 = !this.turnBG2;
   this.turnBG3 = !this.turnBG3;
   } else if(this.petTarget == 3){
   this.petTarget++;
   this.petTurns[2] = "ATK" + target;
   // Now that all actions have been taken, remove all buttons and show FIGHT and RESET buttons.
   this.buttonClicked = false;
   this.buttonClicked2 = false; 
   this.showEnemy1 = false; 
   this.showEnemy2 = false;
   this.showEnemy3 = false;
   // Make FIGHT and RESET buttons appear
   this.resetOrder = true;
   this.startCombat = true;
   // Remove BG
   this.turnBG3 = false;
   }
  }

  // Reset attack turns and make buttons come back
  resetTargets(){

  // Do something if all enemies are dead
  if(parseInt(this.enemyAmount) <= this.enemyDeadCount){
  console.log("You win!");
  } else if (parseInt(this.enemyAmount) <= this.petDeadCount) { // Do something if all pets are dead
  console.log("You lose!");
  } else {
  this.petTarget = 1;
  this.petTurns = ["", "", ""];

  this.storage.get('PilotInfo').then((data) => {
  var profileInfo = JSON.parse(data); 
 
  if(profileInfo["Pet1"] == "Yes"){
    // Do nothing if he only has 1 pet.
  }

  if(profileInfo["Pet2"] == "Yes"){
  this.buttonClicked2 = !this.buttonClicked2; // If they have a 2nd or 3rd Pet, add the ASSIST buttons. 
  }

  if(profileInfo["Pet3"] == "Yes"){
   this.buttonClicked3 = !this.buttonClicked3;
  }
  });
 // Reset all ATTACK buttons regardless based on how many enemy
  if(this.enemyAmount == '1'){
   this.showEnemy1 = true;
  } else if(this.enemyAmount == '2'){
   this.showEnemy1 = true;
   this.showEnemy2 = true;
  } else if(this.enemyAmount == '3'){
   this.showEnemy1 = true;
   this.showEnemy2 = true;
   this.showEnemy3 = true;
  }
   // Make FIGHT and RESET buttons DISAPPEAR
   this.resetOrder =  false;
   this.startCombat = false;
   // Make BG Reappear (only need the first one)
   this.turnBG1 = true;
  }
  }

  testVariables(){
      var movePet1 = this.petTurns[0].substring(0, 3); //First pet's move. Returns 3 letters; either DEF or ATK to determine the type of move.
      

      var targetMove1 = this.petTurns[0].substring(3); // Who the pet is tagetting with it's move. Removes first 3 letters to return a value 1, 2 or 3
 console.log(movePet1);
 console.log(targetMove1);
  }

  startFight(){
  // This is always Phase 1 of the fight. Necessary variables will be moved along to other phases.

   console.log("Phase 1");
      // Pet Info 1,2,3, Enemy info : this.enemyStats;, Turn info : this.petTurns;
      var movePet1 = this.petTurns[0].substring(0, 3); //First pet's move. Returns 3 letters; either DEF or ATK to determine the type of move.
      var movePet2 = this.petTurns[1].substring(0, 3); // 2nd pet's move
      var movePet3 = this.petTurns[2].substring(0, 3); // 3rd pet's move 

      var targetMove1 = this.petTurns[0].substring(3); // Who the pet is tagetting with it's move. Removes first 3 letters to return a value 1, 2 or 3
      var targetMove2 = this.petTurns[1].substring(3); // Who Pet2 is targetting
      var targetMove3 = this.petTurns[2].substring(3); // Who Pet3 is targetting

      var currentEnemy1 = this.enemyStats["enemy" + targetMove1]; // Get the stats and info of the target. Only accessed if movePet is ATK.
      var currentEnemy2 = this.enemyStats["enemy" + targetMove2];
      var currentEnemy3 = this.enemyStats["enemy" + targetMove3];

      // We need to use targetMove to determine WHICH ally pet to ASSIST

      if(this.petStats1 !== "None"){ // Check if we have Pet1 stats or not. If he has pet, determine type of attack.
        if(movePet1 == "DEF"){
            //Do something if he's defending
        } else if(movePet1 == "ATK"){
           //Pet stats
           var pATK = parseInt(this.petStats1["ATK"]);
           var pMaxATK = pATK / 5;
           var pDEX = parseInt(this.petStats1["DEX"]);
           var pDEF = parseInt(this.petStats1["DEF"]);
           var pMaxVIT = parseInt(this.petStats1["maxVIT"]);
           var pCurVIT = parseInt(this.petStats1["curVIT"]);
           var pColor = this.petStats1["color"];

           //Enemy stats
           var eDEX = parseInt(currentEnemy1["DEX"]);
           var eDEF = parseInt(currentEnemy1["DEF"]);
           var eMaxVIT = parseInt(currentEnemy1["maxVIT"]);
           var eCurVIT = parseInt(currentEnemy1["curVIT"]);
           var eColor = parseInt(currentEnemy1["color"]);

           //Calculate damage
	       var petDMG = Math.ceil((Math.random() * pMaxATK) + pATK); //Return random number between ATK and ATK times 1.2
           var petDMGBonus = petDMG * 1.5; // Add bonus damage based on color. In Future : Add ColorStrength stat to compare the enemy stat to whatever your pet's color is strong against.
           var dmgDealt = petDMGBonus - eDEF; // Reduce damage by enemy's defence.
           // If the enemy has more defence than the amount of damage dealt, damage is set to 0.
           if(dmgDealt < 0){
              dmgDealt = 0; 
           }

           // Reduce enemy health by dmgDealt
           currentEnemy1["curVIT"] = parseInt(currentEnemy1["curVIT"]) - dmgDealt;

           if(currentEnemy1["curVIT"] <= 0){ // If the enemy is at 0 health or less, he died.
               //Kill enemy
               //Remove enemy button
               // Set public variable for button resets
               // Replace sprite with dead sprite
               // Skip the enemy's attack and it's now Phase 3
               currentEnemy1["curVIT"] = 0;
             this.battlePhase2(currentEnemy1, currentEnemy2, currentEnemy3, movePet1, movePet2, movePet3, targetMove1, targetMove2, targetMove3);
           } else { //If not dead, move on to next phase
             this.battlePhase2(currentEnemy1, currentEnemy2, currentEnemy3, movePet1, movePet2, movePet3, targetMove1, targetMove2, targetMove3);
           }

             setTimeout(() => {
           // Check which enemy was targeted, and update their picture and health.
            if(targetMove1 == '1'){
             document.getElementById("evilView1").innerHTML = '<img id="evilBattle1" src="../assets/combat/' + currentEnemy1["sprite"] + '.png" style="width: 70px; height: 70px;" /><div id="eneHP1"><h1>'+ currentEnemy1["curVIT"] + ' / ' + currentEnemy1["maxVIT"] +'</h1></div>';
              
            }else if(targetMove1 == '2'){
             document.getElementById("evilView2").innerHTML = '<img id="evilBattle2" src="../assets/combat/' + currentEnemy1["sprite"] + '.png" style="width: 70px; height: 70px;" /><div id="eneHP2"><h1>'+ currentEnemy1["curVIT"] + ' / ' + currentEnemy1["maxVIT"] +'</h1></div>';

            }else if(targetMove1 == '3'){
             document.getElementById("evilView3").innerHTML = '<img id="evilBattle3" src="../assets/combat/' + currentEnemy1["sprite"] + '.png" style="width: 70px; height: 70px;" /><div id="eneHP3"><h1>'+ currentEnemy1["curVIT"] + ' / ' + currentEnemy1["maxVIT"] +'</h1></div>'; 
            }
          }, 300);
        }
      }
  }

  // Enemy1's turn after Pet1 went.
  battlePhase2(currentEnemy1, currentEnemy2, currentEnemy3, movePet1, movePet2, movePet3, targetMove1, targetMove2, targetMove3){

  console.log("Phase 2");
    targetMove1 = '1';
  
        if(this.petStats1 !== "None"){ // Check if we have Pet1 stats or not. If he has pet, determine type of attack.

           //Pet stats
           var pATK = parseInt(this.petStats1["ATK"]);
           var pMaxATK = pATK / 5;
           var pDEX = parseInt(this.petStats1["DEX"]);
           var pDEF = parseInt(this.petStats1["DEF"]);
           var pMaxVIT = parseInt(this.petStats1["maxVIT"]);
           var pCurVIT = parseInt(this.petStats1["curVIT"]);
           var pColor = this.petStats1["color"];

           //Enemy stats
           var eATK = parseInt(currentEnemy2["ATK"]);
           var eMaxATK = eATK / 5;
           var eDEX = parseInt(currentEnemy2["DEX"]);
           var eDEF = parseInt(currentEnemy2["DEF"]);
           var eMaxVIT = parseInt(currentEnemy2["maxVIT"]);
           var eCurVIT = parseInt(currentEnemy2["curVIT"]);
           var eColor = parseInt(currentEnemy2["color"]);

           //Calculate damage
	       var eneDMG = Math.ceil((Math.random() * eMaxATK) + eATK); //Return random number between ATK and ATK times 1.2
           var eneDMGBonus = eneDMG * 1.5; // Add bonus damage based on color. In Future : Add ColorStrength stat to compare the enemy stat to whatever your pet's color is strong against.
           var dmgDealt = eneDMGBonus - pDEF; // Reduce damage by enemy's defence.
           // If the enemy has more defence than the amount of damage dealt, damage is set to 0.
           if(dmgDealt < 0){
              dmgDealt = 0; 
            }

           // Reduce pet health by dmgDealt
           this.petStats1["curVIT"] = parseInt(this.petStats1["curVIT"]) - dmgDealt;

           if(this.petStats1["curVIT"] <= 0){ // If the pet is at 0 health or less, he died.
               //Kill enemy
               //Remove enemy button
               // Set public variable for button resets
               // Replace sprite with dead sprite
               // Phase 3 if he kills anyone but Pet2. If Pet2 dies, skip to Phase 4. Testfor Death at the start of every phase.
               currentEnemy1["curVIT"] = 0;
               this.petDeadCount++;
             this.battlePhase3(currentEnemy1, currentEnemy2, currentEnemy3, movePet2, movePet3, targetMove2, targetMove3);
           } else { //If not dead, move on to next phase
             this.battlePhase3(currentEnemy1, currentEnemy2, currentEnemy3, movePet2, movePet3, targetMove2, targetMove3);
           }

             setTimeout(() => {
           // Check which enemy was targeted, and update their picture and health.
            if(targetMove1 == '1'){
             document.getElementById("pokeView1").innerHTML = '<img id="pokeBattle1" src="../assets/combat/' + this.petStats1["sprite"] + '.png" style="width: 70px; height: 70px;" /><div id="petHP1"><h1>'+ this.petStats1["curVIT"] + ' / ' + this.petStats1["maxVIT"] +'</h1></div>';
              
            }else if(targetMove1 == '2'){
             document.getElementById("pokeView2").innerHTML = '<img id="pokeBattle2" src="../assets/combat/' + this.petStats2["sprite"] + '.png" style="width: 70px; height: 70px;" /><div id="petHP2"><h1>'+ this.petStats2["curVIT"] + ' / ' + this.petStats2["maxVIT"] +'</h1></div>';

            }else if(targetMove1 == '3'){
             document.getElementById("pokeView3").innerHTML = '<img id="pokeBattle3" src="../assets/combat/' + this.petStats3["sprite"] + '.png" style="width: 70px; height: 70px;" /><div id="petHP3"><h1>'+ this.petStats3["curVIT"] + ' / ' + this.petStats3["maxVIT"] +'</h1></div>'; 
            }
          }, 300);
        }
      }

  // Pet2's turn after Enemy1 went.
  battlePhase3(currentEnemy1, currentEnemy2, currentEnemy3, movePet2, movePet3, targetMove2, targetMove3){
   console.log("Phase 3");
        if(this.petStats2 !== "None"){ // Check if we have Pet1 stats or not. If he has pet, determine type of attack.
        if(movePet2 == "DEF"){
            //Do something if he's defending
        } else if(movePet2 == "ATK"){
           //Pet stats
           var pATK = parseInt(this.petStats2["ATK"]);
           var pMaxATK = pATK / 5;
           var pDEX = parseInt(this.petStats2["DEX"]);
           var pDEF = parseInt(this.petStats2["DEF"]);
           var pMaxVIT = parseInt(this.petStats2["maxVIT"]);
           var pCurVIT = parseInt(this.petStats2["curVIT"]);
           var pColor = this.petStats2["color"];

           //Enemy stats
           var eDEX = parseInt(currentEnemy2["DEX"]);
           var eDEF = parseInt(currentEnemy2["DEF"]);
           var eMaxVIT = parseInt(currentEnemy2["maxVIT"]);
           var eCurVIT = parseInt(currentEnemy2["curVIT"]);
           var eColor = parseInt(currentEnemy2["color"]);

           //Calculate damage
	       var petDMG = Math.ceil((Math.random() * pMaxATK) + pATK); //Return random number between ATK and ATK times 1.2
           var petDMGBonus = petDMG * 1.5; // Add bonus damage based on color. In Future : Add ColorStrength stat to compare the enemy stat to whatever your pet's color is strong against.
           var dmgDealt = petDMGBonus - eDEF; // Reduce damage by enemy's defence.
           // If the enemy has more defence than the amount of damage dealt, damage is set to 0.
           if(dmgDealt < 0){
              dmgDealt = 0; 
           }

           // Reduce enemy health by dmgDealt
           currentEnemy2["curVIT"] = parseInt(currentEnemy2["curVIT"]) - dmgDealt;

           if(currentEnemy2["curVIT"] <= 0){ // If the enemy is at 0 health or less, he died.
               //Kill enemy
               //Remove enemy button
               // Set public variable for button resets
               // Replace sprite with dead sprite
               // Skip the enemy's attack and it's now Phase 3
               currentEnemy2["curVIT"] = 0;
               this.enemyDeadCount++;
             this.battlePhase4(currentEnemy2, currentEnemy3, movePet3, targetMove2, targetMove3);
           } else { //If not dead, move on to next phase
             this.battlePhase4(currentEnemy2, currentEnemy3, movePet3, targetMove2, targetMove3);
           }

             setTimeout(() => {
           // Check which enemy was targeted, and update their picture and health.
            if(targetMove2 == '1'){
             document.getElementById("evilView1").innerHTML = '<img id="evilBattle1" src="../assets/combat/' + currentEnemy2["sprite"] + '.png" style="width: 70px; height: 70px;" /><div id="eneHP1"><h1>'+ currentEnemy2["curVIT"] + ' / ' + currentEnemy2["maxVIT"] +'</h1></div>';
              
            }else if(targetMove2 == '2'){
             document.getElementById("evilView2").innerHTML = '<img id="evilBattle2" src="../assets/combat/' + currentEnemy2["sprite"] + '.png" style="width: 70px; height: 70px;" /><div id="eneHP2"><h1>'+ currentEnemy2["curVIT"] + ' / ' + currentEnemy2["maxVIT"] +'</h1></div>';

            }else if(targetMove2 == '3'){
             document.getElementById("evilView3").innerHTML = '<img id="evilBattle3" src="../assets/combat/' + currentEnemy2["sprite"] + '.png" style="width: 70px; height: 70px;" /><div id="eneHP3"><h1>'+ currentEnemy2["curVIT"] + ' / ' + currentEnemy2["maxVIT"] +'</h1></div>'; 
            }
          }, 300);
        }
      }
  }

  // Enemy2's turn after Pet2 went.
  battlePhase4(currentEnemy2, currentEnemy3, movePet3, targetMove2, targetMove3){
   console.log("Phase 4");
    var targetMove1 = '2';
  
        if(this.petStats1 !== "None"){ // Check if we have Pet1 stats or not. If he has pet, determine type of attack.

           //Pet stats
           var pDEX = parseInt(this.petStats2["DEX"]);
           var pDEF = parseInt(this.petStats2["DEF"]);
           var pMaxVIT = parseInt(this.petStats2["maxVIT"]);
           var pCurVIT = parseInt(this.petStats2["curVIT"]);
           var pColor = this.petStats2["color"];

           //Enemy stats
           var eATK = parseInt(currentEnemy2["ATK"]);
           var eMaxATK = eATK / 5;
           var eDEX = parseInt(currentEnemy2["DEX"]);
           var eDEF = parseInt(currentEnemy2["DEF"]);
           var eMaxVIT = parseInt(currentEnemy2["maxVIT"]);
           var eCurVIT = parseInt(currentEnemy2["curVIT"]);
           var eColor = parseInt(currentEnemy2["color"]);

           //Calculate damage
	       var eneDMG = Math.ceil((Math.random() * eMaxATK) + eATK); //Return random number between ATK and ATK times 1.2
           var eneDMGBonus = eneDMG * 1.5; // Add bonus damage based on color. In Future : Add ColorStrength stat to compare the enemy stat to whatever your pet's color is strong against.
           var dmgDealt = eneDMGBonus - pDEF; // Reduce damage by enemy's defence.
           // If the enemy has more defence than the amount of damage dealt, damage is set to 0.
           if(dmgDealt < 0){
              dmgDealt = 0; 
            }

           // Reduce pet health by dmgDealt
           this.petStats2["curVIT"] = parseInt(this.petStats2["curVIT"]) - dmgDealt;

           if(this.petStats2["curVIT"] <= 0){ // If the pet is at 0 health or less, he died.
               //Kill enemy
               //Remove enemy button
               // Set public variable for button resets
               // Replace sprite with dead sprite
               // Phase 3 if he kills anyone but Pet2. If Pet2 dies, skip to Phase 4. Testfor Death at the start of every phase.
               currentEnemy2["curVIT"] = 0;
               this.petDeadCount++;
             this.battlePhase5(currentEnemy3, movePet3, targetMove3);
           } else { //If not dead, move on to next phase
             this.battlePhase5(currentEnemy3, movePet3, targetMove3);
           }

             setTimeout(() => {
           // Check which enemy was targeted, and update their picture and health.
            if(targetMove1 == '1'){
             document.getElementById("pokeView1").innerHTML = '<img id="pokeBattle1" src="../assets/combat/' + this.petStats1["sprite"] + '.png" style="width: 70px; height: 70px;" /><div id="petHP1"><h1>'+ this.petStats1["curVIT"] + ' / ' + this.petStats1["maxVIT"] +'</h1></div>';
              
            }else if(targetMove1 == '2'){
             document.getElementById("pokeView2").innerHTML = '<img id="pokeBattle2" src="../assets/combat/' + this.petStats2["sprite"] + '.png" style="width: 70px; height: 70px;" /><div id="petHP2"><h1>'+ this.petStats2["curVIT"] + ' / ' + this.petStats2["maxVIT"] +'</h1></div>';

            }else if(targetMove1 == '3'){
             document.getElementById("pokeView3").innerHTML = '<img id="pokeBattle3" src="../assets/combat/' + this.petStats3["sprite"] + '.png" style="width: 70px; height: 70px;" /><div id="petHP3"><h1>'+ this.petStats3["curVIT"] + ' / ' + this.petStats3["maxVIT"] +'</h1></div>'; 
            }
          }, 300);
        }
  }

  // Pet3's turn after Enemy2 went.
  battlePhase5(currentEnemy3, movePet3, targetMove3){
   console.log("Phase 5");
        if(this.petStats3 !== "None"){ // Check if we have Pet1 stats or not. If he has pet, determine type of attack.
        if(movePet3 == "DEF"){
            //Do something if he's defending
        } else if(movePet3 == "ATK"){
           //Pet stats
           var pATK = parseInt(this.petStats3["ATK"]);
           var pMaxATK = pATK / 5;
           var pDEX = parseInt(this.petStats3["DEX"]);
           var pDEF = parseInt(this.petStats3["DEF"]);
           var pMaxVIT = parseInt(this.petStats3["maxVIT"]);
           var pCurVIT = parseInt(this.petStats3["curVIT"]);
           var pColor = this.petStats3["color"];

           //Enemy stats
           var eDEX = parseInt(currentEnemy3["DEX"]);
           var eDEF = parseInt(currentEnemy3["DEF"]);
           var eMaxVIT = parseInt(currentEnemy3["maxVIT"]);
           var eCurVIT = parseInt(currentEnemy3["curVIT"]);
           var eColor = parseInt(currentEnemy3["color"]);

           //Calculate damage
	       var petDMG = Math.ceil((Math.random() * pMaxATK) + pATK); //Return random number between ATK and ATK times 1.2
           var petDMGBonus = petDMG * 1.5; // Add bonus damage based on color. In Future : Add ColorStrength stat to compare the enemy stat to whatever your pet's color is strong against.
           var dmgDealt = petDMGBonus - eDEF; // Reduce damage by enemy's defence.
           // If the enemy has more defence than the amount of damage dealt, damage is set to 0.
           if(dmgDealt < 0){
              dmgDealt = 0; 
           }

           // Reduce enemy health by dmgDealt
           currentEnemy3["curVIT"] = parseInt(currentEnemy3["curVIT"]) - dmgDealt;

           if(currentEnemy3["curVIT"] <= 0){ // If the enemy is at 0 health or less, he died.
               //Kill enemy
               //Remove enemy button
               // Set public variable for button resets
               // Replace sprite with dead sprite
               // Skip the enemy's attack and it's now Phase 3
               currentEnemy3["curVIT"] = 0;
               this.enemyDeadCount++;
             this.battlePhaseFinal(currentEnemy3, targetMove3);
           } else { //If not dead, move on to next phase
             this.battlePhaseFinal(currentEnemy3, targetMove3);
           }

             setTimeout(() => {
           // Check which enemy was targeted, and update their picture and health.
            if(targetMove3 == '1'){
             document.getElementById("evilView1").innerHTML = '<img id="evilBattle1" src="../assets/combat/' + currentEnemy3["sprite"] + '.png" style="width: 70px; height: 70px;" /><div id="eneHP1"><h1>'+ currentEnemy3["curVIT"] + ' / ' + currentEnemy3["maxVIT"] +'</h1></div>';
              
            }else if(targetMove3 == '2'){
             document.getElementById("evilView2").innerHTML = '<img id="evilBattle2" src="../assets/combat/' + currentEnemy3["sprite"] + '.png" style="width: 70px; height: 70px;" /><div id="eneHP2"><h1>'+ currentEnemy3["curVIT"] + ' / ' + currentEnemy3["maxVIT"] +'</h1></div>';

            }else if(targetMove3 == '3'){
             document.getElementById("evilView3").innerHTML = '<img id="evilBattle3" src="../assets/combat/' + currentEnemy3["sprite"] + '.png" style="width: 70px; height: 70px;" /><div id="eneHP3"><h1>'+ currentEnemy3["curVIT"] + ' / ' + currentEnemy3["maxVIT"] +'</h1></div>'; 
            }
          }, 300);
        }
      }
  }

  // Enemy3's turn after Pet3 went. Final turn of the fight before resetting the buttons.
  battlePhaseFinal(currentEnemy3, targetMove3){
   console.log("Final Phase");
    var targetMove1 = '3';
  
        if(this.petStats1 !== "None"){ // Check if we have Pet1 stats or not. If he has pet, determine type of attack.

           //Pet stats
           var pDEX = parseInt(this.petStats3["DEX"]);
           var pDEF = parseInt(this.petStats3["DEF"]);
           var pMaxVIT = parseInt(this.petStats3["maxVIT"]);
           var pCurVIT = parseInt(this.petStats3["curVIT"]);
           var pColor = this.petStats3["color"];

           //Enemy stats
           var eATK = parseInt(currentEnemy3["ATK"]);
           var eMaxATK = eATK / 5;
           var eDEX = parseInt(currentEnemy3["DEX"]);
           var eDEF = parseInt(currentEnemy3["DEF"]);
           var eMaxVIT = parseInt(currentEnemy3["maxVIT"]);
           var eCurVIT = parseInt(currentEnemy3["curVIT"]);
           var eColor = parseInt(currentEnemy3["color"]);

           //Calculate damage
	       var eneDMG = Math.ceil((Math.random() * eMaxATK) + eATK); //Return random number between ATK and ATK times 1.2
           var eneDMGBonus = eneDMG * 1.5; // Add bonus damage based on color. In Future : Add ColorStrength stat to compare the enemy stat to whatever your pet's color is strong against.
           var dmgDealt = eneDMGBonus - pDEF; // Reduce damage by enemy's defence.
           // If the enemy has more defence than the amount of damage dealt, damage is set to 0.
           if(dmgDealt < 0){
              dmgDealt = 0; 
            }

           // Reduce pet health by dmgDealt
           this.petStats3["curVIT"] = parseInt(this.petStats3["curVIT"]) - dmgDealt;

           if(this.petStats3["curVIT"] <= 0){ // If the pet is at 0 health or less, he died.
               //Kill enemy
               //Remove enemy button
               // Set public variable for button resets
               // Replace sprite with dead sprite
               // Phase 3 if he kills anyone but Pet2. If Pet2 dies, skip to Phase 4. Testfor Death at the start of every phase.
               currentEnemy3["curVIT"] = 0;
               this.petDeadCount++;

            this.resetTargets()
           } else { //If not dead, move on to next phase
             this.resetTargets();
           }

             setTimeout(() => {
           // Check which enemy was targeted, and update their picture and health.
            if(targetMove1 == '1'){
             document.getElementById("pokeView1").innerHTML = '<img id="pokeBattle1" src="../assets/combat/' + this.petStats1["sprite"] + '.png" style="width: 70px; height: 70px;" /><div id="petHP1"><h1>'+ this.petStats1["curVIT"] + ' / ' + this.petStats1["maxVIT"] +'</h1></div>';
              
            }else if(targetMove1 == '2'){
             document.getElementById("pokeView2").innerHTML = '<img id="pokeBattle2" src="../assets/combat/' + this.petStats2["sprite"] + '.png" style="width: 70px; height: 70px;" /><div id="petHP2"><h1>'+ this.petStats2["curVIT"] + ' / ' + this.petStats2["maxVIT"] +'</h1></div>';

            }else if(targetMove1 == '3'){
             document.getElementById("pokeView3").innerHTML = '<img id="pokeBattle3" src="../assets/combat/' + this.petStats3["sprite"] + '.png" style="width: 70px; height: 70px;" /><div id="petHP3"><h1>'+ this.petStats3["curVIT"] + ' / ' + this.petStats3["maxVIT"] +'</h1></div>'; 
            }
          }, 300);
        }
  }
}
