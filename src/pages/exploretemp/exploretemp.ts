import { Component } from '@angular/core';
import { HangarPage } from '../hangar/hangar';
import { BattletempPage } from '../battletemp/battletemp';
import { IonicPage, NavController, NavParams } from 'ionic-angular';

/**
 * Generated class for the ExploretempPage page.
 *
 * See http://ionicframework.com/docs/components/#navigation for more info
 * on Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-exploretemp',
  templateUrl: 'exploretemp.html',
})
export class ExploretempPage {

  constructor(public navCtrl: NavController, public navParams: NavParams) {
  }

  public planetName: string;
  public missionLVL: number;

  public MissionSelect1: boolean = false; //Make list appear
  public MissionSelect2: boolean = false; 
  public MissionSelect3: boolean = false;
  public MissionSelect4: boolean = false;

  public MissionInfoDiv: boolean = false; // Make Mission info appear
  
  // When they choose which Training they click on. Called Planets 'cause I'm lazy
  setPlanet(planet){
  if(planet == 'dex'){
  this.MissionSelect1 = true;
  this.MissionSelect2 = false;
  this.MissionSelect3 = false;
  this.MissionSelect4 = false;
  }else if(planet == 'atk'){
  this.MissionSelect1 = false;
  this.MissionSelect2 = true;
  this.MissionSelect3 = false;
  this.MissionSelect4 = false;
  }else if(planet == 'def'){
  this.MissionSelect1 = false;
  this.MissionSelect2 = false;
  this.MissionSelect3 = true;
  this.MissionSelect4 = false;
  }else if(planet == 'vit') {
  this.MissionSelect1 = false;
  this.MissionSelect2 = false;
  this.MissionSelect3 = false;
  this.MissionSelect4 = true;  
  }
  this.planetName = planet;
  }

ionViewDidLoad() {
  var petStats = this.navParams.get('petStats');
  var petNum = this.navParams.get('petNum');
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
     }, 20);   
  }

  // Change planet and start the battle
  explorePlanet() {
  // Send them to battle page and pass the planet as variable
  var petStats = this.navParams.get('petStats');
  var petNum = this.navParams.get('petNum');
  this.navCtrl.push(BattletempPage, {planet: this.planetName, level: this.missionLVL, targetNum: petNum, petInfo: petStats});
  }

  toHangar(){
      this.navCtrl.pop();
  }

}

