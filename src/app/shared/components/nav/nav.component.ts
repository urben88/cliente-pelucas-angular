import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/app/core/services/db/auth.service';
import { NotificacionesService } from 'src/app/core/services/db/notificaciones.service';
import { Router } from '@angular/router';

//? Interfaces
import {User}from '../../../core/models/User.interface'
import { HttpErrorResponse, HttpResponseBase } from '@angular/common/http';
import {Notificacion} from '../../../core/models/Notificacion'

//?Enums
import { TiposNotificaciones } from 'src/app/core/enums/Notificaciones';
@Component({
  selector: 'app-nav',
  templateUrl: './nav.component.html',
  styleUrls: ['./nav.component.scss']
})
export class NavComponent implements OnInit {

  //? Se ralla al ir al register y no cambia por un error del css
  constructor( 
    public _auth:AuthService,
    private _router:Router,
    public _notificaciones:NotificacionesService
    ) { }

  notificaciones!:Notificacion[];
  notileng:string = String(0);
  user!:User;

   ngOnInit(){
    this._auth.getUser().subscribe(
      (res:User)=>{
        this.user = res;
      },
      (err:any)=>{
        throw err
      }
    )
    this._auth.getStatusToken$().subscribe(statustoken =>{

      if(statustoken){

        this._notificaciones.getActual().subscribe(
          (res)=>{
          console.log(res)
            if(res.status == 404){
              this.notileng = String(0);
            }else{
              console.log(res)
              this.notileng = String(res.body.length)
              this.notificaciones = res.body
            }
          },
          (err:HttpErrorResponse)=>{
            console.log(err.error)
         
          }
        )

      }

    })
  }
  irSettings(){
    this._router.navigate(['/auth/settings'])
  }

  colorFondoNoti(noti:Notificacion){
    if(noti.tipo == TiposNotificaciones.success) return "successNoti"
    if(noti.tipo == TiposNotificaciones.warn) return "warnNoti"
    if(noti.tipo == TiposNotificaciones.info) return "infoNoti"
    return '';
  }
    
}
