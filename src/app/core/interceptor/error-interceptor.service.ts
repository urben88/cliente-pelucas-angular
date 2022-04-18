import { Injectable } from '@angular/core';
import { HttpEvent, HttpHandler, HttpInterceptor, HttpRequest } from '@angular/common/http';
import { catchError, Observable, throwError } from 'rxjs';
import { Router } from '@angular/router';
import { ErrorPost } from '../models/Error.interface';

//? Aqui vamos a capturar todos los errores mas comunes en las peticiones a la API.

@Injectable({
  providedIn: 'root'
})
export class ErrorInterceptorService implements HttpInterceptor {

  constructor(private router:Router) { }

  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    //?Con esto marcamos que queremos hacer un pipe del contenido despues de la peticion
     return next.handle(req).pipe(
        catchError((err)=> {
          // console.log(err);
          if([500].indexOf(err.status)){
            if(err.name == "TokenExpiredError"){
                this.router.navigate(['/auth/login'])
                localStorage.removeItem('token')
            }
          }
          //? Si es otro error que no sean los del if pues que deje pasar el error
          return throwError(err)
        })
     );
  }
}
