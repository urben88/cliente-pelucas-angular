import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CoreComponent } from './core.component';
import { SharedModule } from '../shared/shared.module';
import { CoreRoutingModule } from './core-routing.module';
import { AuthModule } from './components/auth/auth.module';
import { HomeComponent } from './components/home/home.component';


@NgModule({
  declarations: [
    CoreComponent,
    HomeComponent
  ],
  imports: [
    CommonModule,
    CoreRoutingModule,
    AuthModule,
    SharedModule,
  ]
})
export class CoreModule { }
