import { Component } from '@angular/core';
import { NavController, NavParams, LoadingController, ModalController , Modal, ToastController} from 'ionic-angular';
import {FormControl, FormArray, FormBuilder, FormGroup, Validators} from '@angular/forms';
import {EventoProvider} from '../../providers/evento/evento-provider';
import {TarefaProvider} from '../../providers/tarefa/tarefa-provider';
import {DetalheEvento}  from '../detalhe-evento/detalhe-evento';
import {ModalNovaTarefa} from '../modal-nova-tarefa/modal-nova-tarefa';
import {Camera} from '@ionic-native/camera';
import {Fire} from '../../util/fire';
import {Evento} from '../evento/evento';
import {ModalNovaLocalizacao} from '../modal-nova-localizacao/modal-nova-localizacao';
import { ModalPhoto} from '../modal-photo/modal-photo';

@Component({
  templateUrl: 'novo-evento.html'
})
export class NovoEvento {

  eventoForm = new FormGroup({
    nome : new FormControl()
  });
  eventoModel: { 
    nome?: string, 
    data?: any, 
    horario?: any, 
    descricao?: string, 
    administrador?: any, 
    endereco?: any } = {};

  submitted = false;
  listaDeTarefas  = [];
  public base64Image: string;
  base64ImageTela: string;

  constructor(public navCtrl: NavController, navParams: NavParams, private firebase: Fire,
   public loadingController: LoadingController,  public modalController: ModalController, public toastCtrl: ToastController,
    public camera: Camera) {

      this.navCtrl = navCtrl;
      this.eventoModel.endereco = {};
      this.toastCtrl = toastCtrl;
      this.camera = camera;
  }
  ngOnInit() {
    
  }

   presentToast() {
    let toast = this.toastCtrl.create({
      message: 'Evento adicionado com sucesso.',
      duration: 3000
    });
    toast.present();
  }

  salvarEvento(eventoModel) {
    
    let loading = this.loadingController.create({
      content: 'Aguarde'
    });
    loading.present();
    let imagemBlob = this.converterBase64ParaBlob(this.base64Image, 'image/jpg');



    this.firebase.uploadToFirebase(imagemBlob).then(
      (res1: any) => {
          
        console.log('upload do arquivo realizado com sucesso ' + res1.downloadURL);
          this.eventoModel['foto'] = res1.downloadURL;
          this.submitted = true;
          this.firebase.saveEvento(this.eventoModel).then( (res) => {
                console.log('Resultado ' + res);                
                loading.dismiss().then((res) => {
                    this.navCtrl.pop();
                    this.presentToast();
                });
                console.log('Evento salvo: ' + this.eventoModel);
        });

        this.firebase.salvarImagem(res1, (res) => {

          console.log('objeto ao salvarImagem: ' + this.eventoModel);
          this.submitted = true;

 
        }).catch(exception => {
          console.log('erro exception ' + exception);
        });
       


      },
      err => {
        alert('Erro ao fazer upload da imagem.');
        console.log('Erro ' + err);
        loading.dismiss();
      }
      
    );

  }


  addTarefas() {
     
      let modal = this.modalController.create(ModalNovaTarefa);
      modal.present();

  }
 

  takePicture() {
    this.camera.getPicture({
      destinationType: this.camera.DestinationType.DATA_URL,
      targetWidth: 256,
      targetHeight: 256,
      saveToPhotoAlbum : true,
      correctOrientation: true
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
      let modal = this.modalController.create(ModalNovaLocalizacao, {  'loading' : this.loadingController});
      
      modal.onDidDismiss(data => {
            console.log(data);
            this.eventoModel.endereco.rua = data.rua;
            this.eventoModel.endereco.cidade = data.cidade;
            this.eventoModel.endereco.estado = data.estado;
            this.eventoModel.endereco.pais = data.pais;
            this.eventoModel.endereco.latitude = data.latitude;
            this.eventoModel.endereco.longitude = data.longitude;
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

} 