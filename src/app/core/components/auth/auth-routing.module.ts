import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './pages/login/login.component';
import { RegisterComponent } from './pages/register/register.component';
import { UserSettingsComponent } from './pages/user-settings/user-settings.component';
//?Guards
import { AuthGuard } from '../../guards/auth.guard';
import { TemplateComponent } from './template/template.component';
const routes: Routes = [
  {
    path:'',
    component:TemplateComponent,
    children:[
      {path:'login',component: LoginComponent },
      {path:'register',component: RegisterComponent},
      {path:'settings',component:UserSettingsComponent,canActivate:[AuthGuard]},
      {path:'**',redirectTo: 'login'},
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AuthRoutingModule { }
