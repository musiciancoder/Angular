import {Component, OnInit} from '@angular/core';
import {Router, ActivatedRoute, Params} from '@angular/router';




@Component({
  selector: 'home', //esta es el tag <artist-list>
  templateUrl: '../views/home.html',

})


export class HomeComponent implements OnInit{
  public titulo: string;


  constructor (
    private _route:ActivatedRoute,  //libreria externa
    private _router: Router //libreria externa

  ){
    this.titulo = 'Artistas';


  }

  ngOnInit(){
    console.log('home.component.ts cargado');


  }

}




