import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HomeComponent } from './pages/home/home.component';
import { MainRoutingModule } from './main-routing.module';
import { SharedModule } from 'src/app/shared/shared.module';
import { CentrosComponent } from './pages/centros/centros.component';
import { NotificacionesComponent } from './pages/notificaciones/notificaciones.component';
import { NotificacionComponent } from './pages/notificaciones/notificacion/notificacion.component';



@NgModule({
  declarations: [
    HomeComponent,
    CentrosComponent,
    NotificacionesComponent,
    NotificacionComponent
  ],
  imports: [
    CommonModule,
    SharedModule,
    MainRoutingModule,
  ]
})
export class MainModule { }
