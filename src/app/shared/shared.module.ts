import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
//Reproductor de youtube
import { YouTubePlayerModule } from '@angular/youtube-player';

import { RouterModule } from '@angular/router';
//! Importes del PrimeNg
import {CardModule} from 'primeng/card';
import {ButtonModule} from 'primeng/button';
import {AccordionModule} from 'primeng/accordion';     //accordion and accordion tab
import {MenuItem} from 'primeng/api';                  //api
import {InputTextModule} from 'primeng/inputtext';
import { FormsModule } from '@angular/forms';
import {InputNumberModule} from 'primeng/inputnumber';
import {PasswordModule} from 'primeng/password';
import { DividerModule } from "primeng/divider";
import {MessagesModule} from 'primeng/messages';
import {MessageModule} from 'primeng/message';
import {DropdownModule} from 'primeng/dropdown';

import { SharedComponent } from './shared.component';
import { NavComponent } from './components/nav/nav.component';
import { FooterComponent } from './components/footer/footer.component';



@NgModule({
  declarations: [
    SharedComponent,
    NavComponent,
    FooterComponent,
  ],
  imports: [
    CommonModule,
    YouTubePlayerModule,
    CardModule,
    ButtonModule,
    AccordionModule,
    InputTextModule,
    FormsModule,
    RouterModule,
    DropdownModule
  ],
  exports:[
    NavComponent,
    FooterComponent,
    YouTubePlayerModule,
    CardModule,
    ButtonModule,
    AccordionModule,
    InputTextModule,
    FormsModule,
    InputNumberModule,
    PasswordModule,
    DividerModule,
    MessageModule,
    MessagesModule,
    DropdownModule
  ]
})
export class SharedModule { }
