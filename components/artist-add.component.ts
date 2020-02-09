import {Component, OnInit} from '@angular/core';
import {Router, ActivatedRoute, Params} from '@angular/router';

import {GLOBAL} from '../services/global';
import {UserService} from '../services/user.service';
import {ArtistService} from '../services/artist.service';
import {Artist} from '../models/artist';

@Component({
  selector: 'artist-add', //esta es el tag <artist-list>
  templateUrl: '../views/artist-add.html',
  providers: [UserService, ArtistService]
})


export class ArtistAddComponent implements OnInit{
  public titulo: string;
  public artist: Artist;
  public identity;
  public token;
  public url: string;
  public alertMessage: string;

  constructor (
    private _route: ActivatedRoute, //libreria externa
    private _router: Router, //libreria externa
    private _userSevice: UserService, //nuestra clase de servicio UserService
    private _artistService: ArtistService
  ){
    this.titulo = ' Crear nuevo artistas';
    this.identity = this._userSevice.getIdentity();
    this.token = this._userSevice.getToken();
    this.url = GLOBAL.url;
    this.artist = new Artist ('', '','');


  }

  ngOnInit(){
    console.log('artist-add.component.ts cargado');


  }

  onSubmit(){
    console.log(this.artist); //el artista antes de enviar
   this._artistService.addArtist(this.token, this.artist) //addArtist definida en clase de servicio artist.service. le pasamos identificador de usuario y artista
      .subscribe(
        response =>{
          if(!response.artist){
            this.alertMessage = 'Error en el servidor';
          }else{
            this.alertMessage = 'El artista se ha creado corrextamente';
            this.artist = response.artist; //el objeto artist que envia la respuesta del servidor lo transformamos en la propiedad de nuestra clase llamada artist
            console.log(this.artist); //el artista despues de enviar
          //this._router.navigate(['/editar-artista', response.artist._id]); //redirigir a esta ruta
          }
        },
        error =>{
          var errorMessage = <any>error;

          if(errorMessage =!null){
            var body = JSON.parse(error._body);
            this.alertMessage = body.message;

            console.log(error);
          }
        }

      )
  }

}




