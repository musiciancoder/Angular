 // archivo de servicio, que tiene los metodos par interactuar con la api

 import {Injectable} from "@angular/core";
 import {Http, Response, Headers} from '@angular/http';
 import 'rxjs/add/operator/map'
 import {Observable} from "rxjs/Observable";
 import {GLOBAL} from "./global";

 @Injectable()  //aca decimos que la clase va a ser inyectada en otra clase mediante una variable perteneciente a esta clase (a UserService en este caso, que es inyectada en el "constructor" (donde se instancia) de app.component.ts )
export class UserService{

  public url : string;

  constructor(private _http:Http){ //esto es un "constructor" (angular)!! le estamos pasando como argumento una variable _http de tipo Http, por lo que es una ejecucion de inyeccion de dependencias, en este caso de una clase de '@angular/http
        this.url=GLOBAL.url; //asignamos un valor (GLOBAL.url) a la propiedad url de la clase Userservice
  }

  signup(user_to_login, gethash = null){ //si no le pasamos el gethash, va a devolver los datos del usuario sencillamente, y si se lo pasamos va a devolver el token del usuario logeado correctamente
    // return 'Hola mundo desde el servicio'; //solo pa probar al principio
   if(gethash!=null){
     user_to_login.gethash= gethash; //gethash es true o false si esta logeado o no.Acá añadimos a los datos de usuario esta propiedad (true or false)

   }

    let json = JSON.stringify(user_to_login); //pasa a formato json el objeto con los datos del usuario, es decir el resultado de este metod va a ser {"nombre":"John","email":suser@user,"city":"New York"}
    let params = json;

    let headers = new Headers({'Content-Type':'application/json'}); //pasamos la codificacion de los datos al backend en JSON

    return this._http.post(this.url+'login', params, {headers:headers}) //llamada por post al backend para login de usuario. Primer argumento: direccion url del backend, segundo argumento: los datos del usuario, tercer argumento: van por headers
      .map(res=>res.json());//que la respuesta del servidor la pase a formato json
  }





}

