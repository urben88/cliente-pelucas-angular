import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AuthRoutingModule } from './auth-routing.module';
import { LoginComponent } from './pages/login/login.component';
import { RegisterComponent } from './pages/register/register.component';
import { SharedModule } from 'src/app/shared/shared.module';
import { CoreModule } from '../../core.module';
import { ReactiveFormsModule } from '@angular/forms';
import { UserSettingsComponent } from './pages/user-settings/user-settings.component';
import { AdminModule } from '../admin/admin.module';
import { TemplateComponent } from './template/template.component';
import {InputSwitchModule} from 'primeng/inputswitch';
import { ConfirmationService, MessageService } from 'primeng/api';

// import { HttpClientModule} from '@angular/common/http';
@NgModule({
  declarations: [
    LoginComponent,
    RegisterComponent,
    UserSettingsComponent,
    TemplateComponent
  ],
  imports:[
    CommonModule,
    AuthRoutingModule,
    SharedModule,
    ReactiveFormsModule,
    AdminModule,
    // HttpClientModule
  ],
  providers:[
   [MessageService,ConfirmationService]
  ],
  exports:[
   
  ]
})
export class AuthModule { }
