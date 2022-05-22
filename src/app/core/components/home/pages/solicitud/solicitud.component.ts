import { Component, OnInit } from '@angular/core';
import { AuthService } from '../../../../services/db/auth.service';
import { User } from '../../../../models/User.interface';
import { UsersService } from 'src/app/core/services/db/users.service';
import { HttpErrorResponse } from '@angular/common/http';
import { DatosClinicos } from '../../../../models/DatosClinicos';
import { Medidas } from '../../../../models/Medidas';
import { SolicitudesService } from '../../../../services/db/solicitudes.service';
import { Solicitud } from '../../../../models/Solicitud.interface.';

@Component({
  selector: 'app-solicitud',
  templateUrl: './solicitud.component.html',
  styleUrls: ['./solicitud.component.scss']
})
export class SolicitudComponent implements OnInit {

  constructor(
    private _auth:AuthService,
    private _user:UsersService,
    private _solicitud:SolicitudesService
  ) { }

  user!:User;
  userHave!:any;
  solicitud!:Solicitud;
  displayModal:boolean = false;
  modalmsg!:string;

  ngOnInit(): void {
    this.buscarDatos()
  }


  buscarDatos(){
     //?Obtener usuario
     this._auth.getUser().subscribe(
      (res:any)=>{
        this.user = res;

        //?Saber si tiene o no solicitud
        this._solicitud.userHave(this.user.id).subscribe(
          (res:any)=>{
            this.userHave = res.have;
              //? Obtener la solicitud
              this._solicitud.getOneByUser(this.user.id).subscribe(
                (res:Solicitud)=>{
                  this.solicitud = res;
                },
                (err:HttpErrorResponse)=>{
                  console.log(err)
                }
              )
          },
          (err:HttpErrorResponse)=>{
            console.error(err)
          }
        )
        

      }
    )
  }
  seElimina(){
    this.buscarDatos()
    this.modalmsg = "La solicitud se ha eliminado correctamente"
    this.displayModal = true;
  }
  newSolicitud(){
    this.buscarDatos()
    this.modalmsg = "La solicitud se ha creado correctamente"
    this.displayModal = true;
  }

}
