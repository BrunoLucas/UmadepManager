import { Component } from '@angular/core';
import { NavController, NavParams, LoadingController } from 'ionic-angular';
import { 
  FormControl, FormArray, FormBuilder, FormGroup, Validators} from '@angular/forms';
import {EventoProvider} from '../../providers/evento/evento-provider';
import {DetalheEvento}  from '../detalhe-evento/detalhe-evento';

@Component({
  templateUrl: 'evento.html'
})
export class Evento {

  selectedItem: any;
  opcaoEventoModel = 'consultarEvento';
  icons: string[];
 // loading : any;
  items: Array<{ codigo: number, nome: string, descricao: string, icon?: any }>;
  eventoForm = new FormGroup({
    nome : new FormControl()
  });
  eventoModel: { nome?: string, localizacao?: string, data?: any, horario?: any, descricao?: string, administrador?: any } = {};
  submitted = false;

  constructor(public navCtrl: NavController, navParams: NavParams, 
   public loadingController: LoadingController) {
    // If we navigated to this page, we will have an item available as a nav param
    this.selectedItem = navParams.get('item');

    // this.loading = this.loadingController.create({
    //     content : 'Aguarde'
    // });

    // Let's populate this page with some filler content for funzies
    this.icons = ['flask', 'wifi', 'beer', 'football', 'basketball', 'paper-plane',
      'american-football', 'boat', 'bluetooth', 'build'];

    this.items = [];
    console.log('aqui');
    //  this.eventoProvider.findAll().subscribe(
    //           data => this.items = data;

    //  );




  }
  ngOnInit() {
     let loading = this.loadingController.create({
        content : 'Aguarde'
    });
    loading.present();
    // this.eventoProvider.findAll().subscribe(
    //   (data) => {
    //     console.log('dados: ' + data);
    //     this.items = data;
    //     console.log(this.items[0]);
    //     for (let i = 0; i < this.items.length; i++) {
    //       this.items[i]['icon'] = '';
    //       this.items[i].icon = this.icons[Math.floor(Math.random() * this.icons.length)];

    //     }
        loading.dismiss();
    //   },
    //   (err) => {
    //     console.log('erro: ' + err);
    //     loading.dismiss();
    //   }
    // );
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

  salvarEvento(eventoModel) {
    console.log('objeto: ' + this.eventoModel);
    this.submitted = true;
    // this.eventoModel['administrador'] = new Object();
    // this.eventoModel.administrador['codigo'] = 1;
    this.eventoModel.horario = null;
    this.eventoModel.data = null;
    console.log('objeto: ' + eventoModel);
    // this.eventoProvider.saveEvento(this.eventoModel).subscribe(
    //   (data) => {
    //     console.log('salvou: ' + data);
    //   },
    //   (err) => {
    //     console.log('error: ' + err);
    //   }
    // );
    // if (novoEventoForm.valid) {
    console.log('Evento: ' + this.eventoModel);

    // }
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
    //  this.navCtrl.push(NovoEvento).then(
    //   response => {
    //     console.log('Response ' + response);
    //   },
    //   error => {
    //     console.log('Error: ' + error);
    //   }
    // ).catch(exception => {
    //   console.log('Exception ' + exception);
    // });
  }
} 