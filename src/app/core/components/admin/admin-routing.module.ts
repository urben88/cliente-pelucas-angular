import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { TemplateComponent } from './template/template.component';
//?Guards
import { AuthGuard } from '../../guards/auth.guard';
const routes: Routes = [
  {
    path:'',
    component:TemplateComponent,
    children:[
      {path:'**',redirectTo: ''},
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AdminRoutingModule { }
