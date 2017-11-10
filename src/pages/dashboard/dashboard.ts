import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';
import { Jovem } from '../jovem/jovem';
import { Evento } from '../evento/evento';
import { Congregacao } from '../congregacao/congregacao';

import {Convidado} from '../convidado/convidado';
@Component({
  templateUrl: 'dashboard.html'

})

export class Dashboard {


  constructor(public navCtrl: NavController, navParams: NavParams) {

  }

  openPage(page) {
    // Reset the content nav to have just this page
    // we wouldn't want the back button to show in this scenario
    this.navCtrl.push(page);
  }

  abrirPaginaEventos() {
    this.navCtrl.push(Evento);
  }

 abrirPaginaConvidados() {
    this.navCtrl.push(Convidado);
  }

   abrirPaginaMembros() {
    this.navCtrl.push(Jovem);
  }

   abrirPaginaCongregacoes() {
    this.navCtrl.push(Congregacao);
  }

}
