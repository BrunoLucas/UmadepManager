import { Injectable } from '@angular/core';
import { Http , Headers, RequestOptions} from '@angular/http';
// import 'rxjs/add/operator/map';
import {Observable} from 'rxjs/Observable';
import {Constant} from '../config/config';

import 'rxjs/Rx';

@Injectable()
export class TarefaProvider {

  webService = null;
  constructor(private http: Http) {
      this.http = http;
  }

  findAll() {
        return this.http.get(Constant.SERVER_URL + '/tarefa/') 
        .map(res => res.json())
            .catch(this.handleError); 
    }

   findOne(codigo: number) {
        return this.http.get(Constant.SERVER_URL + '/tarefa/' + codigo) 
        .map(res => res.json())
            .catch(this.handleError); 
    }
 
    saveTarefa(property) {
        var body = JSON.stringify(property);
        console.log('body: ' + body);
        let headers = new Headers();
        headers.append('Content-Type', 'application/json' );
        let options = new RequestOptions({ headers: headers });
        return this.http.post(Constant.SERVER_URL + '/tarefa/salvar', body, options)
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

