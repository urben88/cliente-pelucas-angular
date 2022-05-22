import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse, HttpResponse, HttpResponseBase } from '@angular/common/http';
import { environment } from 'src/environments/environment';

//? Interfaces
import {Singup,Singin,Login} from '../../models/Auth.interface'
import {User} from '../../models/User.interface'
import {ChequeRegalo} from '../../models/ChequeRegalo'

//?Servicios
import { Router } from '@angular/router';
import { Centro } from '../../models/Centro.interface';

@Injectable({
  providedIn: 'root'
})
export class ChequesRegaloService {

  private urlChequesRegalo:string = environment.urlServerApi+'cheques_regalo';

  constructor(private http: HttpClient,private _router:Router) { }

  getAll(){
    return this.http.get<ChequeRegalo[]>(this.urlChequesRegalo+"/findAll")
  }
  findBy(attr:string,value:string){
    return this.http.get<ChequeRegalo[]>(this.urlChequesRegalo+"/findBy/"+attr+"/"+value)
  }
  create(cheque:ChequeRegalo){
    return this.http.post<any>(this.urlChequesRegalo+"/create",cheque)
  }
  update(id:any , cheque:any){
    return this.http.put<ChequeRegalo>(this.urlChequesRegalo+"/"+id,cheque)
  }
  delete(id:any){
    return this.http.delete<any>(this.urlChequesRegalo+"/"+id)
  }
  // findBy(attr:string,value:string){
  //   return this.http.get<any>(this.urlChequesRegalo+"/findBy/"+attr+"/"+value)
  // }
  // update(centro:any){
  //   return this.http.put<any>(this.urlChequesRegalo+"/update",centro);
  // }
}
