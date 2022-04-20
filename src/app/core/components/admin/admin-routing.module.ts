import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { TemplateComponent } from './template/template.component';
//?Guards
import { AuthGuard } from '../../guards/auth.guard';
import { UpdateComponent } from '../../../shared/components/auth/update/update.component';
import { DashboardComponent } from './admin-components/sub-menus/dashboard/dashboard.component';
const routes: Routes = [
  {
    path:'',
    component:TemplateComponent,
    children:[
      {path: 'auth/update',component:UpdateComponent},
      {path: '',component:DashboardComponent},
      
      {path:'**',redirectTo: ''},
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AdminRoutingModule { }
