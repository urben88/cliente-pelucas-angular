import { Component, OnInit } from '@angular/core';
import { User } from '../../../../../models/User.interface';
import { UsersService } from '../../../../../services/db/users.service';

import { Solicitud } from '../../../../../models/Solicitud.interface.';
import { SolicitudesService } from '../../../../../services/db/solicitudes.service';
import { HttpErrorResponse } from '@angular/common/http';
import { SetSolicitudesService } from '../../../../../services/forComponents/set-solicitudes.service';

@Component({
  selector: 'app-solicitudes',
  templateUrl: './solicitudes.component.html',
  styleUrls: ['./solicitudes.component.scss']
})
export class SolicitudesComponent implements OnInit {

  constructor(
    private _user:UsersService,
    private _solicitudes:SolicitudesService,
    private SetSolicitudesService:SetSolicitudesService
  ) { }

  users!:User[];
  solicitudes!:Solicitud[]|null;
  userSelected!:User|null;
  solicitudSelected!:Solicitud|null;

  solicitud!:Solicitud|null;

  userHave:boolean = false;
  ngOnInit(): void {
   this.getUsers();
   this.getSolicitudes();
  }

  actualizar(){
    this.solicitud = null;
    this.SetSolicitudesService.setSolicitud(null)
    this.userSelected = null;
    this.solicitudSelected = null;
    this.solicitudes = [];
    this.users = [];
    this.getSolicitudes();
    this.getUsers();
  }
  //? Obtener solicitudes
  getSolicitudes(){
    this._solicitudes.getAllSimple().subscribe(
      (res:Solicitud[])=>{
        console.log(res,'solicitudes')
        this.solicitudes = res;
      },
      (err:HttpErrorResponse)=>{
        console.log(err)
      }
    )
  }
  //? Obtener usuarios
  getUsers(){
    this._user.getUsers().subscribe(
      (res:User[])=>{
        console.log(res)
        this.users = res;
      },
      (err:any)=>{
        console.log(err)
      }
    )
  }
  //? Método para obtener el usuario seleccionado
  userSelect(event:any){
    this.userSelected = null;
    this.solicitudSelected = null;
    this.solicitud=null;
    this.SetSolicitudesService.setSolicitud(null)
    console.log(event,"eventoooo")
    if(event){
      this.userSelected = event;
      console.log(this.userSelected)
      this._solicitudes.userHave(this.userSelected?.id).subscribe(
        (res:any)=>{
          console.log(res)
          this.userHave = res.have;
          if(this.userHave){
            this._solicitudes.getOneByUser(this.userSelected?.id).subscribe(
              (res:Solicitud)=>{
                this.solicitud = res;
                this.SetSolicitudesService.setSolicitud(this.solicitud)
              },
              (err)=>{
                console.error(err);
              }
            )
          }
        },
        (err:HttpErrorResponse)=>{
          console.error(err)
        },
      )
    }else{
      this.solicitud=null;
    }
    console.log( this.solicitud,"SOLICITUDDDD")
  }
  solicitudSelect(event:any){
    this.userSelected = null;
    this.solicitudSelected = null;
    this.solicitud=null;
    this.SetSolicitudesService.setSolicitud(null)
    console.log(event,"eventoooo")
    if(event){
      this.solicitudSelected = event;
      console.log(this.solicitudSelected?.id)
      this._solicitudes.userHave(this.solicitudSelected?.user_id).subscribe(
        (res:any)=>{
          console.log(res)
          this.userHave = res.have;
          if(this.userHave){
            this._solicitudes.getOneByUser(this.solicitudSelected?.user_id).subscribe(
              (res:Solicitud)=>{
                this.solicitud = res;
                this.SetSolicitudesService.setSolicitud(this.solicitud)

              },
              (err)=>{
                console.error(err);
              }
            )
          }
        },
        (err:HttpErrorResponse)=>{
          console.error(err)
        },
      )
    }else{
      this.solicitud=null;
    }
    console.log( this.solicitud,"SOLICITUDDDD")

  }

  passId(){
    if(this.userSelected){
      return this.userSelected.id;
    }else if(this.solicitudSelected){
      return this.solicitudSelected.user_id;
    }else{
      return 0;
    }
  }
}
