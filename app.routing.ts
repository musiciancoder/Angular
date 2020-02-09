import {ModuleWithProviders} from '@angular/core';
import {Routes, RouterModule} from '@angular/router';


//import user
import {HomeComponent} from './components/home.component';
import  {UserEditComponent} from './components/user_edit.component';

//import artist
import {ArtistListComponent} from './components/artist-list.component';
import {ArtistAddComponent} from './components/artist-add.component';
import {ArtistEditComponent} from './components/artist-edit.component';
import {ArtistDetailComponent} from './components/artist-detail.component';
import {AlbumAddComponent} from './components/album-add.component';

import {AlbumEditComponent} from './components/album-edit.component';
import {AlbumDetailComponent} from './components/album-detail.component';


//import song
import {SongAddComponent} from './components/song-add.component';
import {SongEditComponent} from './components/song-edit.component';

const appRoutes: Routes = [

  {path: '', component: HomeComponent}, //componente principal por defecto
  // lo quitó en video 79, porque ahora HomeComponent es el componente principal por defercto {path:'', redirectTo:'/artists/1', pathMatch: 'full'}, //por defecto si no hay nada en la url, lleva a esta ruta
  //{path:'', component: ArtistListComponent}, //'nombreUrl', componente
  {path: 'artistas/:page', component: ArtistListComponent},
  {path: 'crear-artista', component: ArtistAddComponent},
  {path: 'editar-artista/:id', component: ArtistEditComponent},
  {path: 'artista/:id', component: ArtistDetailComponent},
  {path: 'crear-album/:artist', component: AlbumAddComponent},
  {path: 'editar-album/:id', component: AlbumEditComponent},
  {path: 'album/:id', component: AlbumDetailComponent},
  {path: 'crear-tema/:album', component: SongAddComponent},
  {path: 'editar-tema/:id', component: SongEditComponent},//pasamos id del tema

  {path:'mis-datos', component: UserEditComponent},
  {path:'**', component: HomeComponent} //si no existe ruta, que tambien vaya al home


  //import album
];

export const appRoutingProviders: any[] = []; //configuracion necesaria para el router (fue lo unico que victor dijo) //va hacia app.module
export const routing: ModuleWithProviders = RouterModule.forRoot(appRoutes);
