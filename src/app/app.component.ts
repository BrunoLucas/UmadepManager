import { Component, ViewChild, enableProdMode } from '@angular/core';
import {  Platform, Nav } from 'ionic-angular';
import { SplashScreen } from '@ionic-native/splash-screen';
import { StatusBar } from '@ionic-native/status-bar'

import { About } from '../pages/about/about';
import { Jovem } from '../pages/jovem/jovem';
import { Evento } from '../pages/evento/evento';
import { Congregacao } from '../pages/congregacao/congregacao';
import { Convidado } from '../pages/convidado/convidado';
import { Dashboard } from '../pages/dashboard/dashboard';
import {EventoProvider} from '../providers/evento/evento-provider';
import {DetalheEvento} from '../pages/detalhe-evento/detalhe-evento';
import { LoginPage } from '../pages/login/login';
;


@Component({
  templateUrl: 'app.html'
})
export class MyApp {
  @ViewChild(Nav) nav: Nav;

  rootPage: any = LoginPage;

  pages: Array<{title: string, component: any, img1?: any, img2?: any}>;

  pagesPeople : Array<{title: string, component: any, img1?: any, img2?: any}>;

  pagesSystem : Array<{title: string, component: any, img1?: any, img2?: any}>;



constructor(platform: Platform, statusBar: StatusBar, splashScreen: SplashScreen) {
    
    this.pages = [
      { title: 'Evento',   component: Evento, img1: 'ios-bonfire', img2: 'md-bonfire'},
      { title: 'Congregacao',   component: Congregacao, img1: 'ios-book', img2: 'md-book'}
    ];
    this.pagesPeople = [
      { title: 'Jovens',   component: Jovem, img1: 'ios-body', img2: 'md-body'},
      { title: 'Convidados',   component: Convidado , img1: 'ios-man', img2: 'md-man'}

    ];
    this.pagesSystem = [
      { title: 'Sobre',    component: About  , img1: 'ios-bonfire', img2: 'md-bonfire'}
    ];

    platform.ready().then(() => {
      // Okay, so the platform is ready and our plugins are available.
      // Here you can do any higher level native things you might need.
      console.log('ready');
      statusBar.styleDefault();
      splashScreen.hide();
    });

  }

  openPage(page) {
    // Reset the content nav to have just this page
    // we wouldn't want the back button to show in this scenario
    this.nav.setRoot(page.component);
  }

  openPageInicial() {
    // Reset the content nav to have just this page
    // we wouldn't want the back button to show in this scenario
    this.nav.setRoot(MyApp);
    //this.nav.push(MyApp);
  }
  

}
    //enableProdMode();

