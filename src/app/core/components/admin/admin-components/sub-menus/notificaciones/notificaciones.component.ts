import { Component, OnInit } from '@angular/core';

import { HttpErrorResponse } from '@angular/common/http';
import { Centro } from '../../../../../models/Centro.interface';
import { NotificacionesService } from '../../../../../services/db/notificaciones.service';
import { UsersService } from '../../../../../services/db/users.service';
import { User } from '../../../../../models/User.interface';
import { Notificacion } from '../../../../../models/Notificacion';
import medotos from '../../../../../utils/metodos'
import metodos from '../../../../../utils/metodos';

@Component({
  selector: 'app-notificaciones',
  templateUrl: './notificaciones.component.html',
  styleUrls: ['./notificaciones.component.scss']
})
export class NotificacionesComponent implements OnInit {

  constructor(private _notificaciones:NotificacionesService,private _users:UsersService) { }

  users!:User[];
  notificaciones!:Notificacion[];
  userSelect!:User|null;
  notificacionSelect!:Notificacion|null;
  metodos=metodos;

  ngOnInit(): void {
    this._users.getUsers().subscribe(
      (res)=>{
        this.users = res;
      },
      (err:HttpErrorResponse)=>{
        console.error(err)
      }
    )
  }
  seleccionaUser(event:User){
    this.userSelect = event;
    this.notificacionSelect = null;
    console.log(this.userSelect)
    console.log(event)
    if(event){
      this._notificaciones.findByUserId(this.userSelect.id).subscribe(
        (res)=>{
          this.notificaciones = res;
        },
        (err)=>{
          console.error(err)
        }
      )
    }
  }
  seleccionaNotificacion(event:any){
    console.log(event)
    this.notificacionSelect = event;

  }
  deletenoti(event:Notificacion){
    console.log(event)
    this._notificaciones.delete(event.id).subscribe(
      (res)=>{
        console.log("Eliminado correctamente")
        this.metodos.deleteArrayById(this.notificaciones,event.id)
      },
      (err)=>{
        console.error(err)
      }
    )
    
  }
  //? Se activa cuando el evento del formulario envia la nueva notificación (Esto es para que se actualice)
  meterListaNoti(evento:Notificacion){

    this.notificaciones.push(evento);
  }
  //?Para cuando haga una actualizacion
  cambiarNoti(event:Notificacion){
    this.notificaciones.forEach((elem,index)=>{
      if(elem.id == event.id){
        this.notificaciones[index]=event;
      }
    })
  }
}
