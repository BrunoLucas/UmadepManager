import { Component } from '@angular/core';
import { NavController, NavParams, LoadingController, ModalController, Modal, ToastController } from 'ionic-angular';
import {

  FormControl, FormArray, FormBuilder, FormGroup, Validators
} from '@angular/forms';
import { EventoProvider } from '../../providers/evento/evento-provider';
//import {Constant} from '../../providers/config/config.ts';
import { Dashboard } from '../dashboard/dashboard';
import { Evento } from '../evento/evento';
import { Fire } from '../../util/fire';
import { ModalNovaTarefa } from '../modal-nova-tarefa/modal-nova-tarefa';
import { ModalNovaLocalizacao } from '../modal-nova-localizacao/modal-nova-localizacao';
import { Toast } from "@ionic-native/toast";
import { Camera } from "@ionic-native/camera"
import { ModalPhoto } from '../modal-photo/modal-photo';

@Component({
  templateUrl: 'edicao-convidado.html'


})
export class EdicaoConvidado {

  codigo: any;
  convidadoModel: {
    nome?: string,
    telefone?: any,
    email?: string,
    congregacao?: string,
    rua?: string,
    cidade?: string,
    estado?: string,
    pais?: string,
    latitude?: any,
    longitude?: any
  } = {};

  tarefas: any = [];
  public base64Image: string;
  base64ImageTela: string;

  constructor(public navCtrl: NavController,
    public navParams: NavParams,
    public loadingController: LoadingController,
    public firebase: Fire,
    public modalController: ModalController,
    public toastCtrl: ToastController,
    public toast: Toast,
    public camera: Camera) {

    this.convidadoModel = this.navParams.data;
    console.log('aqui edicao convidado');

  }

  ngOnInit() {
    console.log('ngOnInit'); let loading = this.loadingController.create({
      content: "Aguarde"
    });



    loading.present();

    //   this.firebase.obterConvidado(this.codigo, (res)=>{
    //     console.log('dados: ' + res);
    //     this.convidadoModel = res;
    //     this.convidadoModel['codigo'] = this.codigo;
    //     loading.dismiss();
    //   });
    loading.dismiss();
  }

  presentToast() {
    let toast = this.toastCtrl.create({
      message: 'Convidado salvo com sucesso.',
      duration: 3000
    });
    toast.present();
  }


  showToast(message, position) {
    this.toast.show(message, "short", position).subscribe(
      toast => {
        console.log(toast);
      }
    );
  }

  salvarConvidado() {

    if (this.base64Image != undefined && this.base64Image != null) {
      this.salvarConvidadoComNovaImagem();
    }
    else {
      this.salvarConvidadoComMesmaImagem();
    }
  }


  salvarConvidadoComNovaImagem() {


    let loading = this.loadingController.create({
      content: "Salvando..."
    });

    let toast = this.toastCtrl.create({
      message: 'Convidado salvo',
      duration: 3000,
      position: 'bottom'
    });

    loading.present();


    let imagemBlob = this.converterBase64ParaBlob(this.base64Image, 'image/jpg');

    this.firebase.uploadToFirebase(imagemBlob).then(
      (res1: any) => {
        console.log('upload do arquivo realizado com sucesso ' + res1.downloadURL);

        this.convidadoModel['foto'] = res1.downloadURL;
        this.firebase.editConvidado(this.convidadoModel).then((res) => {
          console.log('Resultado de edit convidado' + res);
          loading.dismiss().then((res) => {
            this.showToast('Convidado salvo', 'bottom');
            this.navCtrl.pop();
            this.presentToast();
          });

        }, (err) => {
          console.log('Erro Resultado de edit convidado' + err);
          setTimeout(() => {
            console.log('Dismiss...');
            loading.dismiss();
          });
        }
        );

        console.log('Convidado salvo: ' + this.convidadoModel);

        this.firebase.salvarImagem(res1, (res) => {

          console.log('objeto: ' + this.convidadoModel);

          setTimeout(() => {
            loading.dismiss();
            //toast.present();
          });
          this.navCtrl.pop();
          // this.navCtrl.push(Evento);
        }).catch(exception => {
          console.log('erro exception ' + exception);
          setTimeout(() => {
            loading.dismiss();
          });
        });

        setTimeout(() => {
          console.log('Dismiss...');
          loading.dismiss();
          this.navCtrl.pop();
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
  salvarConvidadoComMesmaImagem() {

    let loading = this.loadingController.create({
      content: "Salvando..."
    });

    let toast = this.toastCtrl.create({
      message: 'Convidado salvo',
      duration: 3000,
      position: 'bottom'
    });

    loading.present();

    this.firebase.editConvidado(this.convidadoModel).then((res) => {

      console.log('Resultado de edit convidado' + res)
      setTimeout(() => {
        console.log('dismiss...');
        loading.dismiss().then((res) => {
          this.showToast('Convidado salvo', 'bottom');
          this.navCtrl.pop();
          this.presentToast();
        });
      });

    }, (err) => {
      console.log('Erro Resultado de edit convidado' + err);
      setTimeout(() => {
        console.log('dismiss...');
        loading.dismiss();
      });
    });

    console.log('Convidado salvo: ' + this.convidadoModel);

    console.log('objeto: ' + this.convidadoModel);

    setTimeout(() => {
      loading.dismiss();
      this.navCtrl.pop();

      //toast.present();
    });
    // this.navCtrl.push(Evento);


  }
  addLocalizacao() {
    let modal = this.modalController.create(ModalNovaLocalizacao, { 'loading': this.loadingController });

    modal.onDidDismiss(data => {
      console.log(data);
      this.convidadoModel.rua = data.rua;
      this.convidadoModel.cidade = data.cidade;
      this.convidadoModel.estado = data.estado;
      this.convidadoModel.pais = data.pais
      this.convidadoModel.latitude = data.latitude;
      this.convidadoModel.longitude = data.longitude;
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
    });;
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
      this.base64ImageTela = "data:image/jpeg;base64," + imageData;
      this.base64Image = imageData;
    }, (err) => {
      console.log('Erro ao tirar foto ' + err);
    }).catch(exception => {
      console.log('Erro: ' + exception);
      alert('Erro ao tirar foto');
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

  abrirModalOpcaoFoto() {
    let modal = this.modalController.create(ModalPhoto, { 'loading': this.loadingController });


    modal.onDidDismiss(data => {
      // console.log(data);
      this.base64ImageTela = "data:image/jpeg;base64," + data;
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
    });;

  }



}
