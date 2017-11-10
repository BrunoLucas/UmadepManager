import { BrowserModule } from '@angular/platform-browser';
import { ErrorHandler, NgModule } from '@angular/core';
import { IonicApp, IonicErrorHandler, IonicModule } from 'ionic-angular';
import { SplashScreen } from '@ionic-native/splash-screen';
import { StatusBar } from '@ionic-native/status-bar';

import { MyApp } from './app.component';
import { About          } from '../pages/about/about';
import { Jovem          } from '../pages/jovem/jovem';
import { Evento         } from '../pages/evento/evento';
import { Congregacao } from '../pages/congregacao/congregacao';
import { Convidado    } from '../pages/convidado/convidado';
import { Lider    } from '../pages/lider/lider';
import { FriendsPage    } from '../pages/friends/friends';

import { Dashboard    } from '../pages/dashboard/dashboard';
import {EventoProvider} from '../providers/evento/evento-provider';
import { LoginPage } from '../pages/login/login';
import {Fire} from '../util/fire';
import { AngularFireModule } from 'angularfire2';
import { AngularFireAuthModule } from 'angularfire2/auth';
import { Facebook } from '@ionic-native/facebook';

import {DetalheCongregacao} from '../pages/detalhe-congregacao/detalhe-congregacao';
import {DetalheConvidado} from '../pages/detalhe-convidado/detalhe-convidado';
import {DetalheEvento} from '../pages/detalhe-evento/detalhe-evento';
import {DetalheJovem} from '../pages/detalhe-jovem/detalhe-jovem';
import {DetalheTarefa} from '../pages/detalhe-tarefa/detalhe-tarefa';
import {EdicaoConvidado} from '../pages/edicao-convidado/edicao-convidado';
import {JovemTarefa} from '../pages/jovem-tarefa/jovem-tarefa';

import {MessageMapPage} from '../pages/message-map/message-map';
import {ModalNovaLocalizacao} from '../pages/modal-nova-localizacao/modal-nova-localizacao';
import {ModalNovaTarefa} from '../pages/modal-nova-tarefa/modal-nova-tarefa';
import {ModalNovoGasto} from '../pages/modal-novo-gasto/modal-novo-gasto';
import {ModalPhoto} from '../pages/modal-photo/modal-photo';

import {NovoConvidado} from '../pages/novo-convidado/novo-convidado';
import {NovoEvento} from '../pages/novo-evento/novo-evento';
import {NovoJovem} from '../pages/novo-jovem/novo-jovem';
import {Page1} from '../pages/page1/page1';
import {Page2} from '../pages/page2/page2';
import {Pastor} from '../pages/pastor/pastor';
// import * as firebase from 'firebase';

export  const firebaseConfig = {
            apiKey: 'AIzaSyBlbNqfeCcN2moCE4zN3GH0ubFIr6t7qUI',
            authDomain: 'eventosxpto-7fef6.firebaseapp.com',
            databaseURL: 'https://eventosxpto-7fef6.firebaseio.com',
            storageBucket: 'eventosxpto-7fef6.appspot.com',
            messagingSenderId: '928135743707'
        };

@NgModule({
  declarations: [
    MyApp,
    About,      
    Jovem      ,
    Evento    , 
    Congregacao,
    Convidado  ,
    Dashboard  ,
    DetalheEvento,
    LoginPage,
    NovoEvento,
    Lider,               
    FriendsPage,       
    DetalheCongregacao,  
    DetalheConvidado,    
    DetalheEvento,       
    DetalheJovem,       
    DetalheTarefa,       
    EdicaoConvidado,     
    JovemTarefa,         
    MessageMapPage,      
    ModalNovaLocalizacao,
    ModalNovaTarefa,     
    ModalNovoGasto,     
    ModalPhoto,          
    NovoConvidado,       
    NovoEvento,          
    NovoJovem,           
    Page1,               
    Page2,               
    Pastor              
    ],
  imports: [
    BrowserModule,
    IonicModule.forRoot(MyApp),
    AngularFireModule.initializeApp(firebaseConfig),
    AngularFireAuthModule
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    MyApp,
    About,      
    Jovem      ,
    Evento    , 
    Congregacao,
    Convidado  ,
    Dashboard  ,
    DetalheEvento,
    LoginPage,
    NovoEvento,
    Lider,               
    FriendsPage,       
    DetalheCongregacao,  
    DetalheConvidado,    
    DetalheEvento,       
    DetalheJovem,       
    DetalheTarefa,       
    EdicaoConvidado,     
    JovemTarefa,         
    MessageMapPage,      
    ModalNovaLocalizacao,
    ModalNovaTarefa,     
    ModalNovoGasto,     
    ModalPhoto,          
    NovoConvidado,       
    NovoEvento,          
    NovoJovem,           
    Page1,               
    Page2,               
    Pastor              
  ],
  providers: [
    StatusBar,
    SplashScreen,
    {provide: ErrorHandler, useClass: IonicErrorHandler},
    Fire,
    EventoProvider,
    Facebook
  ]
})
export class AppModule {}