import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms'; // para que si cambia un valor en la vista, cambie tambien el valor correspondiente en el modelo, y viceversa
import { HttpModule } from '@angular/http';

import { AppComponent } from './app.component';

@NgModule({
  declarations: [ // aca cargamos componentes y directivas
    AppComponent
  ],
  imports: [ // aca cargamos modulos del framework y modulos que hagamos nosotros
    BrowserModule,
    FormsModule,
    HttpModule
  ],
  providers: [],
  bootstrap: [AppComponent]// esto no es el framework bootstrap, sino que aca le decimos cual es nuestro componente principal
   })
export class AppModule { }
