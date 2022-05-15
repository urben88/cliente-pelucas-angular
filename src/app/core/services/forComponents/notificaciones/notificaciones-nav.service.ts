import { EventEmitter, Injectable } from '@angular/core';
import { NotificacionesService } from '../../db/notificaciones.service';
import { Notificacion } from '../../../models/Notificacion';
import { HttpErrorResponse, HttpRequest, HttpResponse } from '@angular/common/http';
import { AuthService } from '../../db/auth.service';
import { User } from '../../../models/User.interface';

@Injectable({
  providedIn: 'root'
})
export class NotificacionesNavService {

  constructor(
    private _notificaciones:NotificacionesService,
    private _auth:AuthService
    ) { } 
  $emitter = new EventEmitter();

  notificacionesNoleidas!:HttpResponse<any>;

  emitirEvento(){

      this._auth.getUser().subscribe(
        (res:User)=>{
          if(res.id){
            this._notificaciones.findUserNotificacionesNoLeidas(res.id).subscribe(
              (res2) => {
                console.log(res.id,"ID USER SERVICE")
                console.log("NOTIFICACIONES SERVICIO",res,res.id)
                this.notificacionesNoleidas = res2
                this.$emitter.emit(this.notificacionesNoleidas);
              },
              (err: HttpErrorResponse) => {
                console.log(err.error)
      
              }
            )
          }
        },
        (err:HttpErrorResponse)=>{
          console.error(err)
        }
      )
  }

}
