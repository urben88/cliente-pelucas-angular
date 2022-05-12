import { Component, OnInit } from '@angular/core';
import { User } from '../../../../../models/User.interface';
import { UsersService } from '../../../../../services/db/users.service';

import { Solicitud } from '../../../../../models/Solicitud.interface.';
import { SolicitudesService } from '../../../../../services/db/solicitudes.service';
import { HttpErrorResponse } from '@angular/common/http';

@Component({
  selector: 'app-solicitudes',
  templateUrl: './solicitudes.component.html',
  styleUrls: ['./solicitudes.component.scss']
})
export class SolicitudesComponent implements OnInit {

  constructor(
    private _user:UsersService,
    private _solicitudes:SolicitudesService
  ) { }

  users!:User[];
  solicitudes!:Solicitud[]|null;
  userSelected!:User|null;
  solicitudSelected!:Solicitud|null;

  solicitud!:Solicitud;

  userHave:boolean = false;
  ngOnInit(): void {
    this._user.getUsers().subscribe(
      (res:User[])=>{
        console.log(res)
        this.users = res;
      },
      (err:any)=>{
        console.log(err)
      }
    )
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
  //? Método para obtener el usuario seleccionado
  userSelect(event:any){
    this.userSelected = null;
    this.solicitudSelected = null;
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
    }
  }
  solicitudSelect(event:any){
    this.userSelected = null;
    this.solicitudSelected = null;
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
    }
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
