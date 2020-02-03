import {Component, OnInit} from '@angular/core';
import {Router, ActivatedRoute, Params} from '@angular/router';

import {GLOBAL} from '../services/global';
import {UserService} from '../services/user.service';

import {AlbumService} from '../services/album.service';
import {Album} from '../models/album';


@Component({
  selector: 'album-detail',//esta es el tag <artist-list>
  templateUrl: '../views/album-detail.html',
  providers: [UserService, AlbumService ]
})


export class AlbumDetailComponent implements OnInit {

  public album: Album;
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

    private _albumService: AlbumService
  ) {

    this.identity = this._userSevice.getIdentity();
    this.token = this._userSevice.getToken();
    this.url = GLOBAL.url;


  }

  ngOnInit() {
    console.log('album-detail.component.ts cargado');


    //Sacar album de la bbdd
    this.getAlbum();
  }

  getAlbum() {
    console.log("El metodo funciona");
    this._route.params.forEach((params: Params) => {
      let id = params['id']; //recogemos el id de album q nos llega por url

      this._albumService.getAlbum(this.token, id).subscribe( //getArtist de la funcion de servicio
        response => {
          if (!response.album) {
            this._router.navigate(['/']); //que redireccione
          } else {
            this.album = response.album; //la respuesta (una vex mas) se transforma en propiedad de clase
            /*
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


             */
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



}
