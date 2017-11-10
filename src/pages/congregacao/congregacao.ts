import { Component } from '@angular/core';
import { NavController, NavParams, LoadingController, ToastController } from 'ionic-angular';
import {
  FormControl, FormArray, FormBuilder, FormGroup, Validators} from '@angular/forms';
import {CongregacaoProvider} from '../../providers/congregacao/congregacao-provider';
import {DetalheCongregacao}  from '../detalhe-congregacao/detalhe-congregacao'
import {Fire} from '../../util/fire';
import {Toast} from "@ionic-native/toast";


@Component({
  templateUrl: 'congregacao.html'

})
export class Congregacao {

  selectedItem: any;
  opcaoCongregacaoModel = 'consultarCongregacao';
  icons: string[];
  items: Array<{ title: string, note: string, icon: string }>;

  novoCongregacaoForm = new FormGroup({
    nome: new FormControl()
  });
  congregacaoModel: {
    nome?: string,
    localizacao?: string,
    descricao?: string,

    primeiroPastorModel?: {
      nome?: string,
      telefone?: any,
      email?: any
    },
    segundoPastorModel?: {
      nome?: string,
      telefone?: any,
      email?: any
    },
    primeiroLiderModel?: {
      nome?: string,
      telefone?: any,
      email?: any
    },
    segundoLiderModel?: {
      nome?: string,
      telefone?: any,
      email?: any
    }

  } = {};


  submitted = false;

  constructor(public navCtrl: NavController, navParams: NavParams,
    public loadingController: LoadingController,
    private firebase: Fire, public toastCtrl: ToastController) {

    this.congregacaoModel.primeiroPastorModel = {};
    this.congregacaoModel.segundoPastorModel = {};
    this.congregacaoModel.primeiroLiderModel = {};
    this.congregacaoModel.segundoLiderModel = {};
    //this.pastores = new Array({ nome: '', email: ''});
    this.selectedItem = navParams.get('item');
    this.icons = ['flask', 'wifi', 'beer', 'football', 'basketball', 'paper-plane',
      'american-football', 'boat', 'bluetooth', 'build'];

    this.items = [];


  }

  ngOnInit() {
    let loading = this.loadingController.create({
      content: "Aguarde"
    });
    loading.present();
    this.firebase.getCongregacoes(items => {
      this.items.push(items);
      for (let i = 0; i < this.items.length; i++) {
        this.items[i]['icon'] = '';
        this.items[i].icon = this.icons[Math.floor(Math.random() * this.icons.length)];
        // loading.dismiss();
      }
      setTimeout(() => {
        loading.dismiss();
      });
    });

    if (this.items == undefined || this.items.length == 0) {
      setTimeout(() => {
        loading.dismiss();
      });
    }
  }

  itemTapped(event, item) {
    // That's right, we're pushing to ourselves!
    this.navCtrl.push(Congregacao, {
      item: item
    });
  }
  alert1() {
    console.log('trocar de pag');
  }

  salvarCongregacao() {
    console.log('objeto: ' + this.congregacaoModel);

    this.submitted = true;

    let loading = this.loadingController.create({
      content: "Aguarde"
    });
    loading.present();
    this.submitted = true;
    this.firebase.saveCongregacao(this.congregacaoModel, (res) => {
      console.log('Resultado ' + res)
      loading.dismiss();
    });
    loading.dismiss();
    this.presentToast();
    this.congregacaoModel = {};
    this.congregacaoModel.primeiroPastorModel = {};
    this.congregacaoModel.segundoPastorModel = {};
    this.congregacaoModel.primeiroLiderModel = {};
    this.congregacaoModel.segundoLiderModel = {};
    //console.log('Evento: ' + this.eventoModel);
    this.navCtrl.pop();
    // this.navCtrl.push(Evento);

  }

  detalheCongregacao(codigoCongregacao: number) {
    console.log('codigo: ' + codigoCongregacao);

    this.navCtrl.push(DetalheCongregacao, codigoCongregacao).then(
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


  garantirVazio(objeto) {
    if (objeto == undefined) {
      return '';
    }
    return objeto;
  }
  presentToast() {
    let toast = this.toastCtrl.create({
      message: 'Congregação adicionada com sucesso',
      duration: 3000
    });
    toast.present();
  }

}
