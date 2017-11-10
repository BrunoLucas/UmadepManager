import { Component } from '@angular/core';
import { NavController, NavParams, LoadingController, ModalController , Modal, ToastController } from 'ionic-angular';
import {EventoProvider} from '../../providers/evento/evento-provider';
// import {Constant} from '../../providers/config/config.ts';
import {Dashboard} from '../dashboard/dashboard';
import {Jovem} from '../jovem/jovem';
import {Fire} from '../../util/fire';
import {ModalNovaTarefa} from '../modal-nova-tarefa/modal-nova-tarefa';

@Component({
  templateUrl: 'detalhe-jovem.html'
})
export class DetalheJovem {

  codigo: any;
  jovemModel: { 
    nome?: string,
    telefone?: any,
    email?: any,
    congregacao?:any 

  } = {};

  tarefas: any = []; 
  constructor(public navCtrl: NavController, public navParams: NavParams, 
   public loadingController: LoadingController, public firebase: Fire,  
   public modalController: ModalController, public toastCtrl: ToastController)  {
    this.jovemModel.congregacao = {};
    this.codigo = this.navParams.data;
    console.log('aqui detalhe evento');

  }

 ngOnInit() {
   console.log('ngOnInit'); let loading = this.loadingController.create({
        content : 'Aguarde' 
    });

    loading.present();
      
      this.firebase.obterJovem(this.codigo, (res)=> {
        console.log('dados: ' + res);
        this.jovemModel = res;
        this.jovemModel['codigo'] = this.codigo;
        this.firebase.obterCongregacao(this.jovemModel.congregacao, (congregacao)=> {
                this.jovemModel.congregacao = congregacao;
       });
        loading.dismiss();
      });

 }

}
