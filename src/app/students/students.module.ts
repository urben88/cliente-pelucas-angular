import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { StudentsComponent } from './students.component';
import { EjemploFormComponent } from './ejemplo-form/ejemplo-form.component';



@NgModule({
  declarations: [
    StudentsComponent,
    EjemploFormComponent
  ],
  imports: [
    CommonModule
  ]
})
export class StudentsModule { }
