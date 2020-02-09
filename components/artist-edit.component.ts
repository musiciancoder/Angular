import {Component, OnInit} from '@angular/core';
import {Router, ActivatedRoute, Params} from '@angular/router';

import {GLOBAL} from '../services/global';
import {UserService} from '../services/user.service';
import {UploadService} from '../services/upload.service';
import {ArtistService} from '../services/artist.service';
import {Artist} from '../models/artist';

@Component({
  selector: 'artist-edit', //esta es el tag <artist-list>
  templateUrl: '../views/artist-add.html',
  providers: [UserService, ArtistService, UploadService, ]
})


export class ArtistEditComponent implements OnInit {
  public titulo: string;
  public artist: Artist;
  public identity;
  public token;
  public url: string;
  public alertMessage: string;
  public is_edit;


  constructor(
    private _route: ActivatedRoute, //libreria externa
    private _router: Router, //libreria externa
    private _uploadService: UploadService,
    private _userSevice: UserService, //nuestra clase de servicio UserService
    private _artistService: ArtistService
  ) {
    this.titulo = ' Editar artista';
    this.identity = this._userSevice.getIdentity();
    this.token = this._userSevice.getToken();
    this.url = GLOBAL.url;
    this.artist = new Artist('', '', '');
    this.is_edit = true;//para q aparezca la parte de edicion en el formulario

  }

  ngOnInit(){
    console.log('artist-edit.component.ts cargado');
    //llamar metodo api para cargar artista
    this.getArtist(); //ejecuta getArtist() de esta clase
  }

  getArtist(){
    this._route.params.forEach((params: Params) => {
      let id = params['id']; //recogemos el id q nos llega por url

      this._artistService.getArtist(this.token, id).subscribe( //getArtist de la funcion de servicio
        response =>{
          if(!response.artist){
            this._router.navigate(['/']); //que redireccione
          }else {
            this.artist = response.artist; //la respuesta (una vex mas) se transforma en propiedad de clase
          }
        },

      error =>{
        var errorMessage = <any>error;

        if(errorMessage =!null){
          var body = JSON.parse(error._body);


          console.log(error);
        }
      }
      )
    });
  }

  onSubmit() {
    console.log(this.artist); //el artista antes de enviar
    this._route.params.forEach((params: Params) => {
      let id = params['id']; //recogemos el id q nos llega por url

      this._artistService.editArtist(this.token, id, this.artist) //addArtist definida en clase de servicio artist.service. le pasamos identificador de usuario y artista
        .subscribe(
          response => {
            if (!response.artist) {
              this.alertMessage = 'Error en el servidor';
            } else {
              this.alertMessage = 'El artista se ha actualizado corrextamente';
              //subir la imagen del artista
              if(!this.filesToUpload){
                this._router.navigate(['/artista', response.artist._id]); //redirigir a esta ruta
              }else {
                //subir imagen del artista
                this._uploadService.makeFileRequest(this.url + 'upload-image-artist/' + id, [], this.filesToUpload, this.token, 'image')
                  .then(
                    (result) => {
                      this._router.navigate(['/artista', response.artist._id]);
                    },
                    (error) => {
                      console.log(error);
                    }
                  );
              }
              //this.artist = response.artist; //el objeto artist que envia la respuesta del servidor lo transformamos en la propiedad de nuestra clase llamada artist
              //console.log(this.artist); //el artista despues de enviar
            }
          },
          error => {
            var errorMessage = <any>error;

            if (errorMessage = !null) {
              var body = JSON.parse(error._body);
              this.alertMessage = body.message;

              console.log(error);
            }
          }
        );

    });


  }

  public filesToUpload: Array<File>;
  fileChangeEvent(fileInput: any){ //se ejecuta cuandom hay un cambio en el boton para subir imagen
    this.filesToUpload = <Array<File>>fileInput.target.files;
  }

}
