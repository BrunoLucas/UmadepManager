import { Component } from '@angular/core';
import { NavController, NavParams, LoadingController, ToastController, ModalController } from 'ionic-angular';
import { 
  FormControl, FormArray, FormBuilder, FormGroup, Validators} from '@angular/forms';
import {CongregacaoProvider} from '../../providers/congregacao/congregacao-provider';
import {DetalheCongregacao}  from '../detalhe-congregacao/detalhe-congregacao'
import {Fire} from '../../util/fire';
import { Toast} from "@ionic-native/toast";
import {Camera} from "@ionic-native/camera";
import {ModalNovaLocalizacao} from '../modal-nova-localizacao/modal-nova-localizacao';
import { ModalPhoto} from '../modal-photo/modal-photo';

declare var resultado: any;
@Component({
  templateUrl: 'novo-jovem.html'

})
export class NovoJovem {

  selectedItem: any;
  icons: string[];
  items: Array<{ title: string, note: string, icon: string }>;
  congregacoes: any = [];
  public base64Image: string;
  base64ImageTela: string;

  jovemModel: {
    nome?: string,
    congregacao?: any,
    telefone?: any,
    email?: any,
    nascimento?:any,
    local?: any,
    musico?: any,
    endereco?: any

  } = {};


  submitted = false;

  constructor(public navCtrl: NavController, navParams: NavParams,
    public loadingController: LoadingController,
    private firebase: Fire, public toastCtrl: ToastController,
    public modalController : ModalController,
     public toast: Toast,
    public camera: Camera) {

    this.selectedItem = navParams.get('item');
    this.icons = ['flask', 'wifi', 'beer', 'football', 'basketball', 'paper-plane',
      'american-football', 'boat', 'bluetooth', 'build'];

    this.items = [];
    this.jovemModel.endereco = {};


  }

  ngOnInit() {
    let loading = this.loadingController.create({
      content: "Aguarde"
    });
    //loading.present();
    this.firebase.getCongregacoes(items => {
      this.congregacoes.push(items);
      // loading.dismiss();
      //loading.dismiss();
    });
  }

  presentToast() {
    let toast = this.toastCtrl.create({
      message: 'Jovem cadastrado com sucesso.',
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


  salvarJovem() {
    let loading = this.loadingController.create({
      content: "Aguarde"
    });
    loading.present();

    let imagemBlob = this.converterBase64ParaBlob(this.base64Image, 'image/jpg');

    this.firebase.uploadToFirebase(imagemBlob).then(
      (res1 :any) => {
	      	console.log('upload do arquivo realizado com sucesso '+ res1.downloadURL);
          this.jovemModel['foto'] = res1.downloadURL;
          this.submitted = true;

          this.firebase.saveJovem(this.jovemModel).then((res)=>{

                        console.log('Resultado ' + res);
                        loading.dismiss().then((res) =>{
                            this.showToast('Jovem salvo', 'bottom');
                            this.navCtrl.pop();
                            this.presentToast();
                        });
          });
          // this.firebase.saveJovem(this.jovemModel, (res) => {
          //   console.log('Resultado ' + res);
          //   loading.dismiss().then((res) =>{
          //     this.showToast('Jovem salvo', 'bottom');
          //     this.navCtrl.pop();
          //     this.presentToast();
          // });

          // });
      //    loading.dismiss();
          //this.presentToast();

        this.firebase.salvarImagem(res1, (res) => {

          console.log('objeto ao salvarImagem: ' + this.jovemModel);
          this.submitted = true;
 
         // this.navCtrl.pop();
          // this.navCtrl.push(Evento);
        }).catch(exception =>{
          console.log('erro exception '+ exception);
        });

      },
      err => {
        alert('Erro ao fazer upload da imagem.');
        console.log('Erro ' + err);
        loading.dismiss();
      }
    );

  //loading.dismiss();

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

 abrirModalOpcaoFoto(){
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

   addLocalizacao(){   
      let modal = this.modalController.create(ModalNovaLocalizacao, {  'loading' : this.loadingController});
      
      modal.onDidDismiss(data => {
            console.log(data);
            this.jovemModel.endereco.rua = data.rua;
            this.jovemModel.endereco.cidade = data.cidade;
            this.jovemModel.endereco.estado = data.estado;
            this.jovemModel.endereco.pais = data.pais
            this.jovemModel.endereco.latitude = data.latitude;
            this.jovemModel.endereco.longitude = data.longitude;
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
