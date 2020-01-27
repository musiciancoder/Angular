import {Component, OnInit} from '@angular/core';

import {GLOBAL} from '../services/global';
import {UserService} from '../services/user.service';
import {User} from '../models/user';


//Componente para editar los datos de un usuario
@Component({
  selector: 'user-edit', //esta es el tag <user-edit>
  templateUrl: '../views/user-edit.html',
  providers: [UserService]
})

export class UserEditComponent implements OnInit{
  public titulo:string;
  public  user:User;
  public identity;
  public token;
  public alertMessage;
  public url:string;


  constructor(
    private _userService: UserService
  ) {
    this.titulo = 'Actualizar mis datos';
    this.identity = this._userService.getIdentity(); //para obtener datos del usuario del localstorage.
    this.token=this._userService.getToken();
    this.user = this.identity; //para que reconozca que no es usuario nuevo, sino el mismo usuario ya logeado correctamente
    this.url = GLOBAL.url;
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
          document.getElementById("identity_name").innerHTML = this.user.name; //para que muestre el usuario ya actualizado en el DOM sin necesidad de recargar la pagina

        //para subir imagen...
        if(!this.filesToUpload){ //si no hay archivos cargados
            // Redireccion
      }else{
          console.log(this.url + 'upload-image-user/' + this.user._id);
          this.makeFileRequest(this.url + 'upload-image-user/' + this.user._id, [], this.filesToUpload)
          .then (
            (result:any)=> {
              this.user.image = result.image; //guardamos la respuesta en la propiedad image

              localStorage.setItem('identity', JSON.stringify(this.user) ); // el nuevo usuario

             let image_path = this.url+'get-image-user/'+this.user.image;
              document.getElementById("image-logged").setAttribute('src', image_path);

              console.log(this.user); //para ver si tiene la imagen
            }
          );

      }

        this.alertMessage = 'Datos actualizados correctamente';

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

  public filesToUpload: Array<File>; //array de tipo file

  //Fn para subir avatar
  fileChangeEvent(fileInput: any){  //como setter de java
    this.filesToUpload = <Array<File>>fileInput.target.files; //estos son los archivos que se han seleccionado en el input
    console.log(this.filesToUpload);
  }

  makeFileRequest(url: string, params: Array<string>, files: Array<File>){ //peticion ajax comun y corriente para enviar archivos al servidor
      var token = this.token; //this.token() lo habiamos obtenido de

    return new Promise(function (resolve, reject) {
      var formData: any = new FormData(); //To construct a FormData object that contains the data from an existing <form>, specify that form element when creating the FormData object https://developer.mozilla.org/en-US/docs/Web/API/FormData/Using_FormData_Objects
      var xhr = new XMLHttpRequest();

      for (var i = 0; i < files.length; i++) { //length es cantidad de archivos a subir
        formData.append('image', files[i], files[i].name); //clave, archivo, nombredearchivo
      }

      xhr.onreadystatechange = function () { //The readyState property holds the status of the XMLHttpRequest.

        //The onreadystatechange property defines a function to be executed when the readyState changes.
        if (xhr.readyState == 4) {
          if (xhr.status == 200) {
            resolve(JSON.parse(xhr.response))
          } else {
            reject(xhr.response);
          }
        }
      }
      xhr.open('POST', url,true);
      xhr.setRequestHeader('authoritation', token); //clave valor para enviar por header el token del usuario identificado
      xhr.send(formData);
    });

  }

}
