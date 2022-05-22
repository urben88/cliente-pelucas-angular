import { HttpErrorResponse } from '@angular/common/http';
import { Component, Input, OnChanges, OnInit, SimpleChanges } from '@angular/core';
import { Notificacion } from 'src/app/core/models/Notificacion';
import { User } from 'src/app/core/models/User.interface';
import { NotificacionesService } from 'src/app/core/services/db/notificaciones.service';
import { TiposNotificaciones} from '../../../../core/enums/Notificaciones'
@Component({
  selector: 'app-show-notificaciones',
  templateUrl: './show-notificaciones.component.html',
  styleUrls: ['./show-notificaciones.component.scss']
})
export class ShowNotificacionesComponent implements OnInit,OnChanges{

  @Input() user!:User;

  notificaciones!:Notificacion[];
  success!:Notificacion[] | null;
  info!:Notificacion[]|null;
  warn!:Notificacion[]|null;

  constructor(
    private _notificaciones:NotificacionesService
  ) { }

  ngOnChanges(changes: SimpleChanges): void {
    if(changes['user']){
      this._notificaciones.findByUserId(this.user.id).subscribe(
        (res:Notificacion[])=>{
          console.log(res);
          this.notificaciones=res;
          this.filtrarNotificaciones();
          console.log(this.success)
          console.log(this.info)
          console.log(this.warn)
        },
        (err:HttpErrorResponse)=>{
          console.log(err);
        }

      )
    }
  }

  ngOnInit(): void {

  }

  filtrarNotificaciones(){
    this.success= this.notificaciones.filter( noti=> noti.tipo==TiposNotificaciones.success)
    this.warn= this.notificaciones.filter( noti=> noti.tipo==TiposNotificaciones.warn)
    this.info= this.notificaciones.filter( noti=> noti.tipo==TiposNotificaciones.info)
    if(this.success.length == 0){
      this.success= null;
    }
    if(this.warn.length == 0){
      this.warn= null;
    }
    if(this.info.length == 0){
      this.info= null;
    }
  }


}
