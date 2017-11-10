import { Component } from '@angular/core';
import { NavController, NavParams, LoadingController } from 'ionic-angular';
import { 
  FormControl, FormArray, FormBuilder, FormGroup, Validators} from '@angular/forms';
import {PessoaProvider} from '../../providers/pessoa/pessoa-provider';
//import {DetalhePessoa}  from '../detalhe-pessoa/detalhe-pessoa'

@Component({
  templateUrl: 'lider.html'
})
export class Lider {

  selectedItem: any;
  opcaoLiderModel = 'consultarLider';
  icons: string[];
  items: Array<{ title: string, note: string, icon: string }>;
  LiderForm = new FormGroup({
    nome: new FormControl()
  });
  liderModel: { nome?: string, localizacao?: string, data?: any, horario?: any, descricao?: string } = {};
  submitted = false;

  constructor(public navCtrl: NavController, navParams: NavParams,
    public loadingController: LoadingController) {
    // If we navigated to this page, we will have an item available as a nav param
    this.selectedItem = navParams.get('item');

    // Let's populate this page with some filler content for funzies
    this.icons = ['flask', 'wifi', 'beer', 'football', 'basketball', 'paper-plane',
      'american-football', 'boat', 'bluetooth', 'build'];

    this.items = [];


  }

  ngOnInit() {
    let loading = this.loadingController.create({
      content: "Aguarde"
    });
    loading.present();
    // this.pessoaProvider.findAllLideres().subscribe(
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
    this.navCtrl.push(Lider, {
      item: item
    });
  }
  alert1() {
    console.log('trocar de pag');
  }

  salvarLider(liderModel) {
    console.log('objeto: ' + this.liderModel);
    this.submitted = true;
    // this.eventoModel['administrador'] = new Object();
    // this.eventoModel.administrador['codigo'] = 1;
    this.liderModel.horario = null;
    this.liderModel.data = null;
    console.log('objeto: ' + liderModel);
    // this.pessoaProvider.savePessoa(this.liderModel).subscribe(
    //   (data) => {
    //     console.log('salvou: ' + data);
    //   },
    //   (err) => {
    //     console.log('error: ' + err);
    //   }
    // );
    // if (novoEventoForm.valid) {
    console.log('Evento: ' + this.liderModel);

    // }
  }
  detalheLider(codigoPessoa: number) {
    console.log('codigo: ' + codigoPessoa);

    // this.navCtrl.push(DetalhePessoa, codigoPessoa).then(
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
