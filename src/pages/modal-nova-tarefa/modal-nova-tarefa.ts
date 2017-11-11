import { Component } from '@angular/core';
import {
  NavController, NavParams, LoadingController, ViewController,
  ModalController, AlertController, ItemSliding, ToastController
} from 'ionic-angular';
import {
  FormControl, FormArray, FormBuilder, FormGroup, Validators
} from '@angular/forms';
import { TarefaProvider } from '../../providers/tarefa/tarefa-provider';
import { ModalNovoGasto } from '../modal-novo-gasto/modal-novo-gasto';
import { Toast } from '@ionic-native/toast';
import { Fire } from '../../util/fire';
import { JovemTarefa } from '../jovem-tarefa/jovem-tarefa';

@Component({
  templateUrl: 'modal-nova-tarefa.html'
})
export class ModalNovaTarefa {
  static get parameters() {
    return [[ViewController], [NavParams], [NavController], [Fire], [LoadingController], [AlertController]]; 
  }

  tarefaModel: { nome?: string, descricao?: string, id?: any } = {};
  codigo: any;
  submitted = false;
  view: any;
  indicadorJovensSelecionados: any;
  listaJovensSelecionados: any = [];

  constructor(view, params, public navCtrl: NavController, public navParams: NavParams, public TarefaProvider: TarefaProvider,
    public loadingController: LoadingController, public modalController: ModalController, public firebase: Fire,
    public alertController: AlertController, public toastController: ToastController,
    public toast: Toast) {
    this.navCtrl = navCtrl;
    this.firebase = params.data.firebase;
    this.loadingController = params.data.loading;
    this.modalController = params.data.modalController;
    this.codigo = params.data.evento.codigo;
    this.alertController = params.data.alertController;
    this.toastController = params.data.toastController;
    this.view = view;

    this.tarefaModel = params.get('parametro') || { nome: '' };
  }
  ngOnInit() {

    console.log('nova tarefa: ' + this.codigo);

  }

  presentToast() {
    let toast = this.toastController.create({
      message: 'Tarefa adicionada com sucesso.',
      duration: 3000
    });
    toast.present();
  }


  showToast(message, position) {
    this.toast.show(message, 'short', position).subscribe(
      toast => {
        console.log(toast);
      }
    );
  }
  cancel() {
    this.view.dismiss();
  }

  voltar() {
    this.navCtrl.pop();
  }

  salvarTarefa() {
    console.log('objeto ModalNovaTarefa.salvarTarefa : ' + this.tarefaModel);
    this.view.dismiss(this.tarefaModel);

    let loading = this.loadingController.create({
      content: 'Aguarde'
    });

    loading.present();

    this.submitted = true;
    this.tarefaModel['evento'] = this.codigo;
    this.firebase.saveTarefa(this.tarefaModel).then((res) => {
      console.log('Resultado  ModalNovaTarefa.salvarTarefa ' + res);
      // loading.dismiss();


      if (this.tarefaModel.id !== undefined && this.tarefaModel.id != null) {
        this.firebase.saveGrupoDeTarefa(this.tarefaModel, this.listaJovensSelecionados).then((res) => {
          console.log('Resultado ModalNovaTarefa.saveGrupoDeTarefa ' + res);
          loading.dismiss().then((res) => {
            this.showToast('Grupo-Tafera salva', 'bottom');
            this.voltar();
            this.navCtrl.pop().then((res) => {
              console.log('pop saveGrupoDeTarefa');
            }).catch((res) => {
              console.log('error pop saveGrupoDeTarefa');
            });
            this.presentToast();
          });

        });
      } else {

        loading.dismiss().then((res) => {
          this.showToast('Tarefa salva', 'bottom');
          this.navCtrl.pop();
          this.presentToast();
        });
      }

    });
    // loading.dismiss();
    // this.presentToast();
    // this.navCtrl.pop();
  }

  addJovem() {

    let modal = this.modalController.create(JovemTarefa, { 'loading': this.loadingController, 'firebase': this.firebase });

    modal.onDidDismiss(data => {
      console.log(data);
      this.indicadorJovensSelecionados = true;
      this.listaJovensSelecionados = [];
      // this.listaJovensSelecionados.forEach(function(temp){
      //       console.log('jovem: ' + temp.nome);
      // });
      for (let i = 0; i < data.length; i++) {
        console.log('Pegando valor retornado da consulta de jovens: ' + data[i].nome);
        this.listaJovensSelecionados.push(data[i]);
      }
      for (let i = 0; i < this.listaJovensSelecionados.length; i++) {
        console.log('Jovem  => ' + this.listaJovensSelecionados[i].nome);
      }

    });

    modal.present().then(
      response => {
        console.log('Response ModalNovaTarefa.addJovem ' + response);
      },
      error => {
        console.log('Error ModalNovaTarefa.addJovem : ' + error);
      }
    ).catch(exception => {
      console.log('Exception ModalNovaTarefa.addJovem : ' + exception);
    });
  }

  removeJovem(slidingItem: ItemSliding, jovem) {

    let alert = this.alertController.create({
      title: 'Remover jovem da tarefa',
      message: 'Você gostaria de remover o jovem da tarefa?',
      buttons: [
        {
          text: 'Cancelar',
          handler: () => {
            // they clicked the cancel button, do not remove the session
            // close the sliding item and hide the option buttons
            slidingItem.close();
          }
        },
        {
          text: 'Remover',
          handler: () => {
            // they want to remove this session from their favorites
            let indexJovemRemover = this.listaJovensSelecionados.indexOf(jovem);
            if (indexJovemRemover > -1) {
              this.listaJovensSelecionados.splice(indexJovemRemover, 1);
            }
            // close the sliding item and hide the option buttons
            slidingItem.close();
          }
        }
      ]
    });
    // now present the alert on top of all other content
    alert.present();
  }

}

