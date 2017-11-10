import { Component, ViewChild, ElementRef } from '@angular/core';
import { NavController, NavParams, LoadingController, ViewController,  ModalController} from 'ionic-angular';
import { 
  FormControl, FormArray, FormBuilder, FormGroup, Validators} from '@angular/forms';
import {TarefaProvider} from '../../providers/tarefa/tarefa-provider';
import {Toast} from "@ionic-native/toast";
import {Geolocation} from "@ionic-native/geolocation";
import {Fire} from '../../util/fire';

declare var google;

@Component({
  templateUrl: 'modal-nova-localizacao.html'
})

export class ModalNovaLocalizacao {
  static get parameters() {
    return [[ViewController], [NavParams], [NavController], [LoadingController]]
  }


  @ViewChild('map') mapElement: ElementRef;
  //@ViewChild('endereco') any : ElementRef;
  map: any;
  enderecoBuscado: string;
  convidadoModel: {
    nome?: string,
    congregacao?: any,
    telefone?: any,
    email?: any

  } = {};
  codigo: any;
  submitted = false;
  view: any;
  marker: any = {};

localizacao:{
    rua?: string,
    cidade?: string,
    estado?: string,
    pais?: string,
    cep?: any,
    longitude?: any,
    latitude?: any
  } = {};

  constructor( public viewCtrl: ViewController, public navParams: NavParams,  public navCtrl: NavController, params, 
     public loadingController: LoadingController, public geolocation: Geolocation) {
    this.navCtrl = navCtrl;
    //this.firebase = params.data.firebase;
    //this.loadingController = params.data.loading;
    //this.viewCtrl = params.data.viewCtrl;
    // this.view = view;
    this.enderecoBuscado = "";
    this.marker = new google.maps.Marker({
      map: this.map,
      animation: google.maps.Animation.DROP,
      draggable: true

    });
    //this.localizacao = {};
  }

  ionViewLoaded() {
    this.loadMap();
  }

  loadMap() {

    this.geolocation.getCurrentPosition().then((position) => {
      //var searchBox = new google.maps.places.SearchBox(this.enderecoBuscado);
      let latLng = new google.maps.LatLng(position.coords.latitude, position.coords.longitude);

      let mapOptions = {
        style: google.maps.MapTypeControlStyle.DROPDOWN_MENU,
        center: latLng,
        zoom: 15,
        mapTypeId: google.maps.MapTypeId.ROADMAP,
        mapTypeControlOptions: {
        mapTypeIds: [google.maps.MapTypeId.ROADMAP, google.maps.MapTypeId.HYBRID],
        position : google.maps.ControlPosition.BOTTOM_CENTER
      },
        panControl : false,
        panControlOptions: {position : google.maps.ControlPosition.BOTTOM_CENTER}
      }

      this.map = new google.maps.Map(this.mapElement.nativeElement, mapOptions);

      let input_to = (<HTMLInputElement>document.getElementById("enderecoBuscado"));
      let options = {
        types: ['address'],
        componentRestrictions: { country: "br" }
      };
      let autocomplete2 = new google.maps.places.Autocomplete(input_to, options);
      // we need to save a reference to this as we lose it in the callbacks
      let self = this;

      this.map.controls[google.maps.ControlPosition.TOP_LEFT].push(input_to);
      // add the first listener
        google.maps.event.addListener(autocomplete2, "place_changed", () =>{

              let place = autocomplete2.getPlace();
              let geometry = place.geometry;
              let localizacaoRetornada :{
                      rua?: string,
                      cidade?: string,
                      estado?: string,
                      pais?: string,
                      cep?: any,
                      longitude?: any,
                      latitude?: any
                    } = {};

              if ((geometry) !== undefined) {

                  console.log('Place name : ' + place.name);
                  console.log('longitude: ' + geometry.location.lng());
                  console.log('Latitude: ' + geometry.location.lat());
                
                if(place.types[0] == 'route'){
                  // "locality", "country", "route"
                  localizacaoRetornada.rua = place.address_components[0].long_name;
                  localizacaoRetornada.cidade = place.address_components[2].long_name;
                  localizacaoRetornada.estado = place.address_components[3].long_name;
                  localizacaoRetornada.pais = place.address_components[4].long_name;
                  // localizacao.cep = place.address_components[6].long_name;
                  localizacaoRetornada.longitude = geometry.location.lng();
                  localizacaoRetornada.latitude = geometry.location.lat();
                  this.localizacao = localizacaoRetornada;
                }else if (place.types[0] == 'sublocality_level_1'){
                  localizacaoRetornada.rua = '';
                  localizacaoRetornada.cidade = place.address_components[1].long_name;
                  localizacaoRetornada.estado = place.address_components[2].long_name;
                  localizacaoRetornada.pais = place.address_components[4].long_name;
                  // localizacao.cep = place.address_components[6].long_name;
                  localizacaoRetornada.longitude = geometry.location.lng();
                  localizacaoRetornada.latitude = geometry.location.lat();
                  this.localizacao = localizacaoRetornada;
                }
                else if (place.types[0] == 'locality'){
                  localizacaoRetornada.rua = '';
                  localizacaoRetornada.cidade = place.address_components[0].long_name;
                  localizacaoRetornada.estado = place.address_components[1].long_name;
                  localizacaoRetornada.pais = place.address_components[3].long_name;
                  // localizacao.cep = place.address_components[6].long_name;
                  localizacaoRetornada.longitude = geometry.location.lng();
                  localizacaoRetornada.latitude = geometry.location.lat();
                   this.localizacao = localizacaoRetornada;
                }
                let myLatLng = {lat: this.localizacao.latitude, lng: this.localizacao.longitude};
                this.map.panTo(myLatLng);
                this.adicionarMarker();
             }
          }
      );


    }, (err) => {
      console.log(err);
    });




  google.maps.event.addListener(this.marker, 'dragend', function(e) {
      document.getElementById('display').innerHTML = '';
      var pos = this.marker.getPosition();
      // get geoposition
      // geocoder.geocode({
      //   latLng: pos
      // }, function(responses) {
      //   if (responses && responses.length > 0) {
      //     // get postal code
      //     var postal_code = addresComponent('postal_code', responses[0])
      //     if (postal_code) {
      //       document.getElementById('display').innerHTML += '<div>Postal code: ' + postal_code + '</div>';
      //     }
      //     // get street
      //     var street = addresComponent('route', responses[0])
      //     if (street) {
      //       document.getElementById('display').innerHTML += '<div>Street: ' + street + '</div>';
      //     }
      //     // street number (number of the house in the street)
      //     var street_number = addresComponent('street_number', responses[0])
      //     if (street_number) {
      //       document.getElementById('display').innerHTML += '<div>Street number: ' + street_number + '</div>';
      //     }
      //   }
      // });
    });

  }

 dismiss() {
   this.viewCtrl.dismiss(this.localizacao);
 }

  ngOnInit() {

  }

  clearTo(){
    this.enderecoBuscado = "";
  }
  cancel() {
    this.view.dismiss();
  }

  voltar() {
    this.navCtrl.pop();
  }

  adicionarMarker() {
    //this.marker['position'] = this.map.getCenter();
    console.log('localizacao: ' + this.localizacao);
    console.log('center: ' + this.map.getCenter());

    let myLatLng = {lat: this.localizacao.latitude, lng: this.localizacao.longitude};
    let marker1 = new google.maps.Marker({
      map: this.map,
      animation: google.maps.Animation.DROP,
      position: myLatLng,
      draggable: true,
      title: this.localizacao.rua

    });


    let content = "<h4>" + this.localizacao.rua + "</h4>";

    this.addInfoWindow(marker1, content);
  }

  
  addInfoWindow(marker, content) {

    let infoWindow = new google.maps.InfoWindow({
      content: content
    });

    google.maps.event.addListener(marker, 'click', () => {
      infoWindow.open(this.map, marker);
    });

  }
  salvarLocalizacao() {

    console.log('localizacao: ' + this.localizacao);
    this.dismiss();
  }

    /**
  *   geocodeResponse is an object full of address data.  
  *   This function will "fish" for the right value
  *   
  *   example: type = 'postal_code' => 
  *   geocodeResponse.address_components[5].types[1] = 'postal_code'
  *   geocodeResponse.address_components[5].long_name = '1000'
  * 
  *   type = 'route' => 
  *   geocodeResponse.address_components[1].types[1] = 'route'
  *   geocodeResponse.address_components[1].long_name = 'Wetstraat'
  */
  addresComponent(type, geocodeResponse) {
    for(var i=0; i < geocodeResponse.address_components.length; i++) {
      for (var j=0; j < geocodeResponse.address_components[i].types.length; j++) {
        if (geocodeResponse.address_components[i].types[j] == type) {
          return geocodeResponse.address_components[i].long_name;
        }
      }
    }
    return '';
  }

} 