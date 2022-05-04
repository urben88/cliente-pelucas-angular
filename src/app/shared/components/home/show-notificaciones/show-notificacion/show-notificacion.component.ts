import { HttpErrorResponse } from '@angular/common/http';
import { Component, Input, OnChanges, OnInit, SimpleChanges, ViewEncapsulation } from '@angular/core';
import { Router } from '@angular/router';
import { Notificacion } from 'src/app/core/models/Notificacion';
import { NotificacionesService } from 'src/app/core/services/db/notificaciones.service';

@Component({
  selector: 'app-show-notificacion',
  templateUrl: './show-notificacion.component.html',
  styleUrls: ['./show-notificacion.component.scss'],
})
export class ShowNotificacionComponent implements OnInit,OnChanges{

  constructor(
    private _notificaciones:NotificacionesService,
    private _router:Router
  ) { }

  notificacion!:Notificacion;
  ngOnChanges(changes: SimpleChanges): void {
    if(changes['id']){

        this._notificaciones.show(changes['id'].currentValue).subscribe(
          (res:Notificacion)=>{
            console.log(res);
            if(res){
              this.notificacion = res;
            }else{
              // this._router.navigate(['/notificaciones',false])
            }
          },
          (err:HttpErrorResponse)=>{
            console.error(err)
            // this._router.navigate(['/notificaciones'])
          }
        )
        
    }
  }


  @Input() id!:number;
  ngOnInit(): void {

  }

}
