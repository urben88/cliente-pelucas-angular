import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse, HttpResponse, HttpResponseBase } from '@angular/common/http';
import { environment } from 'src/environments/environment';

//? Interfaces
import {Singup,Singin,Login} from '../../models/Auth.interface'
import {User} from '../../models/User.interface'

//?Servicios
import { Router } from '@angular/router';
import { Centro } from '../../models/Centro.interface';

@Injectable({
  providedIn: 'root'
})
export class CentrosService {
  
  private urlNotificaciones:string = environment.urlServerApi+'centros';

  constructor(private http: HttpClient,private _router:Router) { }

  getAll(){
    return this.http.get<any>(this.urlNotificaciones+"/")
  }
  findBy(attr:string,value:string){
    return this.http.get<any>(this.urlNotificaciones+"/findBy/"+attr+"/"+value)
  }
  update(centro:any){
    return this.http.put<any>(this.urlNotificaciones+"/update",centro);
  }
}
