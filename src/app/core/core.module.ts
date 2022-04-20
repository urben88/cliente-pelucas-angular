import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

//? Para hacer peticiones http
import { HttpClientModule} from '@angular/common/http';

import { CoreComponent } from './core.component';
import { SharedModule } from '../shared/shared.module';
import { CoreRoutingModule } from './core-routing.module';
import { AuthModule } from './components/auth/auth.module';
// import { HomeComponent } from './components/home/home.component';
import { ReactiveFormsModule } from '@angular/forms';
import { AdminModule } from './components/admin/admin.module';
import { TemplateComponent } from './components/home/template/template.component';
import { MainModule } from './components/home/main.module';

@NgModule({
  declarations: [
    CoreComponent,
    TemplateComponent
  ],
  imports: [
    CommonModule,
    CoreRoutingModule,
    AuthModule,
    SharedModule,
    ReactiveFormsModule ,
    HttpClientModule,
    AdminModule,
  ],
  exports: [
    SharedModule,
    // ReactiveFormsModule 
  ],
})
export class CoreModule { }
