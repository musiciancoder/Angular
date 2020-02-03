import {Component, OnInit} from '@angular/core';
import {Router, ActivatedRoute, Params} from '@angular/router';

import {GLOBAL} from '../services/global';
import {UserService} from '../services/user.service';
import {Artist} from '../models/artist';
import {ArtistService} from '../services/artist.service';
@Component({
  selector: 'artist-list', //esta es el tag <artist-list>
  templateUrl: '../views/artist-list.html',
  providers: [UserService, ArtistService]
})


export class ArtistListComponent implements OnInit{
  public titulo: string;
  public artists: Artist [];
  public identity;
  public token;
  public url: string;
  public next_page;
  public prev_page;

  constructor (
    private _route:ActivatedRoute, //libreria externa
    private _router: Router, //libreria externa
    private _userSevice: UserService, //nuestra clase de servicio UserService
    private _artistService: ArtistService
    ){
    this.titulo = 'Artistas';
    this.identity = this._userSevice.getIdentity();
    this.token = this._userSevice.getToken();
    this.url = GLOBAL.url;
    this.next_page = 1; //para paginacion
    this.prev_page = 1;//para paginacion
  }

  ngOnInit(){
    console.log('artist-list.component.ts cargado');
    this.getArtists(); //en consola se puede ver el resultado del array al escribir la url http://localhost:4200/artistas/1, en la parte network, XHR
}


// Conseguir el listado de artistascon paginacion

getArtists(){

    this._route.params.forEach((params: Params)=>{ //rescatar de url, por ejemplo al escribir en barra de direcciones http://localhost:4200/artistas/1
      //paginacion
        let page = +params['page']; //el programa sabe que page es page por la linea  {path: 'artistas/:page', component: ArtistListComponent}, en app.routing.ts
        console.log(page);
        if(!page){
          page= 1;
        }else{
          this.next_page = page +1;
          this.prev_page = page -1;

          if(this.prev_page ==0){
            this.prev_page = 1;
          }
        }

          this._artistService.getArtists(this.token, page).subscribe( //el getArtists del servicio

            response =>{
              if(!response.artists){ //artists es un array de objetos
                this._router.navigate(['/']); //que redireccione
              }else {
                this.artists = response.artists; //la respuesta (una vex mas) se transforma en propiedad de clase
              }
            },

            error =>{
              var errorMessage = <any>error;

              if(errorMessage =!null){
                var body = JSON.parse(error._body);


                console.log(error);
              }
            }

            //
          )
    });
}

public confirmado;
onDeleteConfirm(id){   //funcion llamada al hacer click en boton de artist-list.html
    this.confirmado=id;
}

onCancelArtist(){   //funcion llamada al hacer click en boton de artist-list.html
  this.confirmado = null;
}

onDeleteArtist(id){
  this._artistService.deleteArtist(this.token, id).subscribe(
    response =>{
      if(!response.artists){ //artists es un array de objetos
        alert('Error en el servidor');
      }
      this.getArtists(); //para q liste de nuevo
    },

    error =>{
      var errorMessage = <any>error;

      if(errorMessage =!null){
        var body = JSON.parse(error._body);


        console.log(error);
      }
    }

  )
}


}




