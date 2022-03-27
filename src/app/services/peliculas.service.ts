import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { Pelicula } from 'src/app/interfaces/Pelicula.interface';
@Injectable({
  providedIn: 'root'
})
export class PeliculasService {

  url = environment.API_URI+'peliculas/'
  constructor( private http:HttpClient) { }

  //Get
  getPeliculas(){
    return this.http.get(this.url)
  }
  getPeliculaById(id:string){
    return this.http.get(this.url+id)
  }

  //set
  setPelicula(peli:Pelicula){
    return this.http.post(this.url,peli)
  }

  //update
  updatePeli(id:number, peli:Pelicula){
    return this.http.put(this.url,peli)
  }

  //delete
  deletePeli(id:string){
    return this.http.delete(this.url+id)
  }
}
