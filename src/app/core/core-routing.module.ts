import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { NavComponent } from '../shared/components/nav/nav.component';

//! He creado esta conexión de módulos para el LazyLoad

const routes: Routes = [ 

//todo Rutas principales
{path: '',
loadChildren: () => import('./components/home/main.module').then( m => m.MainModule)},

    
    //?Cargo las rutas para el registro
    {path: 'auth',
    loadChildren: () => import('./components/auth/auth.module').then( m => m.AuthModule)},
    //?Cargo las rutas para el admin
    {path: 'admin',
    loadChildren: () => import('./components/admin/admin.module').then( m => m.AdminModule)},
   
    
//todo Ruta cuando introduces una url inexistente (OJO EL ORDEN IMPORTA)
  {path:'**', redirectTo:''},

];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class CoreRoutingModule { }
