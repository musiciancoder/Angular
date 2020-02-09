import {Injectable} from "@angular/core";
import {Http, Response, Headers, RequestOptions} from '@angular/http';
import 'rxjs/add/operator/map'
import {Observable} from "rxjs/Observable";
import {GLOBAL} from "./global";
import {Artist} from '../models/artist';


//clase servicio para subir imagenes.
//Cuando se ejecuta esta funcion, sale error Access to XMLHttpRequest at 'http://localhost:3977/api/upload-image-artist/5e2f014e8bb4fd329c98d540' from origin 'http://localhost:4200' has been blocked by CORS policy: Request header field authoritation is not allowed by Access-Control-Allow-Headers in preflight response.
@Injectable()
export class UploadService {
  public url: string;

  constructor(private _http: Http) { //esto SÍ es un constructor!! le estamos pasando como argumento una variable _http de tipo Http
    this.url = GLOBAL.url; //asignamos un valor (GLOBAL.url) a la propiedad url de la clase Userservice
  }

  makeFileRequest(url: string, params: Array<string>, files: Array<File>, token: string, name:string ){ //peticion ajax comun y corriente para enviar archivos al servidor


    return new Promise(function (resolve, reject) {
      var formData: any = new FormData(); //To construct a FormData object that contains the data from an existing <form>, specify that form element when creating the FormData object https://developer.mozilla.org/en-US/docs/Web/API/FormData/Using_FormData_Objects
      var xhr = new XMLHttpRequest();

      for (var i = 0; i < files.length; i++) { //length es cantidad de archivos a subir
        formData.append(name, files[i], files[i].name); //clave, archivo, nombredearchivo
      }

      xhr.onreadystatechange = function () { //The readyState property holds the status of the XMLHttpRequest.

        //The onreadystatechange property defines a function to be executed when the readyState changes.
        if (xhr.readyState == 4) {
          if (xhr.status == 200) {
            resolve(JSON.parse(xhr.response))
          } else {
            reject(xhr.response);
          }
        }
      }
      xhr.open('POST', url,true);
      xhr.setRequestHeader('authoritation', token); //clave valor para enviar por header el token del usuario identificado
      xhr.send(formData);
    });

  }

}
