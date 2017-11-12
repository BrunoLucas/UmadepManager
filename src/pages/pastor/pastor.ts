import { Component } from '@angular/core';
import { NavController, NavParams, LoadingController } from 'ionic-angular';
import { 
  FormControl, FormArray, FormBuilder, FormGroup, Validators} from '@angular/forms';
import {PessoaProvider} from '../../providers/pessoa/pessoa-provider';

@Component({
templateUrl: 'pastor.html'

})
export class Pastor {

  selectedItem: any;
  opcaoPastorModel = 'consultarPastor';
  icons: string[];
  items: Array<{title: string, note: string, icon: string}>;
  PastorForm = new FormGroup({
      nome: new FormControl()
    });
  pastorModel: {nome?: string, localizacao?: string, data?: any, horario?: any, descricao?: string} = {};
  submitted  = false;
  
  constructor(public navCtrl: NavController, navParams: NavParams, 
   public loadingController: LoadingController) {
    // If we navigated to this page, we will have an item available as a nav param
    this.selectedItem = navParams.get('item');

    // Let's populate this page with some filler content for funzies
    this.icons = ['flask', 'wifi', 'beer', 'football', 'basketball', 'paper-plane',
    'american-football', 'boat', 'bluetooth', 'build'];

    this.items = [];

  }

  itemTapped(event, item) {
    // That's right, we're pushing to ourselves!
    this.navCtrl.push(Pastor, {
      item: item
    });
  }
  alert1() {
      console.log('trocar de pag');
  }

  ngOnInit() {
     let loading = this.loadingController.create({
        content : 'Aguarde'
    });
    loading.present();
    loading.dismiss();

  }
    salvarPastor(novoPastorForm) {
    console.log('objeto: ' + this.pastorModel);
    this.submitted = true;
    this.pastorModel.horario = null;
    this.pastorModel.data = null;
    console.log('Evento: ' + this.pastorModel);
  }

    detalhePastor(codigoPastor: number) {
    console.log('codigo: ' + codigoPastor);

  }
}
