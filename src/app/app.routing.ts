import {ModuleWithProviders} from '@angular/core';
import {Routes, RouterModule} from '@angular/router';

//import user
import  {UserEditComponent} from './components/user_edit.component';

const appRoutes: Routes = [
  {path:'', component: UserEditComponent}, //'nombreUrl', componente
  {path:'mis-datos', component: UserEditComponent},
  {path:'**', component: UserEditComponent}

];

export const appRoutingProviders: any[] = []; //configuracion necesaria para el router (fue lo unico que victor dijo) //va hacia app.module
export const routing: ModuleWithProviders = RouterModule.forRoot(appRoutes);
