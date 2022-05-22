import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, RouterStateSnapshot, UrlTree } from '@angular/router';
import { Observable } from 'rxjs';
//? Servicio
import { AuthService } from '../services/db/auth.service';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {
  // canActivate(
  //   route: ActivatedRouteSnapshot,
  //   state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
  //   return true;
  // }
  constructor(
    private _auth:AuthService,
    private _router:Router
  ){}

  canActivate():boolean{
    if(this._auth.loggedIn()){
      return true;
    }
    this._router.navigate(['/auth/login']);
    return false;
  }
}
