import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse, HttpResponse, HttpResponseBase } from '@angular/common/http';
import { environment } from 'src/environments/environment';

//?Servicios
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class DatosClinicosService {

  private urlDatosClinicos:string = environment.urlServerApi+'datos_clinicos';

  constructor(private http: HttpClient,private _router:Router) { }
  
  getActual(){
    return this.http.get<any>(this.urlDatosClinicos+"/actual")
  }
  findUserDatosClinicos(id:any){
    return this.http.get<any>(this.urlDatosClinicos+"/findUserDatosClinicos/"+id)
  }

  delete(id:any){
    return this.http.delete<any>(this.urlDatosClinicos+"/"+id)
  }
  
  create(notificacion:Notification){
    return this.http.post<any>(this.urlDatosClinicos+"/create",notificacion)
  }
  update(id:any,medidas:any){
    return this.http.put<any>(this.urlDatosClinicos+"/"+id,medidas)
  }
  

}
