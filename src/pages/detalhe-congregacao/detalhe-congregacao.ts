import { Component } from '@angular/core';
import { NavController, NavParams, LoadingController } from 'ionic-angular';
import { 
  FormControl, FormArray, FormBuilder, FormGroup, Validators} from '@angular/forms';
import {CongregacaoProvider} from '../../providers/congregacao/congregacao-provider';
// import {Constant} from '../../providers/config/config.ts';
import {Dashboard} from '../dashboard/dashboard';
import {Congregacao} from '../congregacao/congregacao';
import {Fire} from '../../util/fire';
@Component({
  templateUrl: 'detalhe-congregacao.html'


})
export class DetalheCongregacao {

  codigo: any;
  congregacaoModel: { 
    nome?: string, 
    localizacao?: string,
    descricao?: string,

    primeiroPastorModel?: {
    nome?: string,
    telefone?: any,
    email?: any
    } ,
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

  constructor(public navCtrl: NavController, public navParams: NavParams,
   public firebase: Fire, public loadingController: LoadingController)  {

    this.codigo = this.navParams.data;
    console.log('aqui detalhe congregacao');
    

  }

 ngOnInit() {
     console.log('ngOnInit'); let loading = this.loadingController.create({
        content : 'Aguarde'
    });

    loading.present();
      
      this.firebase.obterCongregacao(this.codigo, (res) => {
        console.log('dados: ' + res);
        this.congregacaoModel = res;
        this.congregacaoModel['codigo'] = this.codigo;
        
        loading.dismiss();
      });


 }
}
