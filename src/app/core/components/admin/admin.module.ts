import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AdminRoutingModule } from './admin-routing.module';
import { SharedModule } from 'src/app/shared/shared.module';
import { TemplateComponent } from './template/template.component';
import { MenuComponent } from './admin-components/menu/menu.component';

import {ScrollPanelModule} from 'primeng/scrollpanel';
import { NavComponent } from './admin-components/nav/nav.component';
import { DashboardComponent } from './admin-components/sub-menus/dashboard/dashboard.component';
import { UsersComponent } from './admin-components/sub-menus/users/users.component';
import { CentrosComponent } from './admin-components/sub-menus/centros/centros.component';
import { NotificacionesComponent } from './admin-components/sub-menus/notificaciones/notificaciones.component';
import { MedidasComponent } from './admin-components/sub-menus/medidas/medidas.component';
import { DatosClinicosComponent } from './admin-components/sub-menus/datos-clinicos/datos-clinicos.component';
import { ChequesRegaloComponent } from './admin-components/sub-menus/cheques-regalo/cheques-regalo.component';

@NgModule({
  declarations: [
    MenuComponent,
    TemplateComponent,
    NavComponent,
    DashboardComponent,
    UsersComponent,
    CentrosComponent,
    NotificacionesComponent,
    MedidasComponent,
    DatosClinicosComponent,
    ChequesRegaloComponent
  ],
  imports: [
    CommonModule,
    AdminRoutingModule,
    SharedModule,
  ]
})
export class AdminModule { }
