import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse, HttpResponse, HttpResponseBase } from '@angular/common/http';
import { environment } from 'src/environments/environment';

//? Interfaces
import {Singup,Singin,Login} from '../../models/Auth.interface'
import {User} from '../../models/User.interface'

//?Servicios
import { Router } from '@angular/router';
import { Notificacion } from '../../models/Notificacion';

@Injectable({
  providedIn: 'root'
})
export class NotificacionesService {

  private urlNotificaciones:string = environment.urlServerApi+'notificaciones';

  constructor(private http: HttpClient,private _router:Router) { }

  getActual(){
    return this.http.get<any>(this.urlNotificaciones+"/actual",{observe:'response'})
  }
  findByUserId(id:any){
    return this.http.get<any>(this.urlNotificaciones+"/findByUserId/"+id)
  }
  delete(id:any){
    return this.http.delete<any>(this.urlNotificaciones+"/"+id)
  }
  create(Notificacion:Notificacion){
    return this.http.post<any>(this.urlNotificaciones+"/create",Notificacion)
  }
  show(id:any){
    return this.http.get<any>(this.urlNotificaciones+"/"+id);
  }
  update(id:any,Notificacion:Notificacion){
    return this.http.put<any>(this.urlNotificaciones+"/"+id,Notificacion);
  }
  isFromActualUser(id:number){
    return this.http.get<any>(this.urlNotificaciones+"/isFromActualUser/"+id);
  }

  putLeido(id:number){
    return this.http.put<any>(this.urlNotificaciones+"/putLeido/"+id,null);
  }
  findUserNotificacionesNoLeidas(id:number){
    return this.http.get<any>(this.urlNotificaciones+"/findUserNotificacionesNoLeidas/"+id,{observe:'response'});
  }


}
