import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class MedidasService {
 
  private urlMedidas:string = environment.urlServerApi+'medidas';

  constructor(private http: HttpClient,private _router:Router) {}
  getActual(){
    return this.http.get<any>(this.urlMedidas+"/actual")
  }
  findUserMedidas(id:any){
    return this.http.get<any>(this.urlMedidas+"/findUserMedidas/"+id)
  }
  create(notificacion:Notification){
    return this.http.post<any>(this.urlMedidas+"/create",notificacion)
  }
  update(id:any,medidas:any){
    return this.http.put<any>(this.urlMedidas+"/"+id,medidas)
  }
  delete(id:any){
    return this.http.delete<any>(this.urlMedidas+"/"+id)
  }
}
