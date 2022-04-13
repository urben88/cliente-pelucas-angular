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

  //!Control de ACCESO

  //? Saber si estas logueado
  loggedIn(){
    return !!localStorage.getItem('token')
  }
  //? Desloguearte
  logout(){
    localStorage.removeItem('token')
    this._router.navigate(['/auth/register'])
  }

  getToken(){
    return localStorage.getItem('token')
  }
}
