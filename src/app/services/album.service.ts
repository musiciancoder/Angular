import {Injectable} from "@angular/core";
import {Http, Response, Headers, RequestOptions} from '@angular/http';
import 'rxjs/add/operator/map'
import {Observable} from "rxjs/Observable";
import {GLOBAL} from "./global";
import {Album} from '../models/album';


@Injectable()
export class AlbumService {
  public url: string;

  constructor(private _http: Http) { //esto SÍ es un constructor!! le estamos pasando como argumento una variable _http de tipo Http
    this.url = GLOBAL.url; //asignamos un valor (GLOBAL.url) a la propiedad url de la clase Userservice
  }

  getAlbums(token, artistId = null){
    let headers = new Headers({
      'Content-Type':'application/json',
      'Authorization':token
    });

    let options = new RequestOptions({headers: headers
    });

    if(artistId == null){ //si no le pasamos ningun artista, que saque todos los albums
    return this._http.get(this.url+'albums', options)
      .map(res=>res.json());
  }else{
      return this._http.get(this.url+'albums/'+artistId, options)
        .map(res=>res.json());
    }
  }

  getAlbum(token, id: string){
    let headers = new Headers({
      'Content-Type':'application/json',
      'Authorization':token
    });

    let options = new RequestOptions({headers: headers});
    return this._http.get(this.url+'album/'+id, options)
      .map(res=>res.json());
  }

  //fn para guardar arlbum nuevo. es llamada en lbumt-add.component
  addAlbum(token, album: Album){ //argumentos: token del objeto usuario y artist el artista que queremos enviar a la base de datos
    let params = JSON.stringify(album);
    let headers = new Headers({'Content-Type': 'application/json',
      'Authorization':token
    });

    return this._http.post(this.url+'album', params, {headers: headers})
      .map(res =>res.json()); //la respuesta la pasa a json

  }

  editAlbum(token, id: string, album: Album){
    let params = JSON.stringify(album);
    let headers = new Headers({'Content-Type': 'application/json',
      'Authorization':token
    });

    return this._http.put(this.url+'album/'+id, params, {headers: headers})
      .map(res =>res.json()); //la respuesta la pasa a json

  }

  //borrar album
  deleteAlbum(token, id:string){

    let headers = new Headers({
      'Content-Type': 'application/json',
      'Authorization':token
    });

    let options =  new RequestOptions({headers:headers});
    return this._http.delete(this.url+'album/'+id, options)
      .map(res => res.json());
  }


}
