import { Component } from '@angular/core';
import { Storage } from '@ionic/storage';
import { HangarPage } from '../hangar/hangar';
import { BattlePage } from '../battle/battle';
import { ExplorePage } from '../explore/explore';
import { IonicPage, NavController, NavParams } from 'ionic-angular';

/**
 * Generated class for the BattletempPage page.
 *
 * See http://ionicframework.com/docs/components/#navigation for more info
 * on Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-battletemp',
  templateUrl: 'battletemp.html',
})
export class BattletempPage {

  constructor(public navCtrl: NavController, public navParams: NavParams, public storage: Storage) {
  }

  public petTarget: number = 1; // Goes up every time a pet completes an action. If petTarget == 1 then Pet1's turn, if 2 then pet2, etc.
  public petTurns: any = ["", "", ""];// Used to determine order of attack and decide which pet attacked which enemy
  public enemyAmount: number = 0;
  public petAmount: number = 1; // Amount of pets the player has, minimum of 1.
  public phaseAmount: number = 0; // Checks how many enemies and pets are alive to determine the amount of phases.
  public enemyStats: any; // Saves enemy stats on page load

  public petStats: any = "None"; // Saves allied pet stats on page load
  public petAlive: any = "No";

  public eneAlive1: any = "No";// Saves if enemy is alive or not. Will be set to yes on page load
  public eneAlive2: any = "No";
  public eneAlive3: any = "No";

  public expPet: boolean = false; // Shows ally pets on the victory screen

  public enemyDeadCount: number = 0;
  public petDeadCount: number = 0;

  public victoryScreen: boolean = false; //Victory screen for experience
  public defeatScreen: boolean = false; //defeat screen for experience

  public buttonClicked: boolean = false; //ASSIST button 1

  public showEnemy1: boolean = false; //ATTACK button 1
  public showEnemy2: boolean = false; 
  public showEnemy3: boolean = false; 

  public resetOrder: boolean = false; //Resets all the previously chosen targets
  public startCombat: boolean = false; //Start combat button

  public turnBG1: boolean = false; //Set the BG behind whose turn it is

public onButtonClick(target) {
   this.petTurns[0] = "DEF" + target;
   this.disableButtons(); // After Pet3 select it's move, always END move selection.
}

  disableButtons(){
   // Now that all actions have been taken, remove all buttons and show FIGHT and RESET buttons.
   this.buttonClicked = false;
   this.showEnemy1 = false; 
   this.showEnemy2 = false;
   this.showEnemy3 = false;
   // Make FIGHT and RESET buttons appear
   this.resetOrder = true;
   this.startCombat = true;
   // Remove BG
   this.turnBG1 = false;
  }

  ionViewDidLoad() {
  setTimeout(() => {
  var planet = this.navParams.get('planet');
  var level = this.navParams.get('level');
  this.petStats = this.navParams.get('petInfo');
  this.petTarget = parseInt(this.navParams.get('targetNum'));

  var planetImage = document.getElementById("battlefield");
  planetImage.style.background = 'url("/assets/planets/' + planet + '.png")' + 'no-repeat';
  planetImage.style.backgroundSize = 'cover';
  //planetImage.setAttribute("style","position:absolute; top: 33%; width:100%");

   this.partySprites();
   this.planetEnemies(planet, level);
   }, 80);  
  }

  // Animate test
  /*
  num = Which Pet or Enemy is animating. Will return 1,2 or 3.
  who = Who is attacking. Values are Pet and Evil
  moveType = ATK, DEF and abilities in the future. Different animations and targets for all.
  target = Target of the animation. Depends on moveType.
  damage = Damage number displayed on screen
  special = 'dead' or 'none' for now. Will be used for abilities later on.
  */
  regularAttack(num, who, moveType, target, damage, special){
  setTimeout(() => {
  var fieldNum = "Field" + num; // Will be used to get the elementId (pokeField1,2,3 or evilField1,2.3)
  var fieldTarget = "Field" + target; 
  var pokeMove;
  var targetMove;
  var txtMove;

  // Used to adjust brightness.
  var blink = 1;

  // Move a target back upon getting hit
  var atkBack = -3;

  var pos = 0;
  var move = 0;
  var text = 2;

  var initialPosition;
  var initialText;
  
  if(num == 1){
  initialPosition = 21;
  initialText = 55; 
  }else if(num == 2){
  initialPosition = 7;
  initialText = 75;
  }else if(num == 3){
  initialPosition = 10;
  initialText = 30;
  }

  var targetInitial;
  
  if(target == 1){
  targetInitial= 21;
  initialText = 55; 
  }else if(target == 2){
  targetInitial = 7;
  initialText = 75; 
  }else if(target == 3){
  targetInitial = 10;
  initialText = 30; 
  }

  if(who == 'evil'){
  pokeMove = document.getElementById('evil' + fieldNum);
   if(moveType == 'ATK'){ // If ATK, then target is a friendly pet
  targetMove = document.getElementById('poke' + fieldTarget); 
  txtMove = document.getElementById('dmgPet' + target); 
  txtMove.style.top = initialText + '%';
  txtMove.innerText = damage;
  txtMove.style.opacity = 1;
   }else if(moveType == 'DEF'){ // If DEF then target is an ally.
  targetMove = document.getElementById('evil' + fieldTarget);  
  txtMove = document.getElementById('dmgEvil' + target);
  txtMove.style.top = initialText + '%';
  txtMove.innerText = damage;
  txtMove.color = '#00FF00';
  txtMove.style.opacity = 1;
   }
  var moveTimer = setInterval(animateThisEnemy, 6); //5 For Auto x2 version, 7 for regular.
  } else if(who == 'poke'){
  pokeMove = document.getElementById("poke" + fieldNum);
   if(moveType == 'ATK'){ // If ATK, then target is an enemy
  targetMove = document.getElementById('evil' + fieldTarget); 
  txtMove = document.getElementById('dmgEvil' + target);
  txtMove.style.top = initialText + '%';
  txtMove.innerText = damage;
  txtMove.style.opacity = 1;
   }else if(moveType == 'DEF'){ // If DEF then target is an ally.
  targetMove = document.getElementById('poke' + fieldTarget);  
  txtMove = document.getElementById('dmgPet' + target);
  txtMove.style.top = initialText + '%';
  txtMove.innerText = damage;
  txtMove.color = '#00FF00';
  txtMove.style.opacity = 1;
   }
  var moveTimer = setInterval(animateThisAlly, 6); //5 For Auto x2 version, 7 for regular. 
  }

  function animateThisAlly(){
  
    var currentPosition = initialPosition - move; // Get the current position

    if (pos == 40) {
      clearInterval(moveTimer); // Stop the timer to end the animation
    } else if(pos <= 6) {
      pokeMove.style.left = currentPosition + '%'; //Move back 6%;
      move++;
      pos++; 
    } else if(pos > 6 && pos < 30){
      pokeMove.style.left = currentPosition + '%'; //Move forward 22%
      move--;
      pos++; 
      txtMove.style.top = initialText - text + '%';
      text = text + 0.7;
      if(pos >=10 && pos < 20){ // Animate the target of the attack
        if(moveType == 'ATK'){ // If it's an attack, target is an enemy'
        targetMove.style.right = (targetInitial - atkBack) + '%';
        targetMove.style.filter = 'brightness(' + blink + ')';
        atkBack++;
        blink = blink + 2;
        }else if (moveType == 'DEF'){ // If it's DEF, target is an ally
        targetMove.style.filter = 'brightness(' + blink + ')';
        blink = blink + 2;
        }
      }
    } else if(pos >= 30){
      pokeMove.style.left = currentPosition + '%'; //Move back to starting point
      if(atkBack > 1){ // Set ATK target back to regular position
      targetMove.style.right = (targetInitial - atkBack) + '%';
      atkBack--;
      }
      if(blink > 1){
       targetMove.style.filter = 'brightness(1)'; // Set brightness back to normal. 
       txtMove.style.opacity = 0; // Make text disapear
       txtMove.innerText = '';
      }
      if(special == 'dead'){
       targetMove.style.opacity = 0;
      }
      move++;
        if(currentPosition == initialPosition){
        // If he's back to where he started
        pos = 40;
        }
    }
    }

  function animateThisEnemy(){
  
    var currentPosition = initialPosition - move; // Get the current position

    if (pos == 40) {
      clearInterval(moveTimer); // Stop the timer to end the animation
    } else if(pos <= 6) {
      pokeMove.style.right = currentPosition + '%'; //Move back 6%;
      move++;
      pos++; 
    } else if(pos > 6 && pos < 28){
      pokeMove.style.right = currentPosition + '%'; //Move forward 22%
      move--;
      pos++;
      txtMove.style.top = initialText - text + '%';
      text = text + 0.7;
      if(pos >=10 && pos < 20){ // Animate the target of the attack
        if(moveType == 'ATK'){ // If it's an attack, target is an enemy'
        targetMove.style.left = (targetInitial - atkBack) + '%';
        targetMove.style.filter = 'brightness(' + blink + ')';
        atkBack++;
        blink = blink + 2;
        }else if (moveType == 'DEF'){ // If it's DEF, target is an ally
        targetMove.style.filter = 'brightness(' + blink + ')';
        blink = blink + 2;
        }
      }
    } else if(pos >= 28){
      pokeMove.style.right = currentPosition + '%'; //Move back to starting point
      if(atkBack > 1){ // Set ATK target back to regular position
      targetMove.style.left = (targetInitial - atkBack) + '%';
      atkBack--;
      }
      if(blink > 1){
       targetMove.style.filter = 'brightness(1)'; // Set brightness back to normal.  
       txtMove.style.opacity = 0; // Make text disapear
       txtMove.innerText = '';
      }
      if(special == 'dead'){
       targetMove.style.opacity = 0;
      }
      move++;
        if(currentPosition == initialPosition){
        // If he's back to where he started
        pos = 40;
        }
    }
    }
    if(who == "evil"){ //Animate if enemy, else animate ally
    animateThisEnemy();
    } else if(who == "poke"){
    animateThisAlly();
    }
   }, 100);
  }

  nextMission(){
  var planets = this.navParams.get('planet');
  var levels = parseInt(this.navParams.get('level')) + 1;
  this.navCtrl.push(BattlePage, {planet: planets, level: levels});  
  }

  repeatMission(){
  var planets = this.navParams.get('planet');
  var levels = this.navParams.get('level');
  this.navCtrl.push(BattlePage, {planet: planets, level: levels});
  }

  // Send them to the regular page since this is a temp page
  backToExplore(){
  this.navCtrl.pop();
  }

  // Sets the sprites of your pet party
  partySprites() {
 
  if(this.petTarget == 1){
  this.storage.get('PetOneInfo').then((data1) => {
  this.petStats = JSON.parse(data1); // Set Pet stats as public variable
  });  
  }

  if(this.petTarget == 2){
  this.storage.get('PetTwoInfo').then((data2) => {
  this.petStats = JSON.parse(data2);
   });   
  }

  if(this.petTarget == 3){
  this.storage.get('PetThreeInfo').then((data3) => {
  this.petStats = JSON.parse(data3); 
  }); 
  }

  setTimeout(() => {
  this.turnBG1 = true;
  this.petAlive = 'Yes';
  document.getElementById("pokeView1").innerHTML = '<img id="pokeBattle1" src="../assets/combat/' + this.petStats["sprite"] + '.png" style="width: 70px; height: 70px;" /><div id="petHP1"><h1>'+ this.petStats["curVIT"] + ' / ' + this.petStats["maxVIT"] +'</h1></div>';
  document.getElementById("bfPet1").innerHTML = '<img id="pokeField1" src="../assets/hangar/' + this.petStats["sprite"] + '.png" style="width: 70px; height: 70px;" />';
  }, 100);
 }

  planetEnemies(planet, level){
  // Check what planet it is
  if(planet == "dex" || planet == "atk" || planet == "def" || planet == "vit") {
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
                   enemy1 : { 'name': "POLIWHIRL", 'sprite': "4", 'LVL': "1", 'curVIT': "15", 'maxVIT': "15", 'ATK': "8", 'DEF': "5", 'DEX': "3", 'FTH': "1", 'color': "red", 'PROF': "none", 'AB1': "", 'AB2': "", 'AB3': "", 'L1': "", 'L2': "", 'L3': "", 'L4': "", 'L5': ""},
                   enemy2 : { 'name': "UMBREON", 'sprite': "6", 'LVL': "1", 'curVIT': "15", 'maxVIT': "15", 'ATK': "8", 'DEF': "3", 'DEX': "3", 'FTH': "1", 'color': "red", 'PROF': "none", 'AB1': "", 'AB2': "", 'AB3': "", 'L1': "", 'L2': "", 'L3': "", 'L4': "", 'L5': ""},
                   enemy3 : { 'name': "MUDKIPS", 'sprite': "3", 'LVL': "1", 'curVIT': "15", 'maxVIT': "15", 'ATK': "8", 'DEF': "6", 'DEX': "3", 'FTH': "1", 'color': "red", 'PROF': "none", 'AB1': "", 'AB2': "", 'AB3': "", 'L1': "", 'L2': "", 'L3': "", 'L4': "", 'L5': ""}
                      };

   // Make array with all enemies, then use level & array to determine which enemy
   //var allEnemiesSTR = {evil1: JSON.stringify(enemy1), evil2: JSON.stringify(enemy2), evil3: JSON.stringify(enemy3), evil4: JSON.stringify(enemy4), evil5: JSON.stringify(enemy5), evil6: JSON.stringify(enemy6), evil7: JSON.stringify(enemy7), evil8: JSON.stringify(enemy8), evil9: JSON.stringify(enemy9), evil10: JSON.stringify(enemy10)};
   var allEnemies = {evil1: level1, evil2: level2, evil3: level3, evil4: level4, evil5: level5, evil6: level6, evil7: level7, evil8: level8, evil9: level9, evil10: level10 };
   
   // Get which level it is, and the amount of enemies in that level
   var levelInfo = allEnemies["evil" + level];

   this.enemyStats = levelInfo;
   this.enemyAmount = parseInt(levelInfo["amount"]);

   // If there are more than one enemies, get their information.
   var enemyInfo1 = levelInfo["enemy1"];
   var enemyInfo2 = levelInfo["enemy2"];
   var enemyInfo3 = levelInfo["enemy3"];

   if(levelInfo["amount"] == '1') {
   this.eneAlive1 = "Yes";
   this.showEnemy1 = true; // Shows attack button
   document.getElementById("evilView1").innerHTML = '<img id="evilBattle1" src="../assets/combat/' + levelInfo["sprite"] + '.png" style="width: 70px; height: 70px;" /><div id="eneHP1"><h1>'+ levelInfo["curVIT"] + ' / ' + levelInfo["maxVIT"] +'</h1></div>';
    // Battlefield pics underneath
   document.getElementById("bfEvil1").innerHTML = '<img id="evilField1" src="../assets/hangar/' + levelInfo["sprite"] + '.png" style="width: 70px; height: 70px;" />';
   } else if(levelInfo["amount"] == '2') {
   this.eneAlive1 = "Yes";
   this.eneAlive2 = "Yes";
   this.showEnemy1 = true;
   this.showEnemy2 = true;
  document.getElementById("evilView1").innerHTML = '<img id="evilBattle1" src="../assets/combat/' + enemyInfo1["sprite"] + '.png" style="width: 70px; height: 70px;" /><div id="eneHP1"><h1>'+ enemyInfo1["curVIT"] + ' / ' + enemyInfo1["maxVIT"] +'</h1></div>';
  document.getElementById("evilView2").innerHTML = '<img id="evilBattle2" src="../assets/combat/' + enemyInfo2["sprite"] + '.png" style="width: 70px; height: 70px;" /><div id="eneHP2"><h1>'+ enemyInfo2["curVIT"] + ' / ' + enemyInfo2["maxVIT"] +'</h1></div>';

  document.getElementById("bfEvil1").innerHTML = '<img id="evilField1" src="../assets/hangar/' + enemyInfo1["sprite"] + '.png" style="width: 70px; height: 70px;" />';
  document.getElementById("bfEvil2").innerHTML = '<img id="evilField2" src="../assets/hangar/' + enemyInfo2["sprite"] + '.png" style="width: 70px; height: 70px;" />';
   } else if(levelInfo["amount"] == '3') {
   this.eneAlive1 = "Yes";
   this.eneAlive2 = "Yes";
   this.eneAlive3 = "Yes";
   this.showEnemy1 = true; 
   this.showEnemy2 = true;
   this.showEnemy3 = true;
   // Pictures for the bottom of the screen, where Button selection/ Move selection phase 
  document.getElementById("evilView1").innerHTML = '<img id="evilBattle1" src="../assets/combat/' + enemyInfo1["sprite"] + '.png" style="width: 70px; height: 70px;" /><div id="eneHP1"><h1>'+ enemyInfo1["curVIT"] + ' / ' + enemyInfo1["maxVIT"] +'</h1></div>';
  document.getElementById("evilView2").innerHTML = '<img id="evilBattle2" src="../assets/combat/' + enemyInfo2["sprite"] + '.png" style="width: 70px; height: 70px;" /><div id="eneHP2"><h1>'+ enemyInfo2["curVIT"] + ' / ' + enemyInfo2["maxVIT"] +'</h1></div>';
  document.getElementById("evilView3").innerHTML = '<img id="evilBattle3" src="../assets/combat/' + enemyInfo3["sprite"] + '.png" style="width: 70px; height: 70px;" /><div id="eneHP3"><h1>'+ enemyInfo3["curVIT"] + ' / ' + enemyInfo3["maxVIT"] +'</h1></div>';
  // Pictures of the enemies on the battlefield
  document.getElementById("bfEvil1").innerHTML = '<img id="evilField1" src="../assets/hangar/' + enemyInfo1["sprite"] + '.png" style="width: 70px; height: 70px;" />';
  document.getElementById("bfEvil2").innerHTML = '<img id="evilField2" src="../assets/hangar/' + enemyInfo2["sprite"] + '.png" style="width: 70px; height: 70px;" />';
  document.getElementById("bfEvil3").innerHTML = '<img id="evilField3" src="../assets/hangar/' + enemyInfo3["sprite"] + '.png" style="width: 70px; height: 70px;" />';
   }
  
   }
  }

  // Choose which pet attacks and save that value to the petTurns array.
  chooseTarget(target){
  // Adds the targeting lines
  var lineIMG = document.getElementById('bLine1') as HTMLImageElement;
  lineIMG.src = '../assets/combat/atk1' + target + '.png';
  // Determine the fight order. Ally pet goes first, then enemy, then ally pet, then enemy, etc.
   this.petTurns[0] = "ATK" + target;
   this.disableButtons(); // After Pet3 select it's move, always END move selection.
}

  // Reset attack turns and make buttons come back
 resetTargets(){
   // Reset combat lines
   var lineIMG1 = document.getElementById('bLine1') as HTMLImageElement;
   lineIMG1.src = '../assets/combat/linenone.png';
  // Do something if all enemies are dead
  if(this.enemyAmount == this.enemyDeadCount){
  this.victoryScreen = true; // Make EXP screen appear
  var blurField = document.getElementById('battlefield');
  var blurMain = document.getElementById('battlediv');
  blurField.style.filter = 'blur(3px)';
  blurMain.style.filter = 'blur(3px)';
  // Give stats to pets
  var planet = this.navParams.get('planet');
  var level = this.navParams.get('level');
  var atk = parseInt(this.petStats["ATK"]);
  if(planet == 'dex'){
  this.petStats["SPD"] = parseInt(this.petStats["SPD"]) + (0.1 * level);
  }else if(planet == 'atk'){
  this.petStats["ATK"] = atk + (0.1 * level);
  }else if(planet == 'def'){
  this.petStats["DEF"] = parseInt(this.petStats["DEF"]) + (0.1 * level); 
  }else if(planet == 'vit'){
  this.petStats["VIT"] = parseInt(this.petStats["VIT"]) + (0.1 * level);
  }
  // SAVE stats
  setTimeout(() => {
  if(this.petTarget == 1){
  this.storage.set('PetOneInfo', JSON.stringify(this.petStats));
  console.log("Stats saved : " + this.petStats["ATK"]);
  }else if(this.petTarget == 2){
  this.storage.set('PetTwoInfo', JSON.stringify(this.petStats));
  }else if(this.petTarget == 3){
  this.storage.set('PetThreeInfo', JSON.stringify(this.petStats));  
    }
   }, 200);
  } else if (this.petAmount == this.petDeadCount) { // Do something if all pets are dead
  console.log("You lose!");
   this.navCtrl.pop();
  } else {
  this.petTurns = ["", "", ""];
  //Turns off all buttons except ATK buttons.
   this.turnBG1 = false; // BG
   this.buttonClicked = false; // ASSIST
   // Make FIGHT and RESET buttons DISAPPEAR
   this.resetOrder =  false;
   this.startCombat = false;
  //Check which enemies are dead. Only give ATK buttons to the alive ones.
  if(this.eneAlive1 !== "No"){
  this.showEnemy1 = true;
  }

  if(this.eneAlive2 !== "No"){
  this.showEnemy2 = true;  
  }

  if(this.eneAlive3 !== "No"){
  this.showEnemy3 = true; 
  }

  if(this.petAlive !== "No"){ // If Pet1 is not dead (if he's alive)
  this.turnBG1 = true;
  }
 }
}

 //Randomly chooses target for enemies and AIs
 enemyAI(currentEnemy){
 // 80% chance to ATK, 20% chance to def.
 var moveChance = Math.round(Math.random() * 100) + 1;
 var target = 1; // Which pet he's targeting; 1, 2 or 3

 if(moveChance <= 100){ // 80% chance to ATK. Set to 100 for now, since DEF isn't implemented yet.
 var moveType = 'ATK';
 } else {
 var moveType = 'DEF'; //20% Chance.
 }

 return target; //Return the number of the pet targeted.
}

startFight(){
     // Make FIGHT and RESET buttons DISAPPEAR
     this.resetOrder =  false;
     this.startCombat = false;
     // This is always Phase 1 of the fight. Necessary variables will be moved along to other phases.
     if(this.petAlive !== "No"){ // Check if we have Pet1 is alive or not.
      var movePet = this.petTurns[0].substring(0, 3); //First pet's move. Returns 3 letters; either DEF or ATK to determine the type of move.
      var targetMove = this.petTurns[0].substring(3); // Who the pet is tagetting with it's move. Removes first 3 letters to return a value 1, 2 or 3

      setTimeout(() => {
      // Remove combat lines before moving to the next phase
      var lineIMG = document.getElementById('bLine1') as HTMLImageElement;
      lineIMG.src = '../assets/combat/linenone.png';
      }, 150);

      if(movePet == 'ATK'){
      // If more than 1 enemy, change the value of currentEnemy (It's a different array/object structure)
      if(this.enemyAmount > 1){
      var currentEnemy = this.enemyStats["enemy" + targetMove]; // Get the stats and info of the target. Only accessed if movePet is ATK.      
      } else {
      var currentEnemy = this.enemyStats;
      }

      var weakColor; // What color the target is weak to

      //Get color weakness. Red > Green > Blue > Red. Else if Purple or Gold, ignore.
      if(currentEnemy["color"] == "red"){
      weakColor = 'blue';
      } else if(currentEnemy["color"] == "green"){
      weakColor = 'red';
      } else if(currentEnemy["color"] == "blue"){
      weakColor = 'green';
      } else { // If purple or gold
      weakColor = 'none';
      }
      }

        if(movePet == "DEF"){
            //Do something if he's assisting an ally
             this.regularAttack(1, 'poke', 'DEF', targetMove, 0, 'none');
                // If greater than 1, there are still enemies alive. Start next phase.
                setTimeout(() => {
                this.enemyPhase1();
              }, 1500);             
        } else if(movePet == "ATK"){ // Do something if he's attacking an enemy'
           //Pet stats
           var pATK = parseInt(this.petStats["ATK"]);
           var pMaxATK = pATK / 5;
           var pDEX = parseInt(this.petStats["DEX"]);
           var pDEF = parseInt(this.petStats["DEF"]);
           var pMaxVIT = parseInt(this.petStats["maxVIT"]);
           var pCurVIT = parseInt(this.petStats["curVIT"]);
           var pColor = this.petStats["color"];

           //Enemy stats
           var eDEX = parseInt(currentEnemy["DEX"]);
           var eDEF = parseInt(currentEnemy["DEF"]);
           var eMaxVIT = parseInt(currentEnemy["maxVIT"]);
           var eCurVIT = parseInt(currentEnemy["curVIT"]);
           var eColor = parseInt(currentEnemy["color"]);

           //Calculate damage
	       var petDMG = Math.ceil((Math.random() * pMaxATK) + pATK); //Return random number between ATK and ATK times 1.2
           if(pColor == weakColor){ // If target has a color disadvantage, deal bonus damage.
           var petDMGBonus = petDMG * 1.5;  
           var dmgDealt = Math.ceil(petDMGBonus - eDEF); 
           } else {
           var dmgDealt = Math.ceil(petDMG - eDEF); // Reduce damage by enemy's defence.
           // If the enemy has more defence than the amount of damage dealt, damage is set to 0.
           }
           if(dmgDealt < 0){
              dmgDealt = 0; 
           }

           // Reduce enemy health by dmgDealt
           currentEnemy["curVIT"] = parseInt(currentEnemy["curVIT"]) - dmgDealt;

           if(currentEnemy["curVIT"] <= 0){ // If the enemy is at 0 health or less, he died.
             // Skip the enemy's attack and it's now Pet2's turn, if he's alive
             currentEnemy["curVIT"] = 0;
             this.enemyDeadCount++;
             if(targetMove == 1){
             this.eneAlive1 = "No";              
             }else if(targetMove == 2){
             this.eneAlive2 = "No";              
             }else if(targetMove == 3){
             this.eneAlive3 = "No";          
             }
             this.regularAttack(1, 'poke', movePet, targetMove, dmgDealt, 'dead'); 
           } else {
           // Animate attacking the target. Pet/Enemy number (1,2,3), 'poke' or 'evil', 'ATK' or 'DEF', target number (1,2,3), special (dead, none, abilities, etc.)
           this.regularAttack(1, 'poke', movePet, targetMove, dmgDealt, 'none'); 
           }

             // If greater than 1, there are still enemies alive. Start next phase.
             setTimeout(() => {
             this.enemyPhase1(); // Send to next phase whether dead or alive. Next phase will skip if necessary.
              }, 1200);             

           setTimeout(() => {
           // Check which enemy was targeted, and update their picture and health.
           if(currentEnemy["curVIT"] == 0){
            document.getElementById("evilView" + targetMove).innerHTML = '<img id="evilBattle'+ targetMove +'" src="../assets/combat/' + currentEnemy["sprite"] + '.png" style="width: 70px; height: 70px; filter: grayscale(100%);" /><div id="eneHP' + targetMove + '"><h1>'+ currentEnemy["curVIT"] + ' / ' + currentEnemy["maxVIT"] +'</h1></div>';
            } else {
            document.getElementById("evilView" + targetMove).innerHTML = '<img id="evilBattle'+ targetMove +'" src="../assets/combat/' + currentEnemy["sprite"] + '.png" style="width: 70px; height: 70px;" /><div id="eneHP' + targetMove + '"><h1>'+ currentEnemy["curVIT"] + ' / ' + currentEnemy["maxVIT"] +'</h1></div>'; 
            }
          }, 150);
        }
      } else {
      // If Pet1 is dead, skip to Pet2's turn.
      this.resetTargets();
      }
}

  // Enemy1's turn after Pet1 went.
 enemyPhase1(){
      if(this.eneAlive1 !== "No"){ // Check if we have Pet1 is alive or not.
      // If more than 1 enemy, change the value of currentEnemy
      if(this.enemyAmount > 1){
      var currentEnemy = this.enemyStats["enemy1"]; // Get the stats and info of the target. Only accessed if movePet is ATK.      
      } else {
      var currentEnemy = this.enemyStats;
      }

      var weakColor; // What color the target is weak to

      //Set AI
      var targetMove = this.enemyAI(currentEnemy);
      var currentPet = this.petStats;      

      //Get color weakness. Red > Green > Blue > Red. Else if Purple or Gold, ignore.
      if(currentEnemy["color"] == "red"){
      weakColor = 'blue';
      } else if(currentEnemy["color"] == "green"){
      weakColor = 'red';
      } else if(currentEnemy["color"] == "blue"){
      weakColor = 'green';
      } else { // If purple or gold
      weakColor = 'none';
      }

           //Pet stats
           var pDEX = parseInt(currentPet["DEX"]);
           var pDEF = parseInt(currentPet["DEF"]);
           var pMaxVIT = parseInt(currentPet["maxVIT"]);
           var pCurVIT = parseInt(currentPet["curVIT"]);
           var pColor = currentPet["color"];

           //Enemy stats
           var eATK = parseInt(currentEnemy["ATK"]);
           var eMaxATK = eATK / 5;
           var eDEX = parseInt(currentEnemy["DEX"]);
           var eDEF = parseInt(currentEnemy["DEF"]);
           var eMaxVIT = parseInt(currentEnemy["maxVIT"]);
           var eCurVIT = parseInt(currentEnemy["curVIT"]);
           var eColor = parseInt(currentEnemy["color"]);

           //Calculate damage
	       var eneDMG = Math.ceil((Math.random() * eMaxATK) + eATK); //Return random number between ATK and ATK times 1.2
           if(eColor == weakColor){ // If target has a color disadvantage, deal bonus damage.
           var eneDMGBonus = eneDMG * 1.5;  
           var dmgDealt = Math.ceil(eneDMGBonus - pDEF); 
           } else {
           var dmgDealt = Math.ceil(eneDMG - pDEF); // Reduce damage by target's defence.
           // If the enemy has more defence than the amount of damage dealt, damage is set to 0.
           }
           if(dmgDealt < 0){
              dmgDealt = 0; 
           }

           // Reduce enemy health by dmgDealt
           currentPet["curVIT"] = parseInt(currentPet["curVIT"]) - dmgDealt;

           if(currentPet["curVIT"] <= 0){ // If the enemy is at 0 health or less, he died.
             // Skip the enemy's attack and it's now Pet2's turn, if he's alive
             currentPet["curVIT"] = 0;
             this.petDeadCount = 1;
             this.petAlive = "No";                 
             this.regularAttack(1, 'evil', 'ATK', targetMove, dmgDealt, 'dead'); 
           } else {
             this.regularAttack(1, 'evil', 'ATK', targetMove, dmgDealt, 'none'); 
           }
             setTimeout(() => {
             this.enemyPhase2(); // Send to next phase whether dead or alive. Next phase will skip if necessary.
              }, 1300);             

             setTimeout(() => {
           // Check which enemy was targeted, and update their picture and health.
           if(currentPet["curVIT"] == 0){
            document.getElementById("pokeView" + targetMove).innerHTML = '<img id="pokeBattle'+ targetMove +'" src="../assets/combat/' + currentPet["sprite"] + '.png" style="width: 70px; height: 70px; filter: grayscale(100%);" /><div id="petHP' + targetMove + '"><h1>'+ currentPet["curVIT"] + ' / ' + currentPet["maxVIT"] +'</h1></div>';
            } else {
            document.getElementById("pokeView" + targetMove).innerHTML = '<img id="pokeBattle'+ targetMove +'" src="../assets/combat/' + currentPet["sprite"] + '.png" style="width: 70px; height: 70px;" /><div id="petHP' + targetMove +'"><h1>'+ currentPet["curVIT"] + ' / ' + currentPet["maxVIT"] +'</h1></div>';
            }
           }, 150);
      } else {
      // If enemy1 is dead, skip to enemy2's turn.
      this.enemyPhase2();
      }
 }

  // Enemy2's turn after Pet2 went.
  enemyPhase2(){
      if(this.eneAlive2 !== "No"){ // Check if we have Pet1 is alive or not.

      // If more than 1 enemy, change the value of currentEnemy
      if(this.enemyAmount > 1){
      var currentEnemy = this.enemyStats["enemy2"]; // Get the stats and info of the target. Only accessed if movePet is ATK.      
      } else {
      var currentEnemy = this.enemyStats;
      }

      var weakColor; // What color the target is weak to

      //Set AI
      var targetMove = this.enemyAI(currentEnemy);
      var currentPet = this.petStats;  

      //Get color weakness. Red > Green > Blue > Red. Else if Purple or Gold, ignore.
      if(currentEnemy["color"] == "red"){
      weakColor = 'blue';
      } else if(currentEnemy["color"] == "green"){
      weakColor = 'red';
      } else if(currentEnemy["color"] == "blue"){
      weakColor = 'green';
      } else { // If purple or gold
      weakColor = 'none';
      }

           //Pet stats
           var pDEX = parseInt(currentPet["DEX"]);
           var pDEF = parseInt(currentPet["DEF"]);
           var pMaxVIT = parseInt(currentPet["maxVIT"]);
           var pCurVIT = parseInt(currentPet["curVIT"]);
           var pColor = currentPet["color"];

           //Enemy stats
           var eATK = parseInt(currentEnemy["ATK"]);
           var eMaxATK = eATK / 5;
           var eDEX = parseInt(currentEnemy["DEX"]);
           var eDEF = parseInt(currentEnemy["DEF"]);
           var eMaxVIT = parseInt(currentEnemy["maxVIT"]);
           var eCurVIT = parseInt(currentEnemy["curVIT"]);
           var eColor = parseInt(currentEnemy["color"]);

           //Calculate damage
	       var eneDMG = Math.ceil((Math.random() * eMaxATK) + eATK); //Return random number between ATK and ATK times 1.2
           if(eColor == weakColor){ // If target has a color disadvantage, deal bonus damage.
           var eneDMGBonus = eneDMG * 1.5;  
           var dmgDealt = Math.ceil(eneDMGBonus - pDEF); 
           } else {
           var dmgDealt = Math.ceil(eneDMG - pDEF); // Reduce damage by target's defence.
           // If the enemy has more defence than the amount of damage dealt, damage is set to 0.
           }
           if(dmgDealt < 0){
              dmgDealt = 0; 
           }

           // Reduce enemy health by dmgDealt
           currentPet["curVIT"] = parseInt(currentPet["curVIT"]) - dmgDealt;

           if(currentPet["curVIT"] <= 0){ // If the enemy is at 0 health or less, he died.
             // Skip the enemy's attack and it's now Pet2's turn, if he's alive
             currentPet["curVIT"] = 0;
             this.petDeadCount = 1;
             this.petAlive = "No";         
            // Animate attacking the target. Pet/Enemy number (1,2,3), 'poke' or 'evil', 'ATK' or 'DEF', target number (1,2,3)
            this.regularAttack(2, 'evil', 'ATK', targetMove, dmgDealt, 'dead'); 
           } else {
            this.regularAttack(2, 'evil', 'ATK', targetMove, dmgDealt, 'none'); 
           }
             setTimeout(() => {
             this.enemyPhase3(); // Send to next phase whether dead or alive. Next phase will skip if necessary.
              }, 1300);             

             setTimeout(() => {
           // Check which enemy was targeted, and update their picture and health.
           if(currentPet["curVIT"] == 0){
            document.getElementById("pokeView" + targetMove).innerHTML = '<img id="pokeBattle'+ targetMove +'" src="../assets/combat/' + currentPet["sprite"] + '.png" style="width: 70px; height: 70px; filter: grayscale(100%);" /><div id="petHP' + targetMove + '"><h1>'+ currentPet["curVIT"] + ' / ' + currentPet["maxVIT"] +'</h1></div>';
            } else {
            document.getElementById("pokeView" + targetMove).innerHTML = '<img id="pokeBattle'+ targetMove +'" src="../assets/combat/' + currentPet["sprite"] + '.png" style="width: 70px; height: 70px;" /><div id="petHP' + targetMove +'"><h1>'+ currentPet["curVIT"] + ' / ' + currentPet["maxVIT"] +'</h1></div>';
             }
           }, 150);
      } else {
      // If enemy2 is dead, skip to enemy3's turn.
      this.enemyPhase3();
      }
  }

  // Enemy3's turn after Pet3 went. Final turn of the fight before resetting the buttons.
  enemyPhase3(){
      if(this.eneAlive3 !== "No"){ // Check if we have Enemy3 is alive or not.

      // If more than 1 enemy, change the value of currentEnemy
      if(this.enemyAmount > 1){
      var currentEnemy = this.enemyStats["enemy3"]; // Get the stats and info of the target. Only accessed if movePet is ATK.      
      } else {
      var currentEnemy = this.enemyStats;
      }

      //Set AI
      var targetMove = this.enemyAI(currentEnemy);
      var currentPet = this.petStats;  

      var weakColor; // What color the target is weak to

      //Get color weakness. Red > Green > Blue > Red. Else if Purple or Gold, ignore.
      if(currentEnemy["color"] == "red"){
      weakColor = 'blue';
      } else if(currentEnemy["color"] == "green"){
      weakColor = 'red';
      } else if(currentEnemy["color"] == "blue"){
      weakColor = 'green';
      } else { // If purple or gold
      weakColor = 'none';
      }

           //Pet stats
           var pDEX = parseInt(currentPet["DEX"]);
           var pDEF = parseInt(currentPet["DEF"]);
           var pMaxVIT = parseInt(currentPet["maxVIT"]);
           var pCurVIT = parseInt(currentPet["curVIT"]);
           var pColor = currentPet["color"];

           //Enemy stats
           var eATK = parseInt(currentEnemy["ATK"]);
           var eMaxATK = eATK / 5;
           var eDEX = parseInt(currentEnemy["DEX"]);
           var eDEF = parseInt(currentEnemy["DEF"]);
           var eMaxVIT = parseInt(currentEnemy["maxVIT"]);
           var eCurVIT = parseInt(currentEnemy["curVIT"]);
           var eColor = parseInt(currentEnemy["color"]);

           //Calculate damage
	       var eneDMG = Math.ceil((Math.random() * eMaxATK) + eATK); //Return random number between ATK and ATK times 1.2
           if(eColor == weakColor){ // If target has a color disadvantage, deal bonus damage.
           var eneDMGBonus = eneDMG * 1.5;  
           var dmgDealt = Math.ceil(eneDMGBonus - pDEF); 
           } else {
           var dmgDealt = Math.ceil(eneDMG - pDEF); // Reduce damage by target's defence.
           // If the enemy has more defence than the amount of damage dealt, damage is set to 0.
           }
           if(dmgDealt < 0){
              dmgDealt = 0; 
           }

           // Reduce enemy health by dmgDealt
           currentPet["curVIT"] = parseInt(currentPet["curVIT"]) - dmgDealt;

           if(currentPet["curVIT"] <= 0){ // If the enemy is at 0 health or less, he died.
             // Skip the enemy's attack and it's now Pet2's turn, if he's alive
             currentPet["curVIT"] = 0;
             this.petDeadCount = 1;
             this.petAlive = "No";   
             this.regularAttack(3, 'evil', 'ATK', targetMove, dmgDealt, 'dead');
             } else {
               this.regularAttack(3, 'evil', 'ATK', targetMove, dmgDealt, 'none');
             }

             setTimeout(() => {
              this.resetTargets(); // Send to next phase whether dead or alive. Next phase will skip if necessary.
              }, 1300);             

             setTimeout(() => {
           // Check which enemy was targeted, and update their picture and health.
           if(currentPet["curVIT"] == 0){
            document.getElementById("pokeView" + targetMove).innerHTML = '<img id="pokeBattle'+ targetMove +'" src="../assets/combat/' + currentPet["sprite"] + '.png" style="width: 70px; height: 70px; filter: grayscale(100%)" /><div id="eneHP' + targetMove + '"><h1>'+ currentPet["curVIT"] + ' / ' + currentPet["maxVIT"] +'</h1></div>';
            } else {
            document.getElementById("pokeView" + targetMove).innerHTML = '<img id="pokeBattle'+ targetMove +'" src="../assets/combat/' + currentPet["sprite"] + '.png" style="width: 70px; height: 70px;" /><div id="petHP' + targetMove +'"><h1>'+ currentPet["curVIT"] + ' / ' + currentPet["maxVIT"] +'</h1></div>';
            }
           }, 150);
      } else {
      // If enemy3 is dead, end fight.
      this.resetTargets();
      }
  }
}