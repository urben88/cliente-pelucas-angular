import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
//Reproductor de youtube
import { YouTubePlayerModule } from '@angular/youtube-player';

//! Importes del PrimeNg
import {CardModule} from 'primeng/card';
import {ButtonModule} from 'primeng/button';
import {AccordionModule} from 'primeng/accordion';     //accordion and accordion tab
import {MenuItem} from 'primeng/api';                  //api

import { SharedComponent } from './shared.component';
import { NavComponent } from './components/nav/nav.component';
import { FooterComponent } from './components/footer/footer.component';



@NgModule({
  declarations: [
    SharedComponent,
    NavComponent,
    FooterComponent
  ],
  imports: [
    CommonModule,
    YouTubePlayerModule,
    CardModule,
    ButtonModule,
    AccordionModule
  ],
  exports:[
    NavComponent,
    FooterComponent,
    YouTubePlayerModule,
    CardModule,
    ButtonModule,
    AccordionModule
  ]
})
export class SharedModule { }
