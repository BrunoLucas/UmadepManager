import { Component, ViewChild, ElementRef } from '@angular/core';
import { NavController, NavParams, LoadingController, ModalController, Modal, ToastController, ViewController } from 'ionic-angular';
import {
   
  FormControl, FormArray, FormBuilder, FormGroup, Validators
} from '@angular/forms';
import {Toast} from '@ionic-native/toast';
import {Camera} from '@ionic-native/camera';

@Component({
  templateUrl: 'modal-photo.html'
})

export class ModalPhoto {

 static get parameters() {
    return [[ViewController], [NavParams], [NavController], [LoadingController]];
  }

    @ViewChild('map') mapElement: ElementRef;

  public base64Image: string;
  base64ImageTela: string;

 

  constructor(public viewCtrl: ViewController, public navCtrl: NavController, navParams: NavParams,
    public loadingController: LoadingController,
    public toastCtrl: ToastController, public modalController: ModalController, public viewController: ViewController,
     public toast: Toast,
    private camera: Camera) {

  }
  
  ngOnInit() {
  }
  
  selecionarFotoGaleria() {
        this.camera. getPicture({
            sourceType: this.camera.PictureSourceType.SAVEDPHOTOALBUM,
            destinationType: this.camera.DestinationType.DATA_URL,
            mediaType: this.camera.MediaType.PICTURE
          }).then((imageData) => {
            this.base64ImageTela = 'data:image/jpeg;base64,' + imageData;
            this.base64Image = imageData;
            this.dismiss();

            }, (err) => {
            console.log(err);
          }).catch(exception => {
              console.error('Erro ao selecionar foto da galeria: ' + exception);
          });
        
  }

  selecionarFotoTirada() {

     this.camera.getPicture({
      destinationType: this.camera.DestinationType.DATA_URL,
      targetWidth: 256,
      targetHeight: 256,
      saveToPhotoAlbum: true
    }).then((imageData) => {
      // imageData is a base64 encoded string
      console.debug('Tirou foto ');
      this.base64ImageTela = 'data:image/jpeg;base64,' + imageData;
      this.base64Image = imageData;
       this.dismiss();
    }, (err) => {
      console.error('Erro ao tirar foto ' + err);
    }).catch(exception => {
      console.error('Erro: ' + exception);
    });

  }


  

   dismiss() {
   this.viewCtrl.dismiss(this.base64Image);
 }


}
