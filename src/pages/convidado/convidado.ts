import { Component } from '@angular/core';
import { NavController, NavParams, LoadingController, ToastController } from 'ionic-angular';
import { 
  FormControl, FormArray, FormBuilder, FormGroup, Validators} from '@angular/forms';
import {CongregacaoProvider} from '../../providers/congregacao/congregacao-provider';
import {DetalheConvidado}  from '../detalhe-convidado/detalhe-convidado';
import {Fire} from '../../util/fire';
import {NovoConvidado} from '../novo-convidado/novo-convidado';

@Component({
  templateUrl: 'convidado.html'

})
export class Convidado {

  selectedItem: any;
  icons: string[];
  items: Array<{ title: string, note: string, icon: string }>;


  convidadoModel: {
    nome?: string,
    telefone?: any,
    email?: any,
    congregacao?: any

  } = {};


  submitted = false;

  constructor(public navCtrl: NavController, navParams: NavParams,
    public loadingController: LoadingController,
    private firebase: Fire, public toastCtrl: ToastController) {

    this.convidadoModel.congregacao = {};
    this.selectedItem = navParams.get('item');
    this.icons = ['flask', 'wifi', 'beer', 'football', 'basketball', 'paper-plane',
      'american-football', 'boat', 'bluetooth', 'build'];

    this.items = [];


  }

  ngOnInit() {
    let loading = this.loadingController.create({
      content: 'Aguarde'
     // dismissOnPageChange: true
    });
    loading.present();
    this.firebase.getConvidados(items => {//
      this.items.push(items);
      for (let i = 0; i < this.items.length; i++) {
        this.items[i]['icon'] = '';
        this.items[i].icon = this.icons[Math.floor(Math.random() * this.icons.length)];
        // setTimeout(() => {
        //   loading.dismiss();
        // }, 5000);
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
    this.navCtrl.push(Convidado, {
      item: item
    });
  }
  alert1() {
    console.log('trocar de pag');
  }

  salvarCongregacao() {
    //     console.log('objeto: ' + this.congregacaoModel);

    //     this.submitted = true;

    //     let loading = this.loadingController.create({
    //       content: "Aguarde"
    //     });
    //     loading.present();
    //     this.submitted = true;
    //     this.firebase.saveCongregacao(this.congregacaoModel, (res)=>{
    //          console.log('Resultado ' + res)
    //           loading.dismiss();
    //     });
    //     loading.dismiss();
    //     //this.presentToast();
    //    //console.log('Evento: ' + this.eventoModel);
    //     this.navCtrl.pop();
    // this.navCtrl.push(Evento);

  }

  detalheConvidado(codigoConvidado: number) {
    console.log('codigo: ' + codigoConvidado);

    this.navCtrl.push(DetalheConvidado, codigoConvidado).then(
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


  addConvidado() {
    this.navCtrl.push(NovoConvidado).then(
      response => {
        console.log('Response' + response);
      },
      error => {
        console.log('Error' + error);
      }
    ).catch(exception => {
      console.log('Exception ' + exception);
    });
  }


  garantirVazio(objeto) {
    if (objeto == undefined) {
      return '';
    }
    return objeto;
  }
}
