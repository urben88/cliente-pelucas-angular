import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { iif } from 'rxjs';
import { Notificacion } from 'src/app/core/models/Notificacion';
import { NotificacionesService } from 'src/app/core/services/db/notificaciones.service';


@Component({
  selector: 'app-notificacion',
  templateUrl: './notificacion.component.html',
  styleUrls: ['./notificacion.component.scss']
})
export class NotificacionComponent implements OnInit {

  constructor(
    private _activatedRoute:ActivatedRoute,
    private _notificaciones:NotificacionesService,
    private _router:Router
    ) { }

  notiId!:number;
  ngOnInit(): void {
    this._activatedRoute.params.subscribe((params:Params)=>{
      this._notificaciones.isFromActualUser(params['id']).subscribe(
        (res:Notificacion)=>{
            this.notiId = params['id'];
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
