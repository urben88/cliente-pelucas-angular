import { Component, OnInit } from '@angular/core';

import { HttpErrorResponse } from '@angular/common/http';
import { Centro } from '../../../../../models/Centro.interface';
import { NotificacionesService } from '../../../../../services/db/notificaciones.service';
import { UsersService } from '../../../../../services/db/users.service';
import { User } from '../../../../../models/User.interface';

@Component({
  selector: 'app-notificaciones',
  templateUrl: './notificaciones.component.html',
  styleUrls: ['./notificaciones.component.scss']
})
export class NotificacionesComponent implements OnInit {

  constructor(private _notificaciones:NotificacionesService,private _users:UsersService) { }

  users!:User[];
  notificaciones!:Notification[];
  userSelect!:User|null;

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
    console.log(this.userSelect)
    console.log(event)
    this._notificaciones.findByUserId(this.userSelect.id).subscribe(
      (res)=>{
        this.notificaciones = res;
      },
      (err)=>{
        console.error(err)
      }
    )
  }
  seleccionaNotificacion(event:any){
    console.log(event)
  }
}
