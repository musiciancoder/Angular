import {Component, OnInit} from '@angular/core';
import {Router, ActivatedRoute, Params} from '@angular/router';

import {GLOBAL} from '../services/global';
import {UserService} from '../services/user.service';
import {Artist} from '../models/artist';

@Component({
  selector: 'artist-list', //esta es el tag <artist-list>
  templateUrl: '../views/artist-list.html',
  providers: [UserService]
})


export class ArtistListComponent implements OnInit{
  public titulo: string;
  public artist: Artist;
  public identity;
  public token;
  public url: string;

  constructor (
    private _route:ActivatedRoute, //libreria externa
    private _router: Router, //libreria externa
    private _userSevice: UserService, //nuestra clase de servicio UserService
    ){
    this.titulo = 'Crear nuevo artista';
    this.identity = this._userSevice.getIdentity();
    this.token = this._userSevice.getToken();
    this.url = GLOBAL.url;
    this.artist= new Artist('', '',''); //porque el modelo tiene estos tres atributos

  }

  ngOnInit(){
    console.log('artist-list.component.ts cargado');

    // Conseguir el listado de artistas
}

}




