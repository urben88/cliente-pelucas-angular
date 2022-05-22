import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { iif } from 'rxjs';
import { Notificacion } from 'src/app/core/models/Notificacion';
import { NotificacionesService } from 'src/app/core/services/db/notificaciones.service';
import { NotificacionesNavService } from '../../../../../services/forComponents/notificaciones/notificaciones-nav.service';


@Component({
  selector: 'app-notificacion',
  templateUrl: './notificacion.component.html',
  styleUrls: ['./notificacion.component.scss']
})
export class NotificacionComponent implements OnInit {

  constructor(
    private _activatedRoute:ActivatedRoute,
    private _notificaciones:NotificacionesService,
    private _router:Router,
    private NotificacionesNavService:NotificacionesNavService
    ) { }

  notiId!:number;
  ngOnInit(): void {
    this._activatedRoute.params.subscribe((params:Params)=>{
      console.log("ID PARA NOTIFICACION",params['id'])
      this._notificaciones.isFromActualUser(params['id']).subscribe(
        (res:any)=>{
          if(!res.msg){
            this._notificaciones.putLeido(params['id']).subscribe(
              (noti)=>{
                  //?Creo subscripción para decirle al nav que se actualize
                  this.notiId = params['id'];
                  this.NotificacionesNavService.emitirEvento();
              },
              (err:HttpErrorResponse)=>{
                console.error(err)
              }
            )
          }
        },
        (err:HttpErrorResponse)=>{
          if(err.status == 404){
            this._router.navigate(['/notificaciones'])
          }
          console.error(err)
        }
      )
    })
  

  }


}
