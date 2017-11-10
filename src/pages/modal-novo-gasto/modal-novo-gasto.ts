import { Component } from '@angular/core';
import { NavController, NavParams, LoadingController, ViewController } from 'ionic-angular';
import { 
  FormControl, FormArray, FormBuilder, FormGroup, Validators} from '@angular/forms';
import {TarefaProvider} from '../../providers/tarefa/tarefa-provider';

@Component({
 templateUrl: 'modal-novo-gasto.html'

})
export class ModalNovoGasto {
 static get parameters() {
    return [[ViewController], [NavParams]]
  }

  gastoModel: { descricao?: string, valor ?: any} = {};
  submitted = false;
  view : any;
  constructor(view, params, public navCtrl: NavController, navParams: NavParams, public TarefaProvider: TarefaProvider,
   public loadingController: LoadingController) {
 
    this.view = view;

    this.gastoModel = params.get("parametro") || {descricao: ""};
  }
  ngOnInit() {

  }

 cancel() {
    this.view.dismiss();
  }


  salvarGasto(gastoModel) {
    console.log('objeto: ' + this.gastoModel);
      this.view.dismiss(this.gastoModel);
  }
} 