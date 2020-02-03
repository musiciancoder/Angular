 // archivo de servicio, que tiene los metodos par interactuar con la api

 import {Injectable} from "@angular/core";
 import {Http, Response, Headers} from '@angular/http';
 import 'rxjs/add/operator/map'
 import {Observable} from "rxjs/Observable";
 import {GLOBAL} from "./global";
 //import {Map} from 'rxjs/operators';


 @Injectable()
export class UserService {

   public identity;
   public token;
   public url: string;

   constructor(private _http: Http) { //esto SÍ es un constructor!! le estamos pasando como argumento una variable _http de tipo Http
     this.url = GLOBAL.url; //asignamos un valor (GLOBAL.url) a la propiedad url de la clase Userservice
   }

   //fn de servicio para login, llamada en app.component
   signup(user_to_login, gethash = null) {
     if (gethash != null) { //si existe y es verdadero o falso..
       user_to_login.gethash = gethash; //..lo definimos como propiedad del objeto user_to_login

     }
     let json = JSON.stringify(user_to_login); //pasa a formato JSON el objeto javascript user_to_login;
     let params = json;

     let headers = new Headers({'Content-Type': 'application/json'}); //pasamos el header con este formato porque en el backend tambien tenemos javascript con nodeJS

     return this._http.post(this.url + 'login', params, {headers: headers}) // ojo, que esto es peticion al servidor y respuesta al mismo tiempo
       .map(res => res.json()); //la respuesta la pasamos a un objeto json

   }

   //fn de servicio para registrar usuario nuevo, llamada en app.component
   register(user_to_register){
     let params = JSON.stringify(user_to_register); //pasa a formato JSON el objeto javascript user_to_register;
     let headers = new Headers({'Content-Type': 'application/json'}); //pasamos el header con este formato porque en el backend tambien tenemos javascript con nodeJS

     return this._http.post(this.url + 'register', params, {headers: headers}) // ojo, que esto es peticion al servidor y respuesta al mismo tiempo
       .map(res => res.json());

   }

   //metodo para actualizar usuario
    updateUser(user_to_update){
      let params = JSON.stringify(user_to_update); //pasa a formato JSON el objeto javascript user_to_register;
      let headers = new Headers({'Content-Type': 'application/json', //'Access-Control-Allow-Origin'
      'authorization': this.getToken()}); //pasamos el header con este formato porque en el backend tambien tenemos javascript con nodeJS. Ademas pasamos la autorizacion que el usuario debe tener para hacer los cambios

      return this._http.put(this.url+'update-user/'+user_to_update._id,
        params, {headers: headers}) // ojo, que esto es peticion al servidor y respuesta al mismo tiempo
        .map(res => res.json());
    }


   //para obtener identity de localstorage
   getIdentity() {
     let identity = JSON.parse(localStorage.getItem('identity'));

     if (identity != "undefined") {
       this.identity = identity;
     } else {
       this.identity = null;
     }
     return this.identity;
   }

   getToken() {
     let token = localStorage.getItem('token');

     if (token != "undefined") {
       this.token = token;
     } else {
       this.token = null;
     }

     return this.token;

   }

 }
