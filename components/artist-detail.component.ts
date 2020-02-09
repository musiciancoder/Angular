import {Component, OnInit} from '@angular/core';
import {Router, ActivatedRoute, Params} from '@angular/router';

import {GLOBAL} from '../services/global';
import {UserService} from '../services/user.service';

import {ArtistService} from '../services/artist.service';
import {Artist} from '../models/artist';
import {AlbumService} from '../services/album.service';
import {Album} from '../models/album';


@Component({
  selector: 'artist-detail',//esta es el tag <artist-list>
  templateUrl: '../views/artist-detail.html',
  providers: [UserService, ArtistService, AlbumService ]
})


export class ArtistDetailComponent implements OnInit {

  public artist: Artist;
  public albums: Album[]; //Album de '..models/album'
  public identity;
  public token;
  public url: string;
  public alertMessage: string;
  public confirmado;


  constructor(
    private _route: ActivatedRoute, //libreria externa
    private _router: Router, //libreria externa

    private _userSevice: UserService, //nuestra clase de servicio UserService
    private _artistService: ArtistService,
    private _albumService: AlbumService
  ) {

    this.identity = this._userSevice.getIdentity();
    this.token = this._userSevice.getToken();
    this.url = GLOBAL.url;


  }

  ngOnInit() {
    console.log('artist-detail.component.ts cargado');
    //llamar metodo api para cargar artista
    this.getArtist(); //ejecuta getArtist() de esta clase
  }

  getArtist() {
    this._route.params.forEach((params: Params) => {
      let id = params['id']; //recogemos el id q nos llega por url

      this._artistService.getArtist(this.token, id).subscribe( //getArtist de la funcion de servicio
        response => {
          if (!response.artist) {
            this._router.navigate(['/']); //que redireccione
          } else {
            this.artist = response.artist; //la respuesta (una vex mas) se transforma en propiedad de clase

            //Sacar los albums del artista

            this._albumService.getAlbums(this.token, response.artist._id).subscribe(
              response => {
                if (!response.albums) {
                  this.alertMessage = 'Este artista no tiene albums';
                }
                this.albums = response.albums;
              },


              error => {
                var errorMessage = <any>error;
                if (errorMessage = !null) {
                  var body = JSON.parse(error._body);
                  console.log(error);
                }
              }); //cierre subscribe
          }
        },


        error => {
          var errorMessage = <any>error;
          if (errorMessage = !null) {
            var body = JSON.parse(error._body);
            console.log(error);
          }
        }
      )
    });
  }

  //funciones para borrar album



  onDeleteConfirm(id) {  //al apretar boton borrar en artist detail
    this.confirmado = id;

  }

  onCancelAlbum() {
    this.confirmado = null; //por si se arrepiente (al presionar boton cancelar)
  }

  onDeleteAlbum(id) {  //este si borra, al hacer click en boton eliminar
    this._albumService.deleteAlbum(this.token, id).subscribe(
      response => {
        if (!response.album) {
          alert('Error en el servidor');
          console.log('error en el servidor');
        }
        this.getArtist(); //si efectivamente borra, vuelve a obtener el artista (con todos sus albumes menos el que acabamos de borrar)
      }, error => {
        var errorMessage = <any>error;
        if (errorMessage = !null) {
          var body = JSON.parse(error._body);
          console.log(error);
        }
      }
    );

  }

}
