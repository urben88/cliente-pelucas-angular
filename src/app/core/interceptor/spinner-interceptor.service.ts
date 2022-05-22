import { Injectable } from '@angular/core';
import { HttpEvent, HttpHandler, HttpInterceptor, HttpRequest } from '@angular/common/http';
import { delay, finalize, Observable } from 'rxjs';
import { SpinnerService } from '../services/spinner.service';


@Injectable({
  providedIn: 'root'
})
export class SpinnerInterceptorService implements HttpInterceptor {

  constructor(private _spinner:SpinnerService) { }
  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    this._spinner.show();
    return next.handle(req).pipe(
      finalize( ()=> {
        this._spinner.hide()
      })
    )
  }
}
