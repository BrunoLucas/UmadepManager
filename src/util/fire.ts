
import {Injectable} from '@angular/core';
import firebase from 'firebase';


@Injectable()
export class Fire {

    user: any = {};
    constructor() {


    }

    login(token: string, successCallback, errorCallback) {
        console.log('token facebook: ' + token);
        let credential = firebase.auth.FacebookAuthProvider.credential(token);
        console.log('credential: ' + credential);
        firebase.auth().signInWithCredential(credential).then(
            response => {
                console.log('Resultado de sucesso login facebook: ' + response);
                this.setUser( response.providerData[0]);
                successCallback();
            }, error => {
                console.log('Resultado de erro login facebook: ' + error);
                errorCallback(error);
            }
        );
    }

    loginGoogle(token: string, successCallback, errorCallback) {
        //   var provider = new firebase.auth.GoogleAuthProvider();
        //   firebase.auth().getRedirectResult().then(function(result) {
        //     if (result.credential) {
        //         // This gives you a Google Access Token. You can use it to access the Google API.
        //         var token = result.credential.accessToken;
        //         // ...
        //           this.setUser(token, result.credential);
        //         successCallback();
        //     }
        //         // The signed-in user info.
        //         }).catch(function(error) {
        //         // Handle Errors here.
        //         var errorCode = error.code;
        //         var errorMessage = error.message;
        //         // The email of the user's account used.
        //         var email = error.email;
        //         // The firebase.auth.AuthCredential type that was used.
        //         var credential = error.credential;
        //         // ...
        //         errorCallback(error);

        //     });

    }
    getStorage() {
        return firebase.storage();
    }
    getReferenceStorage() {
        return firebase.storage().ref();
    }
    getDB() {
        return firebase;
    }

    getUser() {
        return this.user;
    }
    public setUser(authData: any) {  
        this.user.name = authData.name;
        this.user.photo = authData.photo;
        this.user.id = authData.id;
        this.user.token = authData.token;

        this.saveUser();
    }

    private saveUser() {
        firebase.database().ref('user').child(this.user.id).set({
            name: this.user.name,
            photo: this.user.photo
        });
    }
    saveEvento(evento) {


        this.getDB().database().ref('evento/' + this.getUser().id).push({
            nome: evento.nome,
            descricao: evento.descricao,
            data: evento.data,
            horario: evento.horario,
            admin: this.getUser().id,
            foto: evento.foto,
            rua: evento.endereco.rua,
            cidade: evento.endereco.cidade,
            estado: evento.endereco.estado,
            pais: this.garantirVazio(evento.endereco.pais),
            latitude: evento.endereco.latitude,
            longitude: evento.endereco.longitude,
            numero : evento.endereco.numero,
            complemento : this.garantirVazio(evento.endereco.complemento)
        });
        return Promise.resolve();

    }

    saveTarefa(tarefa) {


       let idGeradoRef = this.getDB().database().ref('tarefa/' + this.getUser().id).push({
            nome: tarefa.nome,
            descricao: tarefa.nome,
            evento: tarefa.evento
        });
        tarefa['id'] = idGeradoRef.key;
        return Promise.resolve();

    }

    saveGrupoDeTarefa(tarefa, grupo) {

        let caminhoGrupo = 'grupo/' + this.getUser().id;
        let idGeradoRef =  this.getDB().database().ref(caminhoGrupo).push({
            nome: 'Grupo ' + tarefa.nome
        });

        var updates = {};
        
        for (let i = 0; i < grupo.length; i++) {
            updates[idGeradoRef.key + '/participantes/' + grupo[i].key] = true;
        }
        updates[idGeradoRef.key + '/tarefas/' + tarefa.id] = true;            
        this.getDB().database().ref(caminhoGrupo).update(updates);
        let updateTarefa = {};
        updateTarefa['/grupo'] = idGeradoRef.key; 
        this.getDB().database().ref('/tarefa/' + this.getUser().id + '/' + tarefa.id).update(updateTarefa);
        return Promise.resolve();

    }

    saveCongregacao(congregacao, successCallback) {

        this.getDB().database().ref('congregacao/' + this.getUser().id).push({
            nome: congregacao.nome,
            descricao: congregacao.nome,
            localizacao: congregacao.localizacao,
            primeiroPastor: {
                nome: this.garantirVazio(congregacao.primeiroPastorModel.nome),
                email: this.garantirVazio(congregacao.primeiroPastorModel.email),
                telefone: this.garantirVazio(congregacao.primeiroPastorModel.telefone)
            },
            segundoPastor: {
                nome: this.garantirVazio(congregacao.segundoPastorModel.nome),
                email: this.garantirVazio(congregacao.segundoPastorModel.email),
                telefone: this.garantirVazio(congregacao.segundoPastorModel.telefone)
            },
            primeiroLider: {
                nome: this.garantirVazio(congregacao.primeiroLiderModel.nome),
                email: this.garantirVazio(congregacao.primeiroLiderModel.email),
                telefone: this.garantirVazio(congregacao.primeiroLiderModel.telefone)
            },
            segundoLider: {
                nome: this.garantirVazio(congregacao.segundoLiderModel.nome),
                email: this.garantirVazio(congregacao.segundoLiderModel.email),
                telefone: this.garantirVazio(congregacao.segundoLiderModel.telefone)
            }
        });

        return Promise.resolve();

    }

    saveJovem(jovem) {


        this.getDB().database().ref('jovem/' + this.getUser().id).push({
            nome: jovem.nome,
            telefone: jovem.telefone,
            email: jovem.email,
            congregacao: jovem.congregacao,
            foto: jovem.foto,
            nascimento: jovem.nascimento,
            rua: jovem.endereco.rua,
            cidade: jovem.endereco.cidade,
            estado: jovem.endereco.estado,
            pais: this.garantirVazio(jovem.endereco.pais),
            latitude: jovem.endereco.latitude,
            longitude: jovem.endereco.longitude,
            numero : jovem.endereco.numero,
            complemento : this.garantirVazio(jovem.endereco.complemento)
        });
        return Promise.resolve();

    }

    saveConvidado(convidado) {


        this.getDB().database().ref('convidado/' + this.getUser().id).push({
            nome: convidado.nome,
            rua: convidado.endereco.rua,
            cidade: convidado.endereco.cidade,
            estado: convidado.endereco.estado,
            pais: this.garantirVazio(convidado.endereco.pais),
            latitude: convidado.endereco.latitude,
            longitude: convidado.endereco.longitude,
            telefone: convidado.telefone,
            email: convidado.email,
            congregacao: convidado.congregacao,
            foto: convidado.foto,
            numero : convidado.endereco.numero,
            complemento : this.garantirVazio(convidado.endereco.complemento)
        });
        return Promise.resolve();

    }

    editConvidado(convidado) {


        this.getDB().database().ref('convidado/' + this.getUser().id + '/' + convidado.codigo).set({
            nome: convidado.nome,
            rua: convidado.rua,
            cidade: convidado.cidade,
            estado: convidado.estado,
            pais: this.garantirVazio(convidado.pais),
            latitude: convidado.latitude,
            longitude: convidado.longitude,
            telefone: convidado.telefone,
            email: convidado.email,
            congregacao: convidado.congregacao,
            foto: convidado.foto,
            numero : convidado.numero,
            complemento : this.garantirVazio(convidado.complemento)
        });
        return Promise.resolve();

    }


    salvarImagem(_uploadSnapshot, successCallback) {

        var ref = firebase.database().ref('assets').push({
            'URL': _uploadSnapshot.downloadURL, // url to access file
            'name': _uploadSnapshot.metadata.name, // name of the file
            'owner': this.getUser().id,
            'lastUpdated': new Date().getTime()
        });
        console.log('concluiu push da imagem no database');
        return Promise.resolve();
        // return new Promise((resolve, reject) => {

        //   // we will save meta data of image in database
        //   var dataToSave = {
        //     'URL': _uploadSnapshot.downloadURL, // url to access file
        //     'name': _uploadSnapshot.metadata.name, // name of the file
        //     'owner': this.getUser().id,
        //     'lastUpdated': new Date().getTime(),
        //   };
        //   ref.push(dataToSave, (_response) => {
        //       let retorno = _response.val();
        //       retorno.key = _response.key;
        //     resolve(_response);
        //   }).catch((_error) => {
        //     reject(_error);
        //   });
        // });

    }


    uploadToFirebase(_imageBlob) {
        var fileName = 'sample-' + new Date().getTime() + '.jpg';

        return new Promise((resolve, reject) => {
            var fileRef = firebase.storage().ref('images/' + fileName);

            var uploadTask = fileRef.put(_imageBlob);
            uploadTask.on(firebase.storage.TaskEvent.STATE_CHANGED,
            (snapshot) =>  {
                let upload = (uploadTask.snapshot.bytesTransferred / uploadTask.snapshot.totalBytes) * 100;
                console.log('progresso upload: ' + upload);
                resolve(uploadTask.snapshot);
            });


            // uploadTask.on('state_changed', (_snapshot) => {
            //     console.log('snapshot progess ' + _snapshot.bytesTransferred);
            // }, (_error) => {
            //     console.error('Erro no upload');
            //     reject(_error);
            // }, () => {
            //     console.log('???');
            //     // completion...
            //     resolve(uploadTask.snapshot);
            // });
        });
    }



    garantirVazio(objeto) {
        if (objeto === undefined) {
            return '';
        }
        return objeto;
    }


    consultarJovensParaTarefas(filtro, successCallback) {

        let ref = this.getDB().database().ref('/jovem').child(this.getUser().id);

        ref.orderByChild('nome').startAt(filtro.nome).on('child_added', (snapshot) => {
            let message = snapshot.val();
            message.key = snapshot.key;
            successCallback(message);
        });

        //      ref.orderByChild('nome').on('child_added', (snapshot) => {
        //     let message = snapshot.val();
        //     message.key = snapshot.key;

        //     successCallback(message);
        // })
        
        // TODO
        // if(this.verificarSeNaoEstaVazio(filtro.nome)){
        //    ref.orderByChild("nome").startAt(filtro.nome);
        // }
        // if(this.verificarSeNaoEstaVazio(filtro.congregacao)){
        //     ref.child("congregacao").startAt(filtro.congregacao);
        // }
        // ref.on("child_added", function(data){
        //         console.log('Lista de jovens: ' +  data);
        //         successCallback(data.val());
        // });




    }

    verificarSeNaoEstaVazio(objeto) {
        if (objeto !== undefined && objeto != null && objeto !== '') {
            return true;
        }
        return false;
    }
    getEventos(successCallback) {

        let ref = this.getDB().database().ref('/evento').child(this.getUser().id);

        ref.orderByChild('nome').on('child_added', (snapshot) => {
            let message = snapshot.val();
            message.key = snapshot.key;

            successCallback(message);
        });

    }

    getCongregacoes(successCallback) {

        let ref = this.getDB().database().ref('/congregacao').child(this.getUser().id);

        ref.orderByChild('nome').on('child_added', (snapshot) => {
            let message = snapshot.val();
            message.key = snapshot.key;
            successCallback(message);
        });

    }


    getJovens(successCallback) {

        let ref = this.getDB().database().ref('/jovem').child(this.getUser().id);

        ref.orderByChild('nome').on('child_added', (snapshot) => {
            let message = snapshot.val();
            message.key = snapshot.key;

            successCallback(message);
        });

    }

    getConvidados(successCallback) {

        let ref = this.getDB().database().ref('/convidado').child(this.getUser().id);

        ref.orderByChild('nome').on('child_added', (snapshot) => {
            let message = snapshot.val();
            message.key = snapshot.key;

            successCallback(message);
        });

    }

    obterJovem(key, successCallback) {

        let ref = this.getDB().database().ref('/jovem/' + this.getUser().id + '/' + key)
            .once('value', (snapshot) => {
                let message = snapshot.val();
                message.key = snapshot.key;
                successCallback(message);
            });

    }


    obterEvento(key, successCallback) {

        let ref = this.getDB().database().ref('/evento/' + this.getUser().id + '/' + key)
            .once('value', (snapshot) => {
                let message = snapshot.val();
                successCallback(message);
            });

    }



    obterTarefa(key, successCallback) {

        let ref = this.getDB().database().ref('/tarefa/' + this.getUser().id + '/' + key)
            .once('value', (snapshot) => {
                let message = snapshot.val();
                successCallback(message);
            });

    }

   obterGrupo(key, successCallback) {

        let ref = this.getDB().database().ref('/grupo/' + this.getUser().id + '/' + key)
            .once('value', (snapshot) => {
                let message = snapshot.val();
                message.key = snapshot.key;
                successCallback(message);
            });

    }


    obterCongregacao(key, successCallback) {

        let ref = this.getDB().database().ref('/congregacao/' + this.getUser().id + '/' + key)
            .once('value', (snapshot) => {
                let message = snapshot.val();
                successCallback(message);
            });

    }

    obterConvidado(key, successCallback) {

        let ref = this.getDB().database().ref('/convidado/' + this.getUser().id + '/' + key)
            .once('value', (snapshot) => {
                let message = snapshot.val();
                successCallback(message);
            });

    }
    obterTarefasDoEvento(key, successCallback) {

        let query = this.getDB().database().ref('/tarefa/' + this.getUser().id);

        query.orderByChild('evento').equalTo(key).on('child_added', (snapshot) => {
            let tarefas = snapshot.val();
            tarefas.key = snapshot.key;
            successCallback(tarefas);
        });
    }


}
