import {Injectable} from "@angular/core";
import {Http, Response, Headers, RequestOptions} from '@angular/http';
import 'rxjs/add/operator/map'
import {Observable} from "rxjs/Observable";
import {GLOBAL} from "./global";
import {Artist} from '../models/artist';


@Injectable()
export class ArtistService {
  public url: string;

  constructor(private _http: Http) { //esto SÍ es un constructor!! le estamos pasando como argumento una variable _http de tipo Http
    this.url = GLOBAL.url; //asignamos un valor (GLOBAL.url) a la propiedad url de la clase Userservice
  }

  getArtists(token, page){

    let headers = new Headers({
      'Content-Type': 'application/json',
        'Authorization':token
    });

    let options =  new RequestOptions({headers:headers})

    return this._http.get(this.url+'artists/'+page, options)
      .map(res => res.json());
  }

  //Un artista
  getArtist(token, id:string){

    let headers = new Headers({
      'Content-Type': 'application/json',
      'Authorization':token
    });

    let options =  new RequestOptions({headers:headers});
    return this._http.get(this.url+'artist/'+id, options)
      .map(res => res.json());
  }

  //fn para guardar artista nuevo. es llamada en artist-add.component
  addArtist(token, artist: Artist){ //argumentos: token del objeto usuario y artist el artista que queremos enviar a la base de datos
    let params = JSON.stringify(artist);
    let headers = new Headers({'Content-Type': 'application/json',
    'Authorization':token
    });

    return this._http.post(this.url+'artist', params, {headers: headers})
      .map(res =>res.json()); //la respuesta la pasa a json

  }

  //modificar un artista
  editArtist(token, id:string, artist: Artist){ //id del artista que queremos editar
    let params = JSON.stringify(artist);
    let headers = new Headers({'Content-Type': 'application/json',
      'Authorization':token
    });

    return this._http.put(this.url+'artist/'+id, params, {headers: headers})
      .map(res =>res.json()); //la respuesta la pasa a json

  }

  //borrar artista
  deleteArtist(token, id:string){

    let headers = new Headers({
      'Content-Type': 'application/json',
      'Authorization':token
    });

    let options =  new RequestOptions({headers:headers});
    return this._http.delete(this.url+'artist/'+id, options)
      .map(res => res.json());
  }


}
