import { Component } from '@angular/core';
import { NavController, NavParams, LoadingController, ModalController , Modal, ToastController } from 'ionic-angular';
import { 
  FormControl, FormArray, FormBuilder, FormGroup, Validators} from '@angular/forms';
import {EventoProvider} from '../../providers/evento/evento-provider';
import {Dashboard} from '../dashboard/dashboard';
import {Evento} from '../evento/evento';
import {Fire} from '../../util/fire';
import {ModalNovaTarefa} from '../modal-nova-tarefa/modal-nova-tarefa';
import {EdicaoConvidado} from '../edicao-convidado/edicao-convidado';

@Component({
  templateUrl: 'detalhe-convidado.html'


})
export class DetalheConvidado {

  codigo: any;
  convidadoModel: { 
    nome?: string,
    telefone?: any,
    email?: string,
    congregacao?: string;

  } = {};

  tarefas: any = []; 
  constructor(public navCtrl: NavController, public navParams: NavParams, 
   public loadingController: LoadingController, public firebase: Fire,  
   public modalController: ModalController, public toastCtrl: ToastController)  {
   
    this.codigo = this.navParams.data;
    console.log('aqui detalhe evento');

  }

 ngOnInit() {
   console.log('ngOnInit'); let loading = this.loadingController.create({
        content : 'Aguarde'
    });

    loading.present();
      
      this.firebase.obterConvidado(this.codigo, (res) => {   
        console.log('dados: ' + res);
        this.convidadoModel = res;
        this.convidadoModel['codigo'] = this.codigo;
        loading.dismiss();
      });

 }


editarConvidado() {
 
    this.navCtrl.push(EdicaoConvidado, this.convidadoModel).then(
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
