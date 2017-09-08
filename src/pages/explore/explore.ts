import { Component } from '@angular/core';
import { BattlePage } from '../battle/battle';
import { IonicPage, NavController, NavParams } from 'ionic-angular';

/**
 * Generated class for the ExplorePage page.
 *
 * See http://ionicframework.com/docs/components/#navigation for more info
 * on Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-explore',
  templateUrl: 'explore.html',
})
export class ExplorePage {

  constructor(public navCtrl: NavController, public navParams: NavParams) {
  }

  public planetName: string;
  public missionLVL: number;

  public MissionSelect1: boolean = false; //Make list appear
  public MissionSelect2: boolean = false; 
  public MissionSelect3: boolean = false;

  public MissionInfoDiv: boolean = false; // Make Mission info appear
  
  // When they choose which planet to visit
  setPlanet(planet){
  if(planet == 'grass'){
  this.MissionSelect1 = true;
  this.MissionSelect2 = false;
  this.MissionSelect3 = false;
  }else if(planet == 'stone'){
  this.MissionSelect1 = false;
  this.MissionSelect2 = true;
  this.MissionSelect3 = false;  
  }else if(planet == 'blood'){
  this.MissionSelect1 = false;
  this.MissionSelect2 = false;
  this.MissionSelect3 = true;  
  }
  this.planetName = planet;
  }

  cancelButton(){
     this.MissionInfoDiv = false;
  }

  // When they click to choose a mission. Will return mission info.
  chooseMission(level){
      this.MissionInfoDiv = true;
      this.missionLVL = level;

      setTimeout(() => {
      if(level == '0'){
      document.getElementById("MissionInfoDivMini").innerHTML = '<h1 id="whitetext" style="font-size:20px; text-align:center;">Wild Encounter ★</div><br><br><img id="loot" src="../assets/items/' + this.planetName + level + '.png" style="width: 110px; height: 34px;" />';  
      } else {
      document.getElementById("MissionInfoDivMini").innerHTML = '<h1 id="whitetext" style="font-size:20px; text-align:center;">Mission ' + level + '</div><br><br><img id="loot" src="../assets/items/' + this.planetName + level + '.png" style="width: 110px; height: 34px;" />';  
      }
     }, 80);   
  }

  // Change planet and start the battle
  explorePlanet() {
  // Send them to battle page and pass the planet as variable
  this.navCtrl.push(BattlePage, {planet: this.planetName, level: this.missionLVL});
  }

  toHangar(){
      this.navCtrl.pop();
  }

}
