import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './pages/home/home.component';

//?Guards
import { AuthGuard } from '../../guards/auth.guard';
import { TemplateComponent } from './template/template.component';
import { UserSettingsComponent } from '../auth/pages/user-settings/user-settings.component';
import { CentrosComponent } from './pages/centros/centros.component';
import { NotificacionesComponent } from './pages/notificaciones/notificaciones.component';
import { NotificacionComponent } from './pages/notificaciones/notificacion/notificacion.component';
const routes: Routes = [
  {
    path:'',
    component:TemplateComponent,
    children:[
      {path:'',component:HomeComponent},
      {path:'auth/settings',component:UserSettingsComponent,canActivate:[AuthGuard]},
      {path:'centros',component:CentrosComponent},
      {path:'notificaciones',component:NotificacionesComponent},
      {path:'notificacion/:id',component:NotificacionComponent},
      
      // {path:'**',redirectTo: ''},
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class MainRoutingModule { }