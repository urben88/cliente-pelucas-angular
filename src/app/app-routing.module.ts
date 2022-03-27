import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

//? Componentes
import { PeliculasListComponent } from './components/peliculas-list/peliculas-list.component'
const routes: Routes = [
  {
    path: '',redirectTo:'/games', pathMatch: 'full'
  },
  {
    path:'games',
    component: PeliculasListComponent
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
