import { Component } from '@angular/core';
import { NavController, NavParams, LoadingController, ModalController ,
   Modal, ToastController, AlertController } from 'ionic-angular';
import { 
  FormControl, FormArray, FormBuilder, FormGroup, Validators} from '@angular/forms';
import {EventoProvider} from '../../providers/evento/evento-provider';
import {Dashboard} from '../dashboard/dashboard';
import {Evento} from '../evento/evento';
import {Fire} from '../../util/fire';
import {ModalNovaTarefa} from '../modal-nova-tarefa/modal-nova-tarefa';
import {DetalheTarefa} from '../detalhe-tarefa/detalhe-tarefa';

@Component({
  templateUrl: 'detalhe-evento.html'


})
export class DetalheEvento {

  codigo: any;
  evento = {codigo: '', 
    nome: '', 
    descricao: '',
    data: null};
  tarefas: any = []; 
  constructor(public navCtrl: NavController, public navParams: NavParams, 
   public loadingController: LoadingController, public firebase: Fire,  
   public modalController: ModalController, public toastController: ToastController,
    public alertController: AlertController)  {
    this.codigo = this.navParams.data;
    console.log('aqui detalhe evento');

  }

 ngOnInit() {
   console.log('ngOnInit'); let loading = this.loadingController.create({
        content : 'Aguarde'
    });

    loading.present();
      
      this.firebase.obterEvento(this.codigo, (res) => {
        console.log('dados: ' + res);
        this.evento = res;
        this.evento['codigo'] = this.codigo;
       this.firebase.obterTarefasDoEvento(this.codigo, (resTarefas) =>{
                this.tarefas.push(resTarefas);
       });
        loading.dismiss();
      });

 }

   addTarefas() {   
      let modal = this.modalController.create(ModalNovaTarefa, 
      {'evento' : this.evento,
       'firebase': this.firebase,
        'loading' : this.loadingController,
        'modalController' : this.modalController,
        'alertController' : this.alertController,
        'toastController' : this.toastController
      });
      
      modal.present().then(
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

  detalheTarefa(codigoTarefa: number) {
    console.log('codigo de tarefa: ' + codigoTarefa);

    this.navCtrl.push(DetalheTarefa, codigoTarefa).then(
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
