import {Component, OnInit} from '@angular/core';
import {Router, ActivatedRoute, Params} from '@angular/router';

import {GLOBAL} from '../services/global';
import {UserService} from '../services/user.service';
import {UploadService} from '../services/upload.service';
import {AlbumService} from '../services/album.service';
import {Artist} from '../models/artist';
import {Album} from '../models/album';

@Component({
  selector: 'album-edit', //esta es el tag <artist-list>
  templateUrl: '../views/album-add.html',
  providers: [UserService, AlbumService, UploadService]
})


export class AlbumEditComponent implements OnInit{
  public titulo: string;
  public album: Album;
  public identity;
  public token;
  public url: string;
  public alertMessage: string;
  public is_edit;
  public filesToUpload: Array<File>;

  constructor (
    private _route: ActivatedRoute, //libreria externa
    private _router: Router, //libreria externa
    private _userSevice: UserService, //nuestra clase de servicio UserService
    private _uploadService: UploadService,
    private _albumService: AlbumService
  ){
    this.titulo = 'Editar album';
    this.identity = this._userSevice.getIdentity();
    this.token = this._userSevice.getToken();
    this.url = GLOBAL.url;
    this.album = new Album ('', '',2017,'','');
    this.is_edit = true; //para q aparezca la parte de edicion en el formulario
    this.filesToUpload;

  }


  ngOnInit() {
    console.log('album-add.component.ts cargado');

    //conseguir el album
    this.getAlbum(); //ejecuta el getAlbum de esta clase



  }

  getAlbum() {
    this._route.params.forEach((params: Params) => { //rescatamos de url
      let id = params['id'];//del url, con routing


      this._albumService.getAlbum(this.token, id).subscribe(

        response =>{
          if(!response.album){
            this._router.navigate(['/']); //que lleve a home
          }else{

            this.album = response.album; //el objeto artist que envia la respuesta del servidor lo transformamos en la propiedad de nuestra clase llamada artist

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
    });
  }
  onSubmit(){
    this._route.params.forEach((params: Params)=>{ //rescatamos de url
      let id = params['id']; //de todos los parametros  saca el parametro id


      this._albumService.editAlbum(this.token, id, this.album).subscribe(

        response =>{
          if(!response.album){
            this.alertMessage = 'Error en el servidor';
          }else{
            this.alertMessage = 'El album se ha actualizado correctamente';
            if(!this.filesToUpload){
                //redirigir
              console.log(response.album.artist);
            }else{
              //subir la imagen del album
              this._uploadService.makeFileRequest(this.url+'upload-image-album/'+id, [] , this.filesToUpload, this.token, 'image' )
                .then(
                  (result) =>{
                    console.log(this.album);
                    this._router.navigate(['/artista', this.album.artist])
                  },
                  (error) =>{
                    console.log(error);
                  }

                );
            }


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



  fileChangeEvent(fileInput: any){
    this.filesToUpload = <Array<File>>fileInput.target.files;

  }


}
