import {Injectable} from "@angular/core";
import {Http, Response, Headers, RequestOptions} from '@angular/http';
import 'rxjs/add/operator/map'
import {Observable} from "rxjs/Observable";
import {GLOBAL} from "./global";
import {Song} from '../models/song';


@Injectable()
export class SongService {
  public url: string;

  constructor(private _http: Http) { //esto SÍ es un constructor!! le estamos pasando como argumento una variable _http de tipo Http
    this.url = GLOBAL.url; //asignamos un valor (GLOBAL.url) a la propiedad url de la clase Userservice
  }

  getSongs(token, albumId=null){
    let headers = new Headers({
      'Content-Type': 'application/json',
      'Authorization': token
    });

    let options = new RequestOptions({headers: headers});

    if(albumId==null){ //si no hay albumId las va a mostrar todas
      return this._http.get(this.url+'songs',options)
        .map(res=>res.json());
    }else{//si hay albumId  va a mostrar solo las canciones de ese album
      return this._http.get(this.url+'songs/'+albumId,options)
        .map(res=>res.json());
    }


  }

//para sacar cancion de bbdd
  getSong(token, id: string){
    let headers = new Headers({
      'Content-Type': 'application/json',
        'Authorization': token
    });

let options = new RequestOptions({headers: headers});
return this._http.get(this.url+'song/'+id,options)
  .map(res=>res.json());

  }

  //fn para guardar cancion. es llamada en song-add.component
  addSong(token, song: Song){ //argumentos: token del objeto usuario y artist la cancion que queremos enviar a la base de datos
    let params = JSON.stringify(song);
    let headers = new Headers({'Content-Type': 'application/json',
      'Authorization':token
    });

    return this._http.post(this.url+'song', params, {headers: headers})
      .map(res =>res.json()); //la respuesta la pasa a json

  }

  //fn para editar una cancion
  editSong(token, id:string, song: Song){ //argumentos: token del objeto usuario y artist la cancion que queremos enviar a la base de datos
    let params = JSON.stringify(song);
    let headers = new Headers({'Content-Type': 'application/json',
      'Authorization':token
    });

    return this._http.put(this.url+'song/'+id, params, {headers: headers})
      .map(res =>res.json()); //la respuesta la pasa a json

  }

//metodo para borrar cancion
  deleteSong(token, id: string){
    let headers = new Headers({
      'Content-Type': 'application/json',
      'Authorization': token
    });

    let options = new RequestOptions({headers: headers});
    return this._http.delete(this.url+'song/'+id,options)
      .map(res=>res.json());

  }

}




