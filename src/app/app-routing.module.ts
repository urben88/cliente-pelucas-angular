import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { NavComponent } from './shared/components/nav/nav.component';

const routes: Routes = [
  //? Ruta para la página principal
  {path:'',
    loadChildren: () => import('./core/core.module').then( m => m.CoreModule)
  },
 

];

@NgModule({
  imports: [RouterModule.forRoot(routes,{
    scrollPositionRestoration:'enabled',
    //? Este parámetro es para evitar el error de rutas al desplegar la aplicación angular
    useHash:true
  })],
  exports: [RouterModule]
})
export class AppRoutingModule { }
