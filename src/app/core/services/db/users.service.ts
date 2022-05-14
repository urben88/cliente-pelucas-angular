import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse, HttpResponse, HttpResponseBase } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { Router } from '@angular/router';
import { User } from '../../models/User.interface';

@Injectable({
  providedIn: 'root'
})
export class UsersService {

  private urlUsers:string = environment.urlServerApi+'user';
  constructor(
    private http: HttpClient,
    private _router:Router,
  ) {

  }
  getUsers(){
    return this.http.get<User[]>(this.urlUsers)
  }
  updateUserAdmin(user:any){
    return this.http.post<User[]>(this.urlUsers+'/updateAdmin',user);
  }
  showOne(id:any){
    return this.http.get<User>(this.urlUsers+'/'+id);
  }
  getStatusDatos(id:any){
    return this.http.get<User>(this.urlUsers+'/getStatusDatos/'+id);
  }

}
