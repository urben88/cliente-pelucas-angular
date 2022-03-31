import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SharedComponent } from './shared.component';
import { NavComponent } from './components/nav/nav.component';



@NgModule({
  declarations: [
    SharedComponent,
    NavComponent
  ],
  imports: [
    CommonModule
  ],
  exports:[
    NavComponent
  ]
})
export class SharedModule { }
