import { Injectable } from '@angular/core';
import { Http , Headers, RequestOptions} from '@angular/http';
// import 'rxjs/add/operator/map';
import {Observable} from 'rxjs/Observable';
import {Constant} from '../config/config';

import 'rxjs/Rx';
/*
  Generated class for the Config provider.

  See https://angular.io/docs/ts/latest/guide/dependency-injection.html
  for more info on providers and Angular 2 DI.
*/

//http://localhost:8080/spring-eap6-quickstart/rest/
@Injectable()
export class PessoaProvider {

  webService = null;
  constructor(private http: Http) {

      this.http = http;
      
  }

  findAllJovens() {
        return this.http.get(Constant.SERVER_URL + '/pessoa/listarJovens') 
        .map(res => res.json())
            .catch(this.handleError); 
    //         .toPromise()
    //    .then(res => res.json(), err => console.log(err));
    }

   findAllLideres() {
        return this.http.get(Constant.SERVER_URL + '/pessoa/listarLideres') 
        .map(res => res.json())
            .catch(this.handleError); 
    //         .toPromise()
    //    .then(res => res.json(), err => console.log(err));
    }

     findAllPastores() {
        return this.http.get(Constant.SERVER_URL + '/pessoa/listarPastores') 
        .map(res => res.json())
            .catch(this.handleError); 
    //         .toPromise()
    //    .then(res => res.json(), err => console.log(err));
    }  

      findAllMusicos() {
        return this.http.get(Constant.SERVER_URL + '/pessoa/listarMusicos') 
        .map(res => res.json())
            .catch(this.handleError); 
    //         .toPromise()
    //    .then(res => res.json(), err => console.log(err));
    }

   findOne(codigo : number) {
        return this.http.get(Constant.SERVER_URL + '/pessoa/'+ codigo) 
        .map(res => res.json())
            .catch(this.handleError); 
    //         .toPromise()
    //    .then(res => res.json(), err => console.log(err));
    }
 
    savePessoa(property) {
        var body = JSON.stringify(property);
        console.log('body: '+ body);
        let headers = new Headers();
       // body = JSON.stringify(body);
        headers.append('Content-Type', 'application/json' );
       ;        // let headers = new Headers({
        //      'Content-Type': 'application/json' ,
        //      'Access-Control-Allow-Origin' : '*',
        //      'Access-Control-Allow-Methods' : 'POST, GET, OPTIONS, DELETE',
        //      'Access-Control-Max-Age' : '3600',
        //      'Access-Control-Allow-Headers': 'x-requested-with, X-Auth-Token, Content-Type'
        //     });
        let options = new RequestOptions({ headers: headers });
        return this.http.post(Constant.SERVER_URL+ '/pessoa/salvar',body, options)
            .map((res) => { 
                console.log('res: ' + res);
                return res.json();
            })
            .catch(this.handleError);
    }
 
    handleError(error) {
        console.error('Error: ' + error);
        return Observable.throw(error    || 'Server error');
    }
}

