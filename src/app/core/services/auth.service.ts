import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';

//? Interfaces
import {Singup,Singin,Login} from '../models/Auth.interface'
import {User} from '../models/User.interface'

//?Servicios
import { Router } from '@angular/router';
@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private urlAuth:string = environment.urlServerApi+'auth';

  constructor(private http: HttpClient,private _router:Router) {

  }
  //!Peticiones HTTP
  singup(user:User){
    return this.http.post<Singup>(this.urlAuth +'/singup',user)
  }
  
  singin(user:Login){
    return this.http.post<Singin>(this.urlAuth +'/singin',user)
  }
  refreshToken(){
    let newToken = this.http.get<any>(this.urlAuth +'/refresh').subscribe(
      (res)=>{
        localStorage.setItem('token',res.token)
        console.log("📗 Se ha hecho refresh el token")
        return res.token;
      },
      (err)=>{
        throw "Error al hacer refresh del token"
      }
    );
  }
  //!Control de ACCESO

  //? Saber si estas logueado
  loggedIn(){
    return !!localStorage.getItem('token')
  }
  //? Desloguearte
  logout(){
    localStorage.removeItem('token')
    this._router.navigate(['/auth/login'])
  }
  setToken(token:string){
    localStorage.setItem('token',token)
  }
  getToken(){
    return localStorage.getItem('token')
  }
  getUser(){
    return this.http.get<any>(this.urlAuth + '/user')
  }

}
