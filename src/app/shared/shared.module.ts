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
import {CascadeSelectModule} from 'primeng/cascadeselect';
import {GalleriaModule} from 'primeng/galleria';
//* Para los gráficos
import {ChartModule} from 'primeng/chart';
import { SharedComponent } from './shared.component';
import {GMapModule} from 'primeng/gmap';
import {InputTextareaModule} from 'primeng/inputtextarea';
import {EditorModule} from 'primeng/editor';
import {FieldsetModule} from 'primeng/fieldset';
import {MultiSelectModule} from 'primeng/multiselect';




import { NavComponent } from './components/nav/nav.component';
import { FooterComponent } from './components/footer/footer.component';
import { SpinnerComponent } from './components/spinner/spinner.component';
import { UpdateComponent } from './components/auth/update/update.component';
import { UserEditTableComponent } from './components/admin/user-edit-table/user-edit-table.component';
import { CentroEditTableComponent } from './components/admin/centro-edit-table/centro-edit-table.component';
import { SelecRowTableComponent } from './components/admin/selec-row-table/selec-row-table.component';
import { SelecRowPipe } from './pipes/inputs/selec-row.pipe';
import { ChangeDbAtPipe } from './pipes/change-db-at.pipe';
import { DeleteTableComponent } from './components/admin/delete-table/delete-table.component';
import { FormNotificacionesComponent } from './components/admin/form-notificaciones/form-notificaciones.component';
import { AlertDBerrorsComponent } from './components/generic/alert-dberrors/alert-dberrors.component';
import { IconRefreshComponent } from './components/generic/icon-refresh/icon-refresh.component';
import { ShowNotificacionesComponent } from './components/home/show-notificaciones/show-notificaciones.component';
import { ShowNotificacionComponent } from './components/home/show-notificaciones/show-notificacion/show-notificacion.component';
import { DatosClinicosFormComponent } from './components/user/datos-clinicos-form/datos-clinicos-form.component';
import { MedidasFormComponent } from './components/user/medidas-form/medidas-form.component';

// import { MapComponent } from './components/home/map/map.component';


@NgModule({
  declarations: [
    SharedComponent,
    NavComponent,
    FooterComponent,
    SpinnerComponent,
    UpdateComponent,
    UserEditTableComponent,
    CentroEditTableComponent,
    SelecRowTableComponent,
    SelecRowPipe,
    ChangeDbAtPipe,
    DeleteTableComponent,
    FormNotificacionesComponent,
    AlertDBerrorsComponent,
    IconRefreshComponent,
    ShowNotificacionesComponent,
    ShowNotificacionComponent,
    DatosClinicosFormComponent,
    MedidasFormComponent,
    

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
    CheckboxModule,
    CascadeSelectModule,
    ChartModule,
    GalleriaModule,
    GMapModule,
    InputTextareaModule,
    EditorModule,
    FieldsetModule,
    MultiSelectModule,
    InputNumberModule
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
    CheckboxModule,
    CascadeSelectModule,
    ChartModule,
    GalleriaModule,
    GMapModule,
    CentroEditTableComponent,
    SelecRowTableComponent,
    SelecRowPipe,
    ChangeDbAtPipe,
    DeleteTableComponent,
    FormNotificacionesComponent,
    InputTextareaModule,
    AlertDBerrorsComponent,
    EditorModule,
    IconRefreshComponent,
    ShowNotificacionesComponent,
    FieldsetModule,
    ShowNotificacionComponent,
    DatosClinicosFormComponent,
    MedidasFormComponent,
    MultiSelectModule,

  ],
  providers: [MessageService,ConfirmationService]
})
export class SharedModule { }
