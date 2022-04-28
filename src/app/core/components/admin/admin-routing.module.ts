import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { TemplateComponent } from './template/template.component';
//?Guards
import { AuthGuard } from '../../guards/auth.guard';
import { UpdateComponent } from '../../../shared/components/auth/update/update.component';
import { DashboardComponent } from './admin-components/sub-menus/dashboard/dashboard.component';
import { UsersComponent } from './admin-components/sub-menus/users/users.component';
import { CentrosComponent } from './admin-components/sub-menus/centros/centros.component';
import { NotificacionesComponent } from './admin-components/sub-menus/notificaciones/notificaciones.component';
const routes: Routes = [
  {
    path:'',
    component:TemplateComponent,
    children:[
      {path: 'auth/update',component:UpdateComponent},
      {path: 'dashboard',component:DashboardComponent},
      {path: 'users',component:UsersComponent},
      {path: 'centros',component:CentrosComponent},
      {path: 'notificaciones',component:NotificacionesComponent},
      
      {path:'**',redirectTo: 'dashboard'},
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AdminRoutingModule { }
