import { Component, OnInit } from '@angular/core';
import {UserService} from './services/user.service'; // para poder hacer llamadas a la api REST
import {User} from './models/user'; //

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  providers: [UserService]  //los providers cargan los servicios
})

export class AppComponent implements OnInit{ // clase app component que se usa para instanciar objetos de los modelos, cuyos argumentos son pasados en su html analogo, en este caso app.component.html
  public title = 'MUSIFY!';
  public user: User; // aca definimos variable public user que es de tipo User, es decir de la clase models/user
  public identity; // para comprobar en el localStorage los datos del usuario logeado. Si esta propiedad esta 'true', es decir esta llena con un objeto (con los datos del usuario), significa q el usuario esta logeado
  public token;

  constructor( // la palabra constructor usada en un archivo que no es modelo (o sea en este caso), meramente indica que se va a instanciar, pero no es un constructor en sí. La palabra constructor usada en un archivo de modelo SÍ es un constructor!
    private  _userService: UserService // definimos variable _userService de tipo UserService en el argumento de este "constructor". Esta es una ejecución de inyección de dependencias (parecida a iny de dep por campo de clase en java spring??)
){
    this.user = new User('','','','','ROLE_USER',''); // acá instanciamos un User, con las propiedades definidas en el modelo (models/user) y los argumentos que le pasamos son los de los formularios en app.component.html
  }

  ngOnInit(){ // metodo sobreescrito de interfaz oninit? al cargar el componente ejecuta el codigo dentro de él.
      //console.log(this._userService.signup()); solo para probar al rpincipio

}


//metodo para identificar al usuario cuando este trate de logearse
  public onSubmit(){
    console.log(this.user);

    this._userService.signup(this.user).subscribe( //llamamos a la funcion de login signup definida en user.service, le pasamos los datos del usuario que este rellena en los inputs y con suscribe llamamos al observable
      response => {
          let identity = response.user;
      },
      error => {
        var errorMessage = <any> error; //tipo any

        if(errorMessage != null){
          console.log(error);
        }
      }
    )
  }
}
