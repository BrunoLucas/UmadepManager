import { Component } from '@angular/core';
import { NavController, NavParams, LoadingController, ToastController } from 'ionic-angular';
import { 
  FormControl, FormArray, FormBuilder, FormGroup, Validators} from '@angular/forms';
import {CongregacaoProvider} from '../../providers/congregacao/congregacao-provider';
import {DetalheJovem}  from '../detalhe-jovem/detalhe-jovem'
import {Fire} from '../../util/fire';
import {Toast} from "@ionic-native/toast";
import {NovoJovem} from "../novo-jovem/novo-jovem"

@Component({
  templateUrl: 'jovem.html'

})
export class Jovem {

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
      content: "Aguarde"
       //dismissOnPageChange: true
    });
    loading.present();
    this.firebase.getJovens(items => {//
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

     if(this.items == undefined || this.items.length == 0){
        setTimeout(() => {
        loading.dismiss();
      });    
     }

  }

  detalheJovem(codigoJovem: number) {
    console.log('codigo: ' + codigoJovem);

    this.navCtrl.push(DetalheJovem, codigoJovem).then(
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

  addJovem() {
    this.navCtrl.push(NovoJovem).then(
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
