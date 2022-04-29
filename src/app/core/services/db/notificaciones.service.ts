import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse, HttpResponse, HttpResponseBase } from '@angular/common/http';
import { environment } from 'src/environments/environment';

//? Interfaces
import {Singup,Singin,Login} from '../../models/Auth.interface'
import {User} from '../../models/User.interface'

//?Servicios
import { Router } from '@angular/router';

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

}
