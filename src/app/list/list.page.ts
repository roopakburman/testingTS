import { Component, OnInit } from '@angular/core';

import { NativeStorage } from '@ionic-native/native-storage/ngx';
import { Storage } from "@ionic/storage";

@Component({
  selector: 'app-list',
  templateUrl: 'list.page.html',
  styleUrls: ['list.page.scss']
})
export class ListPage implements OnInit {

  constructor(private nativeStorage: NativeStorage, private localStorage: Storage) {
    

  }




/**
 * generate a random integer between min and max
 * @param {Number} min 
 * @param {Number} max
 * @return {Number} random generated integer 
 */
randomInt(min, max){
  return Math.floor(Math.random() * (max - min + 1)) + min;
}
  public iCtr: number;
  private selectedItem: any;
  private icons = [
    'flask',
    'wifi',
    'beer',
    'football',
    'basketball',
    'paper-plane',
    'american-football',
    'boat',
    'bluetooth',
    'build'
  ];
  public user: {
    userName: 'Roopak',
    userEmail: 'a@b.com',
    userCurrentScore: '0',
    userHighestWinStreak: '7',
    userImageUrl: ''
  }
  public userShotHimself = ["Smell the gunsmoke!", 
  "L.O.S.E.R !!! You are dead!", 
  "Go watch TV, you can't stand me", 
  "Seriously? You want to compete?", 
  "See that extra hole in 'ur head?",
  "Try again, see if you can kill me"];
  public userShotEmpty =  ["Not for long, You will DIE next time", 
  "You think you are lucky?", 
  "Next Time, you son of a gun!",
  "Wait till You shoot yourself in the head",
  "About time, Dead man Walking",
  "Luck favoured you this time!"];
  compShotItself = ["You think you won? Let's play another round", 
  "Got Balls? Let's go again", 
  "You just got lucky", 
  "Hasta Lavista! I'll be back!", 
  "There was a babe I was checking out!"];
  compShotEmpty = ["I Survived", 
  "Hahahahahahahahaha", 
  "I'm INVINCIBLE",
  "No Guts No Glory",
  "You are doomed! You noob!",
  "They call me - Mr. 1-Bullet"];  
  
  public fireCountDown = 6;
  public userScore: number = 0;
  public compScore: number = 0;
  
  public userHighScore: number = 0;
  public userHighScoreLocal;
  public bulletChamber;
  public whoFiresShot;
  // public userFires;
  // public compFires;
  public playButton = false;
  public shootButton = true;

  public whoFiresMessage;
  public bulletStatus;



    play(){

      // console.log(this.playButton);
      // let audioPlayer: HTMLMediaElement = document.getElementById('gReload');
      // audioPlayer.play();

      this.whoFiresShot = this.randomInt(0,1);
      this.bulletChamber = this.randomInt(1,6);
      this.fireCountDown = 6;


      if(this.whoFiresShot ===1){
        this.whoFiresMessage = 'User is all set to pick up the gun and fire!';
        this.bulletStatus = '6 Chambers 1 Bullet, where is the bullet: ';

     }else {
      this.whoFiresMessage = 'Computer is all set to pick up the gun and fire!';
      this.bulletStatus = '6 Chambers 1 Bullet, where is the bullet: ';
      this.compPicksGun(this.bulletChamber);
      // this.shoot();
     }

     this.playButton = true;
     this.shootButton = false;
   }

   shoot(){
     
    console.log('WHo Fires: ' + this.whoFiresShot);

      if(this.whoFiresShot ===1){
      console.log('User is about to Shoot');

        console.log('User About to Fire...!' + this.bulletChamber);
        this.userPicksGun(this.bulletChamber);

      console.log('WHo Fires: ' + this.whoFiresShot);
    }else{
      console.log('Bullet In ' + this.bulletChamber);
      
      this.compPicksGun(this.bulletChamber);
      

      // let audioPlayer: HTMLMediaElement = document.getElementById('gBang');
      // audioPlayer.play();

      document.getElementById('b' + this.fireCountDown).innerHTML = '<ion-icon name="body"></ion-icon>';
    }
   }
 
   userPicksGun(bChamber){
    if(bChamber === this.fireCountDown){
      this.iCtr = this.randomInt(1,6);
      this.whoFiresMessage = this.userShotHimself[this.iCtr];
      if(this.whoFiresMessage === ""){
        this.whoFiresMessage = "You were dead when you first picked the gun!";
      }
      // this.fireCountDown = 6;
      this.whoFiresShot = 2;
      this.shootButton = true;
      this.playButton = false;

      this.compScore = this.compScore + 1;

      // let audioPlayer: HTMLMediaElement = document.getElementById('gBang');
        // audioPlayer.play();

      // setTimeout(()=>{
        // let audioPlayer1: HTMLMediaElement = document.getElementById('gShellFalling');
        // audioPlayer1.play();
      // }, 1500);

      console.log('User Dead: ' + bChamber);
    }else if(bChamber<this.fireCountDown){
      this.iCtr = this.randomInt(1,6);
      this.whoFiresMessage=this.userShotEmpty[this.iCtr];
      if(this.whoFiresMessage === ""){
        this.whoFiresMessage = "This is not fair, I smell smoke!";
      }
      this.fireCountDown = this.fireCountDown - 1;
      this.whoFiresShot = 0;
      // let audioPlayer: HTMLMediaElement = document.getElementById('gClick');
      // audioPlayer.play();
    }
    if(this.whoFiresShot!==2){
        setTimeout(() => {
          console.log('Computer About to Fire...!' + this.bulletChamber);
          this.compPicksGun(this.bulletChamber);
          console.log('Computer Fired...!');
          // let audioPlayer1: HTMLMediaElement = document.getElementById('gShellFalling');
          // audioPlayer1.play();
        }, 3000);
      }
   }
   compPicksGun(bChamber){
    console.log(bChamber);
    if(bChamber === this.fireCountDown){
      this.iCtr = this.randomInt(1,6);
      this.whoFiresMessage = this.compShotItself[this.iCtr];
      // this.fireCountDown = 6;
      this.whoFiresShot = 2;
      this.shootButton = true;
      this.playButton = false;
      // let audioPlayer: HTMLMediaElement = document.getElementById('gBang');
      // audioPlayer.play();

    // setTimeout(()=>{
      // let audioPlayer1: HTMLMediaElement = document.getElementById('gShellFalling');
      // audioPlayer1.play();
    // }, 1500);

      this.userScore = this.userScore + 1;
      if(this.userHighScore < this.userScore){
        this.userHighScore = this.userScore;
        this.userHighScoreLocal = this.userHighScore;
      }

      // ************NATIVE STORAGE
      // this.nativeStorage.setItem('myitem', {property: 'value', anotherProperty: 'anotherValue'})
      // .then(
      //   () => console.log('Stored item!'),
      //   error => console.error('Error storing item', error)
      // );

      // localStorage.setItem('UserHighScore', this.userHighScore);
      localStorage.setItem("UserHighScore: ", this.userHighScoreLocal);

      console.log('Comp Dead ' + bChamber);
    }else if(bChamber<this.fireCountDown){
      this.iCtr = this.randomInt(1,6);
      this.whoFiresMessage=this.compShotEmpty[this.iCtr];
      this.fireCountDown = this.fireCountDown - 1;
      this.whoFiresShot = 1;
      // setTimeout(()=>{
      // let audioPlayer: HTMLMediaElement = document.getElementById('gClick');
      // audioPlayer.play();
      // }, 1500);
    }
   }


   ngOnInit() {
   }
  }


