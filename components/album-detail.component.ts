import {Component, OnInit} from '@angular/core';
import {Router, ActivatedRoute, Params} from '@angular/router';

import {GLOBAL} from '../services/global';
import {UserService} from '../services/user.service';

import {AlbumService} from '../services/album.service';
import {Album} from '../models/album';
import {SongService} from '../services/song.service';
import {Song} from '../models/song';

@Component({
  selector: 'album-detail',//esta es el tag <artist-list>
  templateUrl: '../views/album-detail.html',
  providers: [UserService, AlbumService, SongService ]
})


export class AlbumDetailComponent implements OnInit {

  public album: Album;
  public songs: Song[];
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

    private _albumService: AlbumService,
    private _songService: SongService
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

            //Sacar las canciones

            this._songService.getSongs(this.token, response.album._id).subscribe(
              response => {
                if (!response.songs) {
                  this.alertMessage = 'Este album no tiene canciones';
                }
                this.songs = response.songs;
              },


              error => {
                var errorMessage = <any>error;
                if (errorMessage = !null) {
                  var body = JSON.parse(error._body);
                  console.log(error);
                }
              }); //cierre subscribe para canciones


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


 // public confirmado;
    onDeleteConfirm(id)
    {
      this.confirmado = id;
    }

    onCancelSong()
    {
      this.confirmado = null;
    }

    onDeleteSong(id)
    {
      this._songService.deleteSong(this.token, id).subscribe(
        response => {
          if(!response.song){
            alert('Érror en el servidor');
          }
          this.getAlbum();
        },
        error => {
          var errorMessage = <any>error;
          if (errorMessage = !null) {
            var body = JSON.parse(error._body);
            console.log(error);
          }
        }
      );
    }


    //Reproducir canciones
    startPlayer(song){
    let song_player = JSON.stringify(song); //porque además de reproducir queremos tb guardar la cancion q esta sonando en el localStorage
    let file_path = this.url + 'get-song-file/' +song.file; //del backend, esto es para captar la cancion
    let image_path = this.url + 'get-image-album/' + song.album.image;

    localStorage.setItem('sound-song', song_player ); //guardamos en el localStorage
    document.getElementById("mp3-source").setAttribute("src", file_path);//mete un src=file_path en el elemento del dom mp3-source
      (document.getElementById("player") as any).load();  //Acá finalmente reproducimos el tema. con as any forzamos un tipo any
      (document.getElementById("player")as any).play();

      document.getElementById('play-song-title').innerHTML = song.name; //para agregar nombre de cancion en el reproductor
      document.getElementById('play-song-artist').innerHTML = song.album.artist.name;
      document.getElementById('play-image.album').setAttribute('src', image_path);

  }

  }

