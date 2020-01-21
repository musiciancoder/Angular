import {Component, OnInit} from '@angular/core';

import {UserService} from '../services/user.service';
import {User} from '../models/user';


//Componente para editar los datos de un usuario
@Component({
  selector: 'user-edit',
  templateUrl: '../views/user-edit.html',
  providers: [UserService]
})

export class UserEditComponent implements OnInit{
  public titulo:string;
  public  user:User;
  public identity;
  public token
  public alertMessage

  constructor(
    private _userService: UserService
  ) {
    this.titulo = 'Actualizar mis datos';
    this.identity = this._userService.getIdentity(); //para obtener datos del usuario del localstorage.
    this.token=this._userService.getToken();
    this.user = this.identity; //para que reconozca que no es usuario nuevo, sino el mismo usuario ya logeado correctamente
  }


  ngOnInit(){

    console.log('user-edit.component.ts cargado');

  }

  onSubmit() {
    console.log(this.user);

    this._userService.updateUser(this.user).subscribe(
      response => {
      if(!response.user){
        this.alertMessage = 'El usuario no se ha actualizado';
      }else{
        //this.user = response.user; //acá reemplazamos el usuario antiguo (this.identity) con el usuario nuevo proveniente de la api (response.user)
          localStorage.setItem('identity', JSON.stringify(this.user) ); // el nuevo usuario
          this.alertMessage = 'Datos actualizados correctamente';
          document.getElementById("identity_name").innerHTML = this.user.name; //para que muestre el usuario ya actualizado en el DOM sin necesidad de recargar la pagina
      }
      },
      error => {
        var errorMessage = <any>error; // any es cualquier tipo

        if(errorMessage != null){
          var body = JSON.parse(error._body); //pasar a JSON el cuerpo del error que viene en string
          this.alertMessage = body.message; //el alertMessage va al formulario
          console.log(error);
        }

      }


    );
  }

}
