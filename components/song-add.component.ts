import {Component, OnInit} from '@angular/core';
import {Router, ActivatedRoute, Params} from '@angular/router';

import {GLOBAL} from '../services/global';
import {UserService} from '../services/user.service';
import {Song} from '../models/song';
import {SongService} from '../services/song.service';

@Component({
  selector: 'song-add', //esta es el tag <artist-list>
  templateUrl: '../views/song-add.html',
  providers: [UserService, SongService]
})


export class SongAddComponent implements OnInit{
  public titulo: string;
  public song: Song;
  public identity;
  public token;
  public url: string;
  public alertMessage: string;

  constructor (
    private _route: ActivatedRoute, //libreria externa
    private _router: Router, //libreria externa
    private _userSevice: UserService, //nuestra clase de servicio UserService
  private _songService: SongService
  ){
    this.titulo = 'Crear nueva cancion';
    this.identity = this._userSevice.getIdentity();
    this.token = this._userSevice.getToken();
    this.url = GLOBAL.url;
    this.song = new Song (1, '','','', '');


  }


  ngOnInit() {
    console.log('song-add.component.ts cargado');

  }

  onSubmit(){

    this._route.params.forEach((params: Params)=>{ //rescatamos de url
       let album_id = params['album']; //de todos los parametros saca el parametro artista
       this.song.album = album_id;
       console.log(this.song);

    this._songService.addSong(this.token, this.song).subscribe(

      response =>{
        if(!response.song){
          this.alertMessage = 'Error en el servidor';
        }else{
          this.alertMessage = 'La cancion se ha creado correctamente';
          this.song = response.song; //el objeto album que envia la respuesta del servidor lo transformamos en la propiedad de nuestra clase llamada album

          this._router.navigate(['/editar-tema', response.song._id]); //redirigir a esta ruta
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


    );





 });




}


}
