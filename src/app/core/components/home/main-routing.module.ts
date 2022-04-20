import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './pages/home/home.component';

//?Guards
import { AuthGuard } from '../../guards/auth.guard';
import { TemplateComponent } from './template/template.component';
const routes: Routes = [
  {
    path:'',
    component:TemplateComponent,
    children:[
      {path:'',component:HomeComponent},
      {path:'**',redirectTo: ''},
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class MainRoutingModule { }