import { Component } from '@angular/core';
import { GooglePlus } from '@ionic-native/google-plus/ngx';

import { NativeStorage } from '@ionic-native/native-storage/ngx';



import { LoadingController, AlertController, Platform } from '@ionic/angular';

import { FirebaseAuthentication } from "@ionic-native/firebase-authentication/ngx";

import { Router } from '@angular/router';
import { environment } from '../../environments/environment';
import { importType } from '@angular/compiler/src/output/output_ast';

// import { Cordova } from '../login/cordova';

import * as firebase from "firebase/app";
// import { AuthService } from "../service/auth.service";

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage {

  constructor(
    
    private nativeStorage: NativeStorage,
    

    public loadingController: LoadingController,
    private router: Router,
    private gPlus: GooglePlus,
    private fireAuth: FirebaseAuthentication,
    // private authService: AuthService,
    private platform: Platform,
    
  ) { }


  initiateLogin(){
    // this.authService.doGoogleLogin();
    this.gPlus.login({})
    .then(res => console.log(res))
    .catch(err => console.error(err));
  }

  bringFireAuthModal(){

  }

  initiateFireAuth(){
    this.fireAuth.createUserWithEmailAndPassword("test1@test.com", "111111")
    .then((res: any) => console.log(res))
    .catch((error: any) => console.log(error));



  //   this.fireAuth.createUserWithEmailAndPassword('test1@test.com', '111111')
  // .then((res: any) => console.log(res))
  // .catch((error: any) => console.error(error));
  }


}
