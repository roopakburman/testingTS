

import { Injectable } from '@angular/core';
import { AngularFireAuth } from "@angular/fire/auth";
// import { AngularFirestore } from "@angular/fire/firestore";
import { Observable } from "rxjs";
import { GooglePlus } from '@ionic-native/google-plus/ngx';
import { AlertController, Platform, LoadingController } from "@ionic/angular";
import { NativeStorage } from "@ionic-native/native-storage/ngx";
import * as firebase from 'firebase';
import { async } from 'rxjs/internal/scheduler/async';
import { environment } from "../../environments/environment";
import { Router, CanActivate } from '@angular/router';
import { UserService } from './user.service';
import { User } from './user';
import { AngularFirestore } from '@angular/fire/firestore';

interface user1 {
      username: string,
      uid: string
}

@Injectable({
  providedIn: 'root'
})
export class AuthService  { //implements CanActivate
  userData: any; // Save logged in user data
  user1: Observable<firebase.User>;

  constructor(
    // public afs: AngularFirestore,   // Inject Firestore service
    public afAuth: AngularFireAuth, // Inject Firebase auth service
    // public afStore: AngularFirestore,
    private googlePlus: GooglePlus,
    private user2: UserService,
    private user: User,
    private platform: Platform,
    public alerts: AlertController,
    public loadingController: LoadingController,
    public alertController: AlertController,
    public nativeStorage: NativeStorage,
    public router: Router

  ) {    

    this.user1 = this.afAuth.authState;

    
    /* Saving user data in localstorage when 
    logged in and setting up null when logged out */
    this.afAuth.authState.subscribe(user1 => {
      if (user1) {
        this.userData = user1;
        localStorage.setItem('user', JSON.stringify(this.userData));
        JSON.parse(localStorage.getItem('user'));
      } else {
        localStorage.setItem('user', null);
        JSON.parse(localStorage.getItem('user'));
      }
    })
  }

  // async canActivate(route){
  //   if(await this.user2.isAuthenticated()){
  //       //this is ok
  //       return true;
  //   } else {
  //       // this.router.navigate[('/login')];
  //       return false;
  //   }
  // }
// **********************************************************
    // ****************** FIREBASE EMAIL AUTH *******************
    // **********************************************************
    async login(username, password){
      const loading = await this.loadingController.create({
        message: 'Please wait...'
      });
      this.presentLoading(loading);
        try {
          const res = await this.afAuth.auth.signInWithEmailAndPassword(username, password);
          
          if(res.user) {
            this.user2.setUser({
              username,
              uid: res.user.providerId,
              displayName: res.user.displayName,
              email: res.user.email,
              emailVerified: res.user.emailVerified,
              photoURL:res.user.photoURL
            })
            this.router.navigate(['/list']);
            loading.dismiss();

            this.welcomUserAlert();
          }
        
        } catch(err){
          console.dir(err);
          loading.dismiss();
        }
    
      }
      logoutFirebase(){
        this.afAuth.auth.signOut();
      }

      async welcomUserAlert() {
        const alert = await this.alertController.create({
           message: 'Welcome',
           buttons: ['OK']
         });
    
        await alert.present();
      }

      // **************************************************************
      // ****************** FIREBASE EMAIL REGISTER *******************
      // **************************************************************
      // async registerWithFirebase(username, password, cpassword){
      //   const loading = await this.loadingController.create({
      //     message: 'Please wait...'
      //   });
      //   this.presentLoading(loading);
    
      //   if(password !== cpassword) {
      //     this.showAlert("Error", "Password don't Match!");
      //     return console.log("Passwords don't match");
      //   }
    
      //   try {
      //     const res = await this.afAuth.auth.createUserWithEmailAndPassword(username, password);
      //     // console.dir(res);
    
      //     this.afStore.doc(`users/${res.user.uid}`).set({
      //       username
      //     })
    
      //     this.user.setUser({
      //       username,
      //       uid: res.user.uid
      //     })
      //     this.showAlert("CONGRATULATIONS", "Your account has been created! Welcome to Social Beta");
      //     this.router.navigate(['/tabs']);
      //     loading.dismiss();
        
      //   } catch(err){
      //     console.dir(err);
      //     loading.dismiss();
      //     this.showAlert(err.message, "Please be careful in typing your details.");
      //   }
    
      // }
      // async showAlert(header: string, message: string){
      //   const alert = await this.alerts.create({
      //     header,
      //     message,
      //     buttons: ['OK']
      //   });
      //   await alert.present();
      // }

      // **********************************************************
      // ********************** GOOGLE AUTH ***********************
      // **********************************************************

  // googleLogin() {
  //   if (this.platform.is('cordova')) {
  //     this.doGoogleLogin();
  //   } else {
  //     // this.webGoogleLogin();
  //   }
  // }





  // async doGoogleLogin(){
  //   const loading = await this.loadingController.create({
  //     message: 'Please wait...'
  //   });
  //   this.presentLoading(loading);
  //   this.googlePlus.login({
  //     'scopes': '', // optional - space-separated list of scopes, If not included or empty, defaults to `profile` and `email`.
  //     'webClientId': environment.googleWebClientId, // optional - clientId of your Web application from Credentials settings of your project - On Android, this MUST be included to get an idToken. On iOS, it is not required.
  //     'offline': true, // Optional, but requires the webClientId - if set to true the plugin will also return a serverAuthCode, which can be used to grant offline access to a non-Google server
  //     })
  //     .then(user => {
  //       //save user data on the native storage
  //       this.nativeStorage.setItem('google_user', {
  //         name: user.displayName,
  //         email: user.email,
  //         picture: user.imageUrl
  //       })
  //       .then(() => {
  //          this.router.navigate(["/list"]);
  //       }, (error) => {
  //         console.log(error);
  //       })
  //       loading.dismiss();
  //     }, err => {
  //       console.log(err);
  //       if(!this.platform.is('cordova')){
  //         this.presentAlert();
  //       }
  //       loading.dismiss();
  //     })
  // }
  
  
  async presentAlert() {
    const alert = await this.alertController.create({
       message: 'Cordova is not available on desktop. Please try this in a real device or in an emulator.',
       buttons: ['OK']
     });

    await alert.present();
  }


  async presentLoading(loading) {
    return await loading.present();
  }
  
}
