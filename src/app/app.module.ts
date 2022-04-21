import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { CoreComponent } from './core/core.component';
import { CoreModule } from './core/core.module';
import { SharedModule } from './shared/shared.module';
import { StudentsModule } from './students/students.module';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import { RouterLinkActive } from '@angular/router';
import { CommonModule } from '@angular/common';
//?Servicios
import { AuthService } from './core/services/db/auth.service';
//?Guards
import { AuthGuard } from './core/guards/auth.guard';
//?Para los provide
import { HTTP_INTERCEPTORS } from '@angular/common/http';
import { TokenInterceptorService } from './core/interceptor/token-interceptor.service';
import { SpinnerInterceptorService } from './core/interceptor/spinner-interceptor.service';
import { ErrorInterceptorService } from './core/interceptor/error-interceptor.service';
@NgModule({
  declarations: [
    AppComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    CoreModule,
    SharedModule,
    BrowserAnimationsModule
  ],
  providers: [
    AuthService,
    AuthGuard,
    {
      provide:HTTP_INTERCEPTORS,
      useClass:TokenInterceptorService,
      multi:true
    },
    {
      provide:HTTP_INTERCEPTORS,
      useClass:SpinnerInterceptorService,
      multi:true
    },
    {
      provide:HTTP_INTERCEPTORS,
      useClass:ErrorInterceptorService,
      multi:true
    }
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
