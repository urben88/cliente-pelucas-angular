import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AdminRoutingModule } from './admin-routing.module';
import { SharedModule } from 'src/app/shared/shared.module';
import { TemplateComponent } from './template/template.component';
import { MenuComponent } from './admin-components/menu/menu.component';
import { SubMenuComponent } from './admin-components/sub-menu/sub-menu.component';

import {ScrollPanelModule} from 'primeng/scrollpanel';
import { NavComponent } from './admin-components/nav/nav.component';

@NgModule({
  declarations: [
    MenuComponent,
    TemplateComponent,
    SubMenuComponent,
    NavComponent
  ],
  imports: [
    CommonModule,
    AdminRoutingModule,
    SharedModule,
  ]
})
export class AdminModule { }
