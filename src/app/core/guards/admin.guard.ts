import { HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivateChild, Router, RouterStateSnapshot, UrlTree } from '@angular/router';
import { catchError, map, Observable, of } from 'rxjs';
import { User } from '../models/User.interface';
import { AuthService } from '../services/db/auth.service';
import { IsAdminService } from '../services/forComponents/is-admin.service';

@Injectable({
  providedIn: 'root'
})
export class AdminGuard implements CanActivateChild {

  constructor(
    private _auth: AuthService,
    private _router:Router,
    private _isAdmin:IsAdminService
  ) { }

  canActivateChild(childRoute: ActivatedRouteSnapshot, state:any){
      
    //! Solucion antigua usando un servicio (No he eliminado los emit del login y register)
      // if(this._auth.getToken()){
      //   console.log(this._isAdmin.value)
      //   return this._isAdmin.value
      // }else{
      //   return false;
      // }
      return this._auth.getUser()
        .pipe(

          //?Si es correcta
          map((res:any) => this._auth.isAdmin(res)),

          catchError(() => {
            return of(this._router.createUrlTree(['/']))
         })

        )

  }
    

}
