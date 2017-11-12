import { Component } from '@angular/core';
import { NavController, NavParams, LoadingController, ToastController, ViewController } from 'ionic-angular';
import { 
  FormControl, FormArray, FormBuilder, FormGroup, Validators} from '@angular/forms';
import {CongregacaoProvider} from '../../providers/congregacao/congregacao-provider';
import {DetalheJovem}  from '../detalhe-jovem/detalhe-jovem';
import {Fire} from '../../util/fire';
import {Toast} from '@ionic-native/toast';
import {NovoJovem} from '../novo-jovem/novo-jovem';

@Component({
  templateUrl: 'jovem-tarefa.html'

})
export class JovemTarefa {

  static get parameters() {
    return [[ViewController], [NavParams], [NavController], [Fire], [LoadingController]]; 
  }
  selectedItem: any;
  icons: string[];
  items: Array<{ title: string, note: string, icon: string }>;

  congregacoes: any = [];
  jovemModel: {
    nome?: string,
    telefone?: any,
    email?: any,
    congregacao?: any,
    sexo?: any,
    selecionado?: any

  } = {};
  sexo: any;

  listaDeJovens: any = [];

  listaJovensSelecionados: any = [];
  submitted = false;

  constructor(public viewCtrl: ViewController, params , public navCtrl: NavController, navParams: NavParams,
    public loadingController: LoadingController,
    private firebase: Fire, public toastCtrl: ToastController) {
     this.firebase = params.data.firebase;

    this.icons = ['flask', 'wifi', 'beer', 'football', 'basketball', 'paper-plane',
      'american-football', 'boat', 'bluetooth', 'build'];

    this.items = [];


  }

  ngOnInit() {
    console.log('ngOnInit'); 
    // let loading = this.loadingController.create({
    //   content: 'Aguarde'
    // });
    // loading.present();

    this.firebase.getCongregacoes(items => {
      this.congregacoes = [];
      this.congregacoes.push(items);
      // loading.dismiss();
      // setTimeout(() => {
      //   loading.dismiss();
      // });
    });

    // if (this.listaDeJovens == undefined || this.listaDeJovens.length == 0) {
    //   setTimeout(() => {
    //     loading.dismiss();
    //   });
    // }
  }

 dismiss() {
   console.log('dismiss jovem-tarefa');
   this.viewCtrl.dismiss(this.listaJovensSelecionados);
 }

  consultarJovem() {

    console.log('Jovem: ' + this.jovemModel);
    console.log('ngOnInit'); let loading = this.loadingController.create({
      content: 'Aguarde'
    });

this.listaDeJovens = [];
    this.firebase.consultarJovensParaTarefas(this.jovemModel, (res) => {
     // this.firebase.getJovens( (res) =>{
      console.log('dados: ' + res);

      // TODO depois verificar se esta ativo
      
      let listaJovensNome = [];
      this.listaDeJovens.push(res);
      setTimeout(() => {
        console.log('dismiss do controller loading jovem-tarefa.consultarJovem()');
      });
    });

    if (this.listaDeJovens === undefined || this.listaDeJovens.length === 0) {
      setTimeout(() => {
        console.log('dismiss do controller loading jovem-tarefa.consultarJovem()');
       // loading.dismiss();
      });
    }


  }

  adicionarListaJovens() {

          this.listaJovensSelecionados = [];
          for (let jovem of this.listaDeJovens) {

                if (jovem.selecionado === true) {

                      console.log('Jovem selecionado: ' + jovem.nome);
                      this.listaJovensSelecionados.push(jovem);
                }
          }
          this.dismiss();
  }

  garantirVazio(objeto) {
    if (objeto === undefined) {
      return '';
    }
    return objeto;
  }
}
