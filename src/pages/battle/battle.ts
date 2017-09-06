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

  public petTarget: number = 1;
  public petTurns: any = ["", "", ""];
  public enemyAmount: any;

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
   this.petTurns[0] = "DEF1" + target;
   this.buttonClicked = !this.buttonClicked; // Bring back first pet assist button
   this.buttonClicked2 = !this.buttonClicked2; // Remove 2nd pet assist button since it will be his turn now.
   this.turnBG1 = !this.turnBG1;
   this.turnBG2 = !this.turnBG2;
   this.petTarget++;
   } else if(this.petTarget == 2){
   this.petTurns[1] = "DEF2" + target;
   this.buttonClicked2 = !this.buttonClicked2; // Bring back 2nd pet assist button since it's 3rd pet's turn now
   this.buttonClicked3 = !this.buttonClicked3; // Remove third player button
   this.turnBG2 = !this.turnBG2;
   this.turnBG3 = !this.turnBG3;
   this.petTarget++;
   } else if(this.petTarget == 3){
   this.petTarget++;
   this.petTurns[2] = "DEF3" + target;
   // Now that all actions have been taken, remove all buttons and show FIGHT and RESET buttons.
   this.buttonClicked = !this.buttonClicked;
   this.buttonClicked2 = !this.buttonClicked2; 
   this.showEnemy1 = !this.showEnemy1; 
   this.showEnemy2 = !this.showEnemy2;
   this.showEnemy3 = !this.showEnemy3;
   // Make FIGHT and RESET buttons appear
   this.resetOrder = !this.resetOrder;
   this.startCombat = !this.startCombat;
   // Remove BG
   this.turnBG3 = !this.turnBG3;
   }
  }

  ionViewDidLoad() {
  setTimeout(() => {
  var planet = this.navParams.get('planet');
  var level = this.navParams.get('level');

   this.partySprites();
   this.planetEnemies(planet, level);
   }, 400);  
  }

  // Sets the sprites of your pet party
  partySprites() {
    // Check how many pets the player has and place them on the screen
  this.storage.get('PilotInfo').then((data) => {
  
  var profileInfo = JSON.parse(data); 
 
  if(profileInfo["Pet1"] == "Yes"){
  this.storage.get('PetOneInfo').then((data1) => {
  var petInfo1 = JSON.parse(data1);
  this.turnBG1 = !this.turnBG1;
  document.getElementById("pokeView1").innerHTML = '<img id="pokeBattle1" src="../assets/combat/' + petInfo1["sprite"] + '.png" style="width: 70px; height: 70px;" />';
   });  
  }

  if(profileInfo["Pet2"] == "Yes"){
  this.storage.get('PetTwoInfo').then((data2) => {
  var petInfo2 = JSON.parse(data2);
  this.buttonClicked2 = !this.buttonClicked2; // If they have a 2nd or 3rd Pet, add the ASSIST buttons.
  document.getElementById("pokeView2").innerHTML = '<img id="pokeBattle2" src="../assets/combat/' + petInfo2["sprite"] + '.png" style="width: 70px; height: 70px;" />';
   });   
  }

  if(profileInfo["Pet3"] == "Yes"){
  this.storage.get('PetThreeInfo').then((data3) => {
  var petInfo3 = JSON.parse(data3);
  document.getElementById("pokeView3").innerHTML = '<img id="pokeBattle3" src="../assets/combat/' + petInfo3["sprite"] + '.png" style="width: 70px; height: 70px;" />';
   this.buttonClicked3 = !this.buttonClicked3;
  }); 
  }

   });
  }

  planetEnemies(planet, level){
  // Check what planet it is
  if(planet == "shroom") {
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

   this.enemyAmount = levelInfo["amount"];

   // If there are more than one enemies, get their information.
   var enemyInfo1 = levelInfo["enemy1"];
   var enemyInfo2 = levelInfo["enemy2"];
   var enemyInfo3 = levelInfo["enemy3"];

   if(levelInfo["amount"] == '1') {

   this.showEnemy1 = !this.showEnemy1; // Shows attack button
   document.getElementById("evilView1").innerHTML = '<img id="evilBattle1" src="../assets/combat/' + levelInfo["sprite"] + '.png" style="width: 70px; height: 70px;" />';
 
   } else if(levelInfo["amount"] == '2') {
 
   this.showEnemy1 = !this.showEnemy1;
   this.showEnemy2 = !this.showEnemy2;
    document.getElementById("evilView1").innerHTML = '<img id="evilBattle1" src="../assets/combat/' + enemyInfo1["sprite"] + '.png" style="width: 70px; height: 70px;" />';
    document.getElementById("evilView2").innerHTML = '<img id="evilBattle2" src="../assets/combat/' + enemyInfo2["sprite"] + '.png" style="width: 70px; height: 70px;" />';

   } else if(levelInfo["amount"] == '3') {
   this.showEnemy1 = !this.showEnemy1; 
   this.showEnemy2 = !this.showEnemy2;
   this.showEnemy3 = !this.showEnemy3;
  document.getElementById("evilView1").innerHTML = '<img id="evilBattle1" src="../assets/combat/' + enemyInfo1["sprite"] + '.png" style="width: 70px; height: 70px;" />';
  document.getElementById("evilView2").innerHTML = '<img id="evilBattle2" src="../assets/combat/' + enemyInfo2["sprite"] + '.png" style="width: 70px; height: 70px;" />';
  document.getElementById("evilView3").innerHTML = '<img id="evilBattle3" src="../assets/combat/' + enemyInfo3["sprite"] + '.png" style="width: 70px; height: 70px;" />';
   }
  
   }
  }

  // Choose which pet attacks and save that value to the petTurns array.
  chooseTarget(target){
  // Determine the fight order. Ally pet goes first, then enemy, then ally pet, then enemy, etc.
   if(this.petTarget == 1){
   this.petTurns[0] = "ATK1" + target;
   this.petTarget++;
   this.buttonClicked = !this.buttonClicked; // Bring back first pet assist button
   this.buttonClicked2 = !this.buttonClicked2; // Remove 2nd pet assist button since it will be his turn now.
   this.turnBG1 = !this.turnBG1;
   this.turnBG2 = !this.turnBG2;
   } else if(this.petTarget == 2){
   this.petTurns[1] = "ATK2" + target;
   this.petTarget++;
   this.buttonClicked2 = !this.buttonClicked2; // Bring back 2nd pet assist button since it's 3rd pet's turn now
   this.buttonClicked3 = !this.buttonClicked3; // Remove third player button
   this.turnBG2 = !this.turnBG2;
   this.turnBG3 = !this.turnBG3;
   } else if(this.petTarget == 3){
   this.petTarget++;
   this.petTurns[2] = "ATK3" + target;
   // Now that all actions have been taken, remove all buttons and show FIGHT and RESET buttons.
   this.buttonClicked = !this.buttonClicked;
   this.buttonClicked2 = !this.buttonClicked2; 
   this.showEnemy1 = !this.showEnemy1; 
   this.showEnemy2 = !this.showEnemy2;
   this.showEnemy3 = !this.showEnemy3;
   // Make FIGHT and RESET buttons appear
   this.resetOrder = !this.resetOrder;
   this.startCombat = !this.startCombat;
   // Remove BG
   this.turnBG3 = !this.turnBG3;
   }
  }

  // Reset attack turns and make buttons come back
  resetTargets(){

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
   this.showEnemy1 = !this.showEnemy1;
  } else if(this.enemyAmount == '2'){
   this.showEnemy1 = !this.showEnemy1;
   this.showEnemy2 = !this.showEnemy2;
  } else if(this.enemyAmount == '3'){
   this.showEnemy1 = !this.showEnemy1;
   this.showEnemy2 = !this.showEnemy2;
   this.showEnemy3 = !this.showEnemy3;
  }
   // Make FIGHT and RESET buttons DISAPPEAR
   this.resetOrder = !this.resetOrder;
   this.startCombat = !this.startCombat;
   // Make BG Reappear (only need the first one)
   this.turnBG1 = !this.turnBG1;
  }

  startFight(){
      // Code when the fight starts
  }

}
