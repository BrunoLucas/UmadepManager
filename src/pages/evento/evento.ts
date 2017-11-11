import { Component, ViewChild } from '@angular/core';
import { NavController, NavParams, LoadingController, ToastController } from 'ionic-angular';
import { 
  FormControl, FormArray, FormBuilder, FormGroup, Validators} from '@angular/forms';
import {EventoProvider} from '../../providers/evento/evento-provider';
import {DetalheEvento}  from '../detalhe-evento/detalhe-evento';
import {NovoEvento} from '../novo-evento/novo-evento';
import {Fire} from '../../util/fire';
import {Toast} from '@ionic-native/toast';

@Component({
  templateUrl: 'evento.html'
})
export class Evento {

  selectedItem: any;
  opcaoEventoModel = 'consultarEvento';
  icons: string[];
  // loading : any;
  items: Array<{ codigo: number, nome: string, descricao: string, icon?: any }>;
  private disable: boolean;
  eventoForm = new FormGroup({
    nome: new FormControl()
  });
  eventoModel: { nome?: string, localizacao?: string, data?: any, horario?: any, descricao?: string, administrador?: any, foto?: any } = {};
  submitted = false;

  constructor(public navCtrl: NavController, navParams: NavParams, public firebase: Fire,
    public loadingController: LoadingController, public toastCtrl: ToastController) {
    // If we navigated to this page, we will have an item available as a nav param
    this.selectedItem = navParams.get('item');

    this.icons = ['flask', 'wifi', 'beer', 'football', 'basketball', 'paper-plane',
      'american-football', 'boat', 'bluetooth', 'build'];

    this.items = [];
    console.log('aqui');


  }
  ngOnInit() {




    let loading = this.loadingController.create({
      content: 'Aguarde'
    });
    loading.present();
    this.firebase.getEventos(items => {
      this.items.push(items);
      for (let i = 0; i < this.items.length; i++) {
        this.items[i]['icon'] = '';
        this.items[i].icon = this.icons[Math.floor(Math.random() * this.icons.length)];
      }
      setTimeout(() => {
        loading.dismiss();
      });
    });
    if (this.items === undefined || this.items.length === 0) {
      setTimeout(() => {
        loading.dismiss();
      });
    }

  }



  itemTapped(event, item) {
    // That's right, we're pushing to ourselves!
    this.navCtrl.push(Evento, {
      item: item
    });
  }
  alert1() {
    console.log('trocar de pag');
  }


  detalheEvento(codigoEvento: number) {
    console.log('codigo: ' + codigoEvento);

    this.navCtrl.push(DetalheEvento, codigoEvento).then(
      response => {
        console.log('Response ' + response);
      },
      error => {
        console.log('Error: ' + error);
      }
    ).catch(exception => {
      console.log('Exception ' + exception);
    });

  }

  novoEvento() {
    this.navCtrl.push(NovoEvento).then(
      response => {
        console.log('Response ' + response);
      },
      error => {
        console.log('Error: ' + error);
      }
    ).catch(exception => {
      console.log('Exception ' + exception);
    });
  }
} 