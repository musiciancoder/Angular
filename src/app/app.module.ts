import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms'; // para que si cambia un valor en la vista, cambie tambien el valor correspondiente en el modelo, y viceversa
import { HttpModule } from '@angular/http';
import {routing, appRoutingProviders} from './app.routing';

import { AppComponent } from './app.component';

import {HomeComponent} from './components/home.component';
import {UserEditComponent} from './components/user_edit.component';
import {ArtistListComponent} from './components/artist-list.component';

import {ArtistAddComponent} from './components/artist-add.component';

@NgModule({
  declarations: [ // aca cargamos componentes dentro de cualquier otra plantilla html de otro componente
    AppComponent,
    HomeComponent,
    UserEditComponent, //accedemos a el en plantilla html con <user-edit></user-edit>
    ArtistListComponent,
    ArtistAddComponent

  ],
  imports: [ // aca cargamos modulos del framework y modulos que hagamos nosotros
    BrowserModule,
    FormsModule,
    HttpModule,
    routing
  ],
  providers: [appRoutingProviders],
  bootstrap: [AppComponent]// esto no es el framework bootstrap, sino que aca le decimos cual es nuestro componente principal
   })
export class AppModule { }/*//hacia main.ts*/
