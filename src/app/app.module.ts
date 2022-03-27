import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { NavigationComponent } from './components/navigation/navigation.component';
import { PeliculasFormComponent } from './components/peliculas-form/peliculas-form.component';
import { PeliculasListComponent } from './components/peliculas-list/peliculas-list.component';
import { HttpClientModule } from '@angular/common/http';
//? Servicios
import { PeliculasService } from './services/peliculas.service';
@NgModule({
  declarations: [
    AppComponent,
    NavigationComponent,
    PeliculasFormComponent,
    PeliculasListComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule
  ],
  providers: [
    PeliculasService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
