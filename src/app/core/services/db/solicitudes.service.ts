import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse, HttpResponse, HttpResponseBase } from '@angular/common/http';
import { environment } from 'src/environments/environment';

//? Interfaces
import {Singup,Singin,Login} from '../../models/Auth.interface'
import {User} from '../../models/User.interface'
import {Solicitud,Cabello,ChequeRegalo,Protesis,Textil} from '../../models/Solicitud.interface.'


//?Servicios
import { Router } from '@angular/router';
import { Notificacion } from '../../models/Notificacion';

@Injectable({
  providedIn: 'root'
})
export class SolicitudesService {

 
  private urlSolicitudes:string = environment.urlServerApi+'solicitudes';

  constructor(private http: HttpClient,private _router:Router) { }

  getAll(){
    return this.http.get<Solicitud[]>(this.urlSolicitudes +"/findAll")
  }
  getAllSimple(){
    return this.http.get<Solicitud[]>(this.urlSolicitudes +"/findAllSimple")
  }
  getOneByUser(id:any){
    return this.http.get<Solicitud>(this.urlSolicitudes +"/findOneByUser/"+id)
  }
  create(solicitud:any){
    return this.http.post<Solicitud>(this.urlSolicitudes +"/create",solicitud)
  }
  userHave(id:any){
    return this.http.get<Solicitud>(this.urlSolicitudes +"/userHave/"+id)
  }
  findOne(id:any){
    return this.http.get<Solicitud>(this.urlSolicitudes +"/findOne/"+id)
  }
  update(id:any,solicitud:Solicitud){
    return this.http.put<any>(this.urlSolicitudes+"/"+id,solicitud);
  }
  delete(id:any){
    return this.http.delete<any>(this.urlSolicitudes+"/"+id);
  }

}
