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
  this.storage.get('Profile').then((data) => {
  
  var profileInfo = JSON.parse(data); 
 
  if(profileInfo["Pet1"] == "Yes"){
  this.storage.get('PetOneInfo').then((data1) => {
  var petInfo1 = JSON.parse(data1);
  document.getElementById("pokeView1").innerHTML = '<img id="pokeBattle1" src="../assets/combat/' + petInfo1["sprite"] + '.png" style="width: 70px; height: 70px;" />';
  console.log("Yo") ;
   });  
  }

  if(profileInfo["Pet2"] == "Yes"){
  this.storage.get('PetTwoInfo').then((data2) => {
  var petInfo2 = JSON.parse(data2);
  document.getElementById("pokeView2").innerHTML = '<img id="pokeBattle2" src="../assets/combat/' + petInfo2["sprite"] + '.png" style="width: 70px; height: 70px;" />';
   });   
  }

  if(profileInfo["Pet3"] == "Yes"){
  this.storage.get('PetThreeInfo').then((data3) => {
  var petInfo3 = JSON.parse(data3);
  document.getElementById("pokeView3").innerHTML = '<img id="pokeBattle3" src="../assets/combat/' + petInfo3["sprite"] + '.png" style="width: 70px; height: 70px;" />';
   }); 
  }

   });
  }

  planetEnemies(planet, level){
  // Check what planet it is
  if(planet == "shroom") {
   // Predetermined monsters for every level. Can find RNG and goodies (loot) when venturing into the Wilderness
   // AB = Ability 1,2,3. L1,2,3,4,5 = Loot 1 to 5. 1 common, 5 super rare. 
   var enemy1 = { amount: "1", name: "POLIWHIRL", sprite: "4", LVL: "1", curVIT: "8", maxVIT: "8", ATK: "4", DEF: "3", DEX: "3", FTH: "1", color: "purple", PROF: "none", AB1: "", AB2: "", AB3: "", L1: "", L2: "", L3: "", L4: "", L5: ""};
   var enemy2 = { amount: "1", name: "POLIWHIRL", sprite: "4", LVL: "1", curVIT: "8", maxVIT: "8", ATK: "4", DEF: "3", DEX: "3", FTH: "1", color: "purple", PROF: "none", AB1: "", AB2: "", AB3: "", L1: "", L2: "", L3: "", L4: "", L5: ""};
   var enemy3 = { amount: "1", name: "POLIWHIRL", sprite: "4", LVL: "1", curVIT: "8", maxVIT: "8", ATK: "4", DEF: "3", DEX: "3", FTH: "1", color: "purple", PROF: "none", AB1: "", AB2: "", AB3: "", L1: "", L2: "", L3: "", L4: "", L5: ""};
   var enemy4 = { amount: "1", name: "POLIWHIRL", sprite: "4", LVL: "1", curVIT: "8", maxVIT: "8", ATK: "4", DEF: "3", DEX: "3", FTH: "1", color: "purple", PROF: "none", AB1: "", AB2: "", AB3: "", L1: "", L2: "", L3: "", L4: "", L5: ""};
   var enemy5 = { amount: "1", name: "POLIWHIRL", sprite: "4", LVL: "1", curVIT: "8", maxVIT: "8", ATK: "4", DEF: "3", DEX: "3", FTH: "1", color: "purple", PROF: "none", AB1: "", AB2: "", AB3: "", L1: "", L2: "", L3: "", L4: "", L5: ""};
   var enemy6 = { amount: "1", name: "POLIWHIRL", sprite: "4", LVL: "1", curVIT: "8", maxVIT: "8", ATK: "4", DEF: "3", DEX: "3", FTH: "1", color: "purple", PROF: "none", AB1: "", AB2: "", AB3: "", L1: "", L2: "", L3: "", L4: "", L5: ""};
   var enemy7 = { amount: "1", name: "POLIWHIRL", sprite: "4", LVL: "1", curVIT: "8", maxVIT: "8", ATK: "4", DEF: "3", DEX: "3", FTH: "1", color: "purple", PROF: "none", AB1: "", AB2: "", AB3: "", L1: "", L2: "", L3: "", L4: "", L5: ""};
   var enemy8 = { amount: "1", name: "POLIWHIRL", sprite: "4", LVL: "1", curVIT: "8", maxVIT: "8", ATK: "4", DEF: "3", DEX: "3", FTH: "1", color: "purple", PROF: "none", AB1: "", AB2: "", AB3: "", L1: "", L2: "", L3: "", L4: "", L5: ""};
   var enemy9 = { amount: "2", name: "POLIWHIRL", sprite: "4", LVL: "1", curVIT: "8", maxVIT: "8", ATK: "4", DEF: "3", DEX: "3", FTH: "1", color: "purple", PROF: "none", AB1: "", AB2: "", AB3: "", L1: "", L2: "", L3: "", L4: "", L5: ""};
   var enemy10 = { amount: "3", name: "POLIWHIRL", sprite: "4", LVL: "1", curVIT: "8", maxVIT: "8", ATK: "4", DEF: "3", DEX: "3", FTH: "1", color: "purple", PROF: "none", AB1: "", AB2: "", AB3: "", L1: "", L2: "", L3: "", L4: "", L5: ""};
   
   // Make array with all enemies, then use level & array to determine which enemy
   var allEnemiesSTR = {evil1: JSON.stringify(enemy1), evil2: JSON.stringify(enemy2), evil3: JSON.stringify(enemy3), evil4: JSON.stringify(enemy4), evil5: JSON.stringify(enemy5), evil6: JSON.stringify(enemy6), evil7: JSON.stringify(enemy7), evil8: JSON.stringify(enemy8), evil9: JSON.stringify(enemy9), evil10: JSON.stringify(enemy10)};
   var allEnemies = {evil1: enemy1, evil2: enemy2, evil3: enemy3, evil4: enemy4, evil5: enemy5, evil6: enemy6, evil7: enemy7, evil8: enemy8, evil9: enemy9, evil10:enemy10};
   
   var enemyAmount = allEnemies["evil" + level];

   if(enemyAmount["amount"] == 1) {

   document.getElementById("evilView1").innerHTML = '<img id="evilBattle1" src="../assets/combat/' + enemyAmount["sprite"] + '.png" style="width: 70px; height: 70px;" />';
 
   } else if(enemyAmount["amount"] == 2) {
   
   } else if(enemyAmount["amount"] == 3) {
   
   }
  
   }
  }

}
