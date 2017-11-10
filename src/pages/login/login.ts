import { Component } from '@angular/core';
import { NavController, NavParams, LoadingController } from 'ionic-angular';
// import { Fire } from '../../util/fire';
import { Dashboard } from '../dashboard/dashboard';

import { AngularFireAuth } from 'angularfire2/auth';
import * as firebase from 'firebase/app';
import { Facebook } from '@ionic-native/facebook';
import { Platform, App } from 'ionic-angular';
import {Fire} from '../../util/fire';
import { AlertController } from 'ionic-angular';


@Component({
  selector: 'login',
  templateUrl: 'login.html'
})

export class LoginPage {

  displayName;

  constructor(public navCtrl: NavController,
    navParams: NavParams,
    // private fire: Fire,
    public loadingController: LoadingController,
    private afAuth: AngularFireAuth,
    private fb: Facebook,
    private platform: Platform,
    public app: App,
    public fire: Fire,
    public alertCtrl: AlertController) {

      console.log('LoginPage');

    afAuth.authState.subscribe(user => {
      console.log('user: ' + user);
      // this.signInWithFacebook();
      if (!user) {
        this.displayName = null;
        return;
      }
      this.displayName = user.displayName;
    });

  }

   ngAfterViewInit() {
    // this.app.setEnabled(true);
  }

  openPage(page) {
    // Reset the content nav to have just this page
    // we wouldn't want the back button to show in this scenario
    this.navCtrl.push(page.component);
  }



  showAlert(titulo, subtitulo) {
    let alert = this.alertCtrl.create({
      title: titulo,
      subTitle: subtitulo,
      buttons: ['OK']
    });
    alert.present();
  }

  onLogin() {
    console.log('signInWithFacebook');
    // this.showAlert('Teste', 'Tentando logar.');
    let token: any;
    if (this.platform.is('cordova')) {
       this.fb.login(['email', 'public_profile']).then(res => {

        // this.showAlert('Teste', 'retorno facebook ' + res.authResponse);

        const facebookCredential = firebase.auth.FacebookAuthProvider.credential(res.authResponse.accessToken);
        token = res.authResponse.accessToken;
         firebase.auth().signInWithCredential(facebookCredential).then( result =>{

          // this.showAlert('Teste', 'retorno firebase ' + result.toJSON());
          console.log('result: ' + result);
          let objeto: {
            name?: any,
            photo?: any,
            id?: any,
            token?: any} = new Object();

          objeto.name = result.toJSON().displayName;
          objeto.photo = result.toJSON().photoURL;
          objeto.id = result.toJSON().uid;
          objeto.token = result.toJSON().stsTokenManager.accessToken;
          this.fire.setUser(objeto); 
          this.navCtrl.setRoot(Dashboard);
        });
      }).catch(exception =>{
        this.showAlert('Teste', 'retorno erro facebook ' + exception);
      });
    } else {
       this.afAuth.auth
        .signInWithPopup(new firebase.auth.FacebookAuthProvider())
        .then(res => {
          // this.showAlert('Teste', 'retorno firebase app web ' +res);
          console.log('res:' + res);
          this.navCtrl.setRoot(Dashboard);
      }).catch(exception =>{
        //  this.showAlert('Teste', 'retorno erro facebook ' + exception);
      });;
    }
  }

  signOut() {
    this.afAuth.auth.signOut();
  }
  onLoginGoogle() {

  }
}
