import { Component, OnInit } from '@angular/core';
import {UserService} from './services/user.service'; // para poder hacer llamadas a la api REST
import {User} from './models/user';
import {identity} from 'rxjs/util/identity'; //
import {GLOBAL} from './services/global';
import {Router, ActivatedRoute, Params} from '@angular/router';



@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  providers: [UserService]  //los providers cargan los servicios
})

export class AppComponent implements OnInit{ // clase app component que se usa para instanciar objetos de los modelos, cuyos argumentos son pasados en su html analogo, en este caso app.component.html
  public title = 'MUSIFY!'; //se muestra inmediatamente en app.component html en {{title}}
  public user: User; // aca definimos variable public user que es de tipo User, es decir de la clase models/user
  public user_register:User; //usuario que se esta registrando
  public identity; // para comprobar en el localStorage los datos del usuario logeado. Si esta propiedad esta 'true', es decir esta llena con un objeto (con los datos del usuario), significa q el usuario esta logeado
  public token;
  public errorMessage;
  public alertRegister;
  public url:string;



  constructor( // la palabra constructor usada en un archivo que no es modelo (o sea en este caso), meramente indica que se va a instanciar, pero no es un constructor en sí. La palabra constructor usada en un archivo de modelo SÍ es un constructor!
    private  _userService: UserService, // definimos variable _userService de tipo UserService en el argumento de este constructor. Esta es una ejecución de inyección de dependencias (parecida a iny de dep por campo de clase en java spring??)
  private _route:ActivatedRoute, //libreria externa
  private _router: Router, //libreria externa
  ){
    this.user = new User('','','', '','', 'ROLE_USER',''); // acá instanciamos un User, con las propiedades definidas en el modelo (models/user) y los argumentos que le pasamos son los de los formularios en app.component.html
    this.user_register = new User('','','', '','', 'ROLE_USER',''); // acá instanciamos un User, con las propiedades definidas en el modelo (models/user) y los argumentos que le pasamos son los de los formularios en app.component.html

  }

   ngOnInit(){ // metodo sobreescrito de interfaz oninit? al cargar el componente ejecuta el codigo dentro de él.
     this.identity = this._userService.getIdentity(); //para obtener datos del usuario del localstorage
     this.token=this._userService.getToken();//para obtener el token del usuario en localstorage
     console.log(this.identity);
     console.log(this.token);
     //let identity =  this._userService.getIdentity();
     //console.log(identity);
    // console.log(this);


     }

//metodo para logear usuario ya registrado anteriormente
  public onSubmit(){
    // console.log(this);//appComponent (es decir es la clase
    console.log(this.user); //app.component.ts:30User {_id: "", name: "", email: "lee@gmail.com", password: "lee", role: "ROLE_USER", …}_id: ""name: "email: "lee@gmail.com"password: "lee"role: "ROLE_USER"image: ""__proto__: Object

      //Conseguir datos del usuario identificado
   this._userService.signup(this.user).subscribe( //lamado a metodo del servicio, pasandole los datos de lo que el usuario esta escribiendo en los inputs

    response =>{
          let identity = response.user; //el usuario que se ha logueado correctamente
     // console.log(this);//AppComponent
              this.identity = identity; //lo pasa como propiedad de la clase, como si fuera un constructor
        //console.log(response); //{user: {user:_id: "5e1f2dc0e98c462a9ccecc81"name: "lee"surname: "walbaum"email: "lee@gmail.com"role: "ROLE_ADMIN"image: "null"password: "$2a$10$m1LaFUzV6BtbwrnQv6rEiuAzoA4Imt.yVXvy1812gN7MC8P7hh0Mm"__v: 0__proto__: Object__proto__: Object}}
     // console.log(response.user); // {user:_id: "5e1f2dc0e98c462a9ccecc81"name: "lee"surname: "walbaum"email: "lee@gmail.com"role: "ROLE_ADMIN"image: "null"password: "$2a$10$m1LaFUzV6BtbwrnQv6rEiuAzoA4Imt.yVXvy1812gN7MC8P7hh0Mm"__v: 0__proto__: Object__proto__: Object}
      if(!this.identity._id){ //si no esta la propiedad _id en el usuario logueado
            alert("El usuario no esta correctamente logueado");
          }  else{
            //crear elemento en el localstorage para tener el usuario en sesion
            localStorage.setItem('identity', JSON.stringify(identity));

            //Conseguir el token para enviarselo a cada peticion http
            this._userService.signup(this.user, 'true').subscribe( //lamado a metodo del servicio , pasandole esta vez los datos de lo que el usuario esta escribiendo en los inputs, mas el gethash para generar el token para que nos devuelva solo el token

              response =>{
                let token = response.token; //porque devuelve el token como propiedad de response
                this.token = token; //lo pasa como propiedad de la clase por setter, como si fuera un constructor
                //console.log(response); //user:_id: "5e1f2dc0e98c462a9ccecc81"name: "lee"surname: "walbaum"email: "lee@gmail.com"role: "ROLE_ADMIN"image: "null"password: "$2a$10$m1LaFUzV6BtbwrnQv6rEiuAzoA4Imt.yVXvy1812gN7MC8P7hh0Mm"__v: 0__proto__: Object__proto__: Object
                if(this.token.length <=0){
                  alert("El token no se ha generado");
                }  else{
                  //crear elemento en el localstorage para tener el token disponible
                  localStorage.setItem('token', token); //el token ya es un string
                  this.user = new User('','','', '','', 'ROLE_USER',''); //borra los datos en el formulario despues de cada login
                  //console.log(response); //token: "eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJzdWIiOiI1ZTFmMmRjMGU5OGM0NjJhOWNjZWNjODEiLCJzdXJuYW1lIjoid2FsYmF1bSIsImVtYWlsIjoibGVlQGdtYWlsLmNvbSIsInJvbGUiOiJST0xFX0FETUlOIiwiaW1hZ2UiOiJudWxsIiwiaWF0IjoxNTc5NDAwNTIxfQ.n5VnFVvn0nltIueFzYNYNT6Tcl3DmIDFlaI5Pa501QY"__proto__: Object
                  console.log(response.token);
                  console.log(response.identity); //undifined
                }

              },
              error => {
                var errorMessage = <any>error; // any es cualquier tipo

                if(errorMessage != null){
                  var body = JSON.parse(error._body); //pasar a JSON el cuerpo del error que viene en string
                  this.errorMessage = body.message;
                  console.log(error);
                }

              }
            );

          }

    },


      error => {
        var errorMessage = <any>error; // any es cualquier tipo

        if(errorMessage != null){
          var body = JSON.parse(error._body); //pasar a JSON el cuerpo del error que viene en string
          this.errorMessage = body.message;
          console.log(error);
        }

      }
    );
  }

  logout(){  //para cerrar sesion
    localStorage.removeItem('identity');
    localStorage.removeItem('token');
     localStorage.clear(); // elimina lo que esta en el localstorage
    this.identity = null;
    this.token = null;
    this._router.navigate(['/']); //redireccionamiento a / en url
    //localStorage.clear();
    //this.identity.email=null;
   // this.identity.password=null;


  }


  onSubmitRegister(){

    console.log(this.user_register);

    this._userService.register(this.user_register).subscribe(
        response  =>{
            let user = response.user; //este es el usuario ya registrado correctamente
            this.user_register = user; //el usuario a registrarse se convierte en usuario registrado

          if(!user._id){
            this.alertRegister = 'Error al registrarse!';
          }else{
              this.alertRegister = 'El registro se ha realizado correctamente, identificate con ' + this.user_register.email;
              this.user_register  = new User('','','', '','', 'ROLE_USER',''); //  para que pueda crear un usuario nuevo si sale error

          }

        },
      error => {
        console.log(error);
        var errorMessage = <any>error; // any es cualquier tipo

        if (errorMessage != null) {
          var body = JSON.parse(error._body); //pasar a JSON el cuerpo del error que viene en string
          this.alertRegister = body.message; //una vez mas es pasado alertRegister (que es usado en el formulario de refistro) como propiedad mediante setter
          console.log(error);

        }
      }
        );
  }


}
