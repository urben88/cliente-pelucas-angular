import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';

//?Para los observables
import { Observable, Subject } from 'rxjs';
//? Interfaces
import {Singup,Singin,Login} from '../../models/Auth.interface'
import {User,Rol} from '../../models/User.interface'

//?Enums
import { RolesEnum } from '../../enums/Roles';
//?Servicios
import { ResolveStart, Router } from '@angular/router';
@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private urlAuth:string = environment.urlServerApi+'auth';

  private statusToken$:Subject<boolean>;
  
  constructor(
    private http: HttpClient,
    private _router:Router,
    ) {
      this.statusToken$ = new Subject;
  }

  getStatusToken$():Observable<boolean>{
    return this.statusToken$.asObservable();
  }
  //!Peticiones HTTP
  singup(user:User){
    return this.http.post<Singup>(this.urlAuth +'/singup',user)

  }
  
  singin(user:Login){
    return this.http.post<Singin>(this.urlAuth +'/singin',user)

  }
  updateUser(data:any){
    return this.http.put<any>(this.urlAuth+'/update',data)
  }

  refreshToken(){
    let newToken = this.http.get<any>(this.urlAuth +'/refresh').subscribe(
      (res)=>{
        localStorage.setItem('token',res.token)
        console.log("📗 Se ha hecho refresh el token")
        this.statusToken$.next(true)
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
    this.statusToken$.next(false)

  }
  isAdmin(user:User){
    let admin:boolean = false;
    user.rol?.forEach((rol:Rol)=>{
      if(rol.role == RolesEnum.admin){
        admin=true;
      }
    })
    return admin;
  }

  setToken(token:string){
    localStorage.setItem('token',token)
    this.statusToken$.next(true)

  }
  getToken(){
    return localStorage.getItem('token')
  }
  getUser(){
    // this.statusToken$.next(true)
    return this.http.get<any>(this.urlAuth + '/user')
  }

}
