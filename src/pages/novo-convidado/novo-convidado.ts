import { Component } from '@angular/core';
import { NavController, NavParams, LoadingController, ModalController, Modal, ToastController, ViewController } from 'ionic-angular';
import {
   
  FormControl, FormArray, FormBuilder, FormGroup, Validators
} from '@angular/forms';
import { CongregacaoProvider } from '../../providers/congregacao/congregacao-provider';
import { DetalheCongregacao } from '../detalhe-congregacao/detalhe-congregacao';
import { Fire } from '../../util/fire';
import {Camera} from '@ionic-native/camera';
import { ModalNovaLocalizacao } from '../modal-nova-localizacao/modal-nova-localizacao';

import { ModalPhoto} from '../modal-photo/modal-photo';


declare var resultado: any;
@Component({
  templateUrl: 'novo-convidado.html'

})
export class NovoConvidado {

  selectedItem: any;
  icons: string[];
  items: Array<{ title: string, note: string, icon: string }>;
  congregacoes: any = [];
  public base64Image: string;
  base64ImageTela: string;

  convidadoModel: {
    nome?: string,
    congregacao?: any,
    telefone?: any,
    email?: any,
    endereco?: any

  } = {};

  localizacao: {
    rua?: string,
    cidade?: string,
    estado?: string,
    pais?: string,
    cep?: any,
    longitude?: any,
    latitude?: any
  } = {};

  submitted = false;

  constructor(public navCtrl: NavController, navParams: NavParams,
    public loadingController: LoadingController,
     private firebase: Fire, 
     public toastCtrl: ToastController,
     public modalController: ModalController,
     public viewController: ViewController,
    public camera: Camera) {

    this.selectedItem = navParams.get('item');
    this.icons = ['flask', 'wifi', 'beer', 'football', 'basketball', 'paper-plane',
      'american-football', 'boat', 'bluetooth', 'build'];
    this.convidadoModel.endereco = {};
    this.items = [];


  }

  ngOnInit() {
    let loading = this.loadingController.create({
      content: 'Aguarde'
    });
    this.firebase.getCongregacoes(items => {
      this.congregacoes.push(items);
    });


  }
   presentToast() {
    let toast = this.toastCtrl.create({
      message: 'Convidado adicionado com sucesso.',
      duration: 3000
    });
    toast.present();
  }
  salvarConvidado() {
    let loading = this.loadingController.create({
      content: 'Aguarde'
    });

    let toast = this.toastCtrl.create({
          message: 'Convidado adicionado',
          duration: 3000,
          position: 'top'
        });

    loading.present();

    let imagemBlob = this.converterBase64ParaBlob(this.base64Image, 'image/jpg');

    this.firebase.uploadToFirebase(imagemBlob).then(
      (res1: any) => {
        console.log('upload do arquivo realizado com sucesso ' + res1.downloadURL);

        this.convidadoModel['foto'] = res1.downloadURL;
        this.submitted = true;
        this.firebase.saveConvidado(this.convidadoModel).then((res) => {
                console.log('Resultado ' + res);
                loading.dismiss().then((res) => {
                    this.navCtrl.pop();
                    this.presentToast();
                });
                console.log('Convidado salvo: ' + this.convidadoModel);
      });


        this.firebase.salvarImagem(res1, (res) => {

          console.log('objeto: ' + this.convidadoModel);
          this.submitted = true;
          // this.navCtrl.push(Evento);
        }).catch(exception => {
          console.log('erro exception ' + exception);
          setTimeout(() => {
              loading.dismiss();
          });
        });

      },
      err => {
        alert('Erro ao fazer upload da imagem.');
        console.log('Erro ' + err);
        setTimeout(() => {
          loading.dismiss();
        });
      }
    );
  }

  detalheCongregacao(codigoCongregacao: number) {
    console.log('codigo: ' + codigoCongregacao);

    this.navCtrl.push(DetalheCongregacao, codigoCongregacao).then(
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



  takePicture() {
    this.camera.getPicture({
      destinationType: this.camera.DestinationType.DATA_URL,
      targetWidth: 256,
      targetHeight: 256,
      saveToPhotoAlbum: true
    }).then((imageData) => {
      // imageData is a base64 encoded string
      console.log('Tirou foto ');
      this.base64ImageTela = 'data:image/jpeg;base64,' + imageData;
      this.base64Image = imageData;
    }, (err) => {
      console.log('Erro ao tirar foto ' + err);
    }).catch(exception => {
      console.log('Erro: ' + exception);
      alert('Erro ao tirar foto');
    });
  }

 abrirModalOpcaoFoto() {
       let modal = this.modalController.create(ModalPhoto, { 'loading': this.loadingController });


    modal.onDidDismiss(data => {
      // console.log(data);
      this.base64ImageTela = 'data:image/jpeg;base64,' + data;
      this.base64Image = data;
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



  converterBase64ParaBlob(b64Data, contentType) {
    let sliceSize = 512;
    contentType = contentType || '';
    sliceSize = sliceSize || 512;

    var byteCharacters = atob(b64Data);
    var byteArrays = [];

    for (var offset = 0; offset < byteCharacters.length; offset += sliceSize) {
      var slice = byteCharacters.slice(offset, offset + sliceSize);

      var byteNumbers = new Array(slice.length);
      for (var i = 0; i < slice.length; i++) {
        byteNumbers[i] = slice.charCodeAt(i);
      }

      var byteArray = new Uint8Array(byteNumbers);

      byteArrays.push(byteArray);
    }

    var blob = new Blob(byteArrays, { type: contentType });
    return blob;
  }


  addLocalizacao() {
    let modal = this.modalController.create(ModalNovaLocalizacao, { 'loading': this.loadingController });

    modal.onDidDismiss(data => {
      console.log(data);
      this.convidadoModel.endereco.rua = data.rua;
      this.convidadoModel.endereco.cidade = data.cidade;
      this.convidadoModel.endereco.estado = data.estado;
      this.convidadoModel.endereco.pais = data.pais;
      this.convidadoModel.endereco.latitude = data.latitude;
      this.convidadoModel.endereco.longitude = data.longitude;
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
}
