import {ModuleWithProviders} from '@angular/core';
import {Routes, RouterModule} from '@angular/router';

//import user
import {HomeComponent} from './components/home.component';
import  {UserEditComponent} from './components/user_edit.component';

//import artist
import {ArtistListComponent} from './components/artist-list.component';
import {ArtistAddComponent} from './components/artist-add.component';

const appRoutes: Routes = [

  {path: '', component: HomeComponent}, //componente principal por defecto
  // lo quitó en video 79, porque ahora HomeComponent es el componente principal por defercto {path:'', redirectTo:'/artists/1', pathMatch: 'full'}, //por defecto si no hay nada en la url, lleva a esta ruta
  //{path:'', component: ArtistListComponent}, //'nombreUrl', componente
  {path: 'artistas/:page', component: ArtistListComponent},
  {path: 'crear-artista', component: ArtistAddComponent},
  {path:'mis-datos', component: UserEditComponent},
  {path:'**', component: HomeComponent} //si no existe ruta, que tambien vaya al home

];

export const appRoutingProviders: any[] = []; //configuracion necesaria para el router (fue lo unico que victor dijo) //va hacia app.module
export const routing: ModuleWithProviders = RouterModule.forRoot(appRoutes);
