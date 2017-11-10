import { Component } from '@angular/core';
import { NavController, NavParams, LoadingController, ModalController ,
   Modal, ToastController, AlertController } from 'ionic-angular';
import { 
  FormControl,FormArray, FormBuilder,FormGroup, Validators} from '@angular/forms';
import {EventoProvider} from '../../providers/evento/evento-provider';
//import {Constant} from '../../providers/config/config.ts';
import {Dashboard} from '../dashboard/dashboard';
import {Evento} from '../evento/evento';
import {Fire} from '../../util/fire';
import {ModalNovaTarefa} from '../modal-nova-tarefa/modal-nova-tarefa';
import {DetalheJovem} from '../detalhe-jovem/detalhe-jovem';


@Component({
  templateUrl: 'detalhe-tarefa.html'


})
export class DetalheTarefa {

  codigo : any;
  tarefaModel : {
    codigo?: any, 
    nome?: any, 
    descricao?: string,
    grupo?: any
  } = {};

  jovemModel: { 
    nome?: string,
    telefone?: any,
    email?: any,
    congregacao?:any

  } = {};

 listaJovensTarefa : any;

  constructor(public navCtrl: NavController, public navParams: NavParams, 
   public loadingController: LoadingController, public firebase: Fire,  
   public modalController : ModalController, public toastController: ToastController,
    public alertController: AlertController)  {
    this.codigo = this.navParams.data;
    console.log('aqui detalhe tarefa');
    
  }

 ngOnInit(){
   console.log('ngOnInit');let loading = this.loadingController.create({
        content : "Aguarde"
    });

    loading.present();
      
      this.firebase.obterTarefa(this.codigo, (res)=>{
        console.log('dados: ' + res);
        this.tarefaModel = res;
        this.tarefaModel.codigo = this.codigo;
       this.firebase.obterGrupo(this.tarefaModel.grupo, (resGrupo) =>{
                this.tarefaModel.grupo = resGrupo ;
                this.listaJovensTarefa = [];

                var array = Object.keys(resGrupo.participantes).map(function(value, index) {
                    return value;
                }); 
                this.tarefaModel.grupo.participantes = array;

                for(let i = 0; i < this.tarefaModel.grupo.participantes.length; i++){

                    this.firebase.obterJovem(this.tarefaModel.grupo.participantes[i], (res) =>{
                            this.listaJovensTarefa.push(res);
                    });
                }

       });
        loading.dismiss();
      });

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


}
