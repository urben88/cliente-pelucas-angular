import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
//Reproductor de youtube
import { YouTubePlayerModule } from '@angular/youtube-player';

import { RouterModule } from '@angular/router';
//! Importes del PrimeNg
import {CardModule} from 'primeng/card';
import {ButtonModule} from 'primeng/button';
import {AccordionModule} from 'primeng/accordion';     //accordion and accordion tab
import {ConfirmationService, MenuItem, MessageService} from 'primeng/api';                  //api
import {InputTextModule} from 'primeng/inputtext';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import {InputNumberModule} from 'primeng/inputnumber';
import {PasswordModule} from 'primeng/password';
import { DividerModule } from "primeng/divider";
import {MessagesModule} from 'primeng/messages';
import {MessageModule} from 'primeng/message';
import {DropdownModule} from 'primeng/dropdown';
import {AvatarModule} from 'primeng/avatar';
import {AvatarGroupModule} from 'primeng/avatargroup';
import {BadgeModule} from 'primeng/badge';
import {ScrollPanelModule} from 'primeng/scrollpanel';
import {ProgressSpinnerModule} from 'primeng/progressspinner';
import {ToastModule} from 'primeng/toast';
import {ConfirmPopupModule} from 'primeng/confirmpopup';
import {PanelModule} from 'primeng/panel';
import {InputSwitchModule} from 'primeng/inputswitch';
import {BreadcrumbModule} from 'primeng/breadcrumb';
import {TableModule} from 'primeng/table';
import {CheckboxModule} from 'primeng/checkbox';

import { SharedComponent } from './shared.component';
import { NavComponent } from './components/nav/nav.component';
import { FooterComponent } from './components/footer/footer.component';
import { SpinnerComponent } from './components/spinner/spinner.component';
import { UpdateComponent } from './components/auth/update/update.component';
import { UserEditTableComponent } from './components/admin/user-edit-table/user-edit-table.component';


@NgModule({
  declarations: [
    SharedComponent,
    NavComponent,
    FooterComponent,
    SpinnerComponent,
    UpdateComponent,
    UserEditTableComponent,
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
    DropdownModule,
    AvatarModule,
    AvatarGroupModule,
    BadgeModule,
    ScrollPanelModule,
    ProgressSpinnerModule,
    ToastModule,
    ConfirmPopupModule,
    PanelModule,
    InputSwitchModule,
    ReactiveFormsModule,
    BreadcrumbModule,
    TableModule,
    CheckboxModule
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
    DropdownModule,
    SpinnerComponent,
    ProgressSpinnerModule,
    ToastModule,
    ConfirmPopupModule,
    ScrollPanelModule,
    PanelModule,
    InputSwitchModule,
    UpdateComponent,
    BreadcrumbModule,
    UserEditTableComponent,
    TableModule,
    CheckboxModule
  ],
  providers: [MessageService,ConfirmationService]
})
export class SharedModule { }
