import { Component, OnInit } from '@angular/core';
import { UsersService } from '../../../../../services/db/users.service';
import { User, Rol } from '../../../../../models/User.interface';
import { RolesEnum } from '../../../../../enums/Roles';
import { CentrosService } from 'src/app/core/services/db/centros.service';
import { CentrosEnum } from 'src/app/core/enums/Centros';
import { Centro } from 'src/app/core/models/Centro.interface';
import { SolicitudesService } from 'src/app/core/services/db/solicitudes.service';
import { Solicitud } from 'src/app/core/models/Solicitud.interface.';
import { HttpErrorResponse } from '@angular/common/http';
import { FechasUtilService } from 'src/app/core/utils/fechas-util.service';
@Component({
  selector: 'admin-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent implements OnInit {

  userstable: any;
  centrostable: any;

  users!: User[];
  centros!: Centro[];

  solicitudes!:Solicitud[];
  solicitudesPendientes:any[] = [0,0,0,0,0,0,0,0,0,0,0,0];
  solicitudesAceptadas:any[] =  [0,0,0,0,0,0,0,0,0,0,0,0];

  basicData: any;
  basicOptions: any;

  usersJson = {
    adminlen: 0,
    receptorlen: 0,
    colaboradorlen: 0
  }
  centrosJson = {
    castellon: 0,
    valencia: 0,
    alicante: 0
  }

  constructor(
    private _users: UsersService,
    private _centros: CentrosService,
    private _solicitudes:SolicitudesService,
    private fechasUtil:FechasUtilService
    ) {}

  ngOnInit(): void {

    //* Usuarios
    this._users.getUsers().subscribe(
      (res) => {
        console.log("users", res)
        this.users = res;
        this.users.forEach((user: User) => {
          user.rol?.forEach((rol: Rol) => {
            if (rol.role == RolesEnum.admin) {
              this.usersJson.adminlen++;
            }
            if (rol.role == RolesEnum.colaborador) {
              this.usersJson.colaboradorlen++;
            }
            if (rol.role == RolesEnum.receptor) {
              this.usersJson.receptorlen++;
            }
          })
        })
        this.ponerDatosTabla()
      },
      (err) => {
        console.log(err)
      }
    )

    //*Centros
    this._centros.getAll().subscribe(
      (res) => {
        this.centros = res;
        this.centros.forEach((centro: Centro) => {
          switch (centro.provincia) {
            case CentrosEnum.Alicante:
              this.centrosJson.alicante++;
              break;
            case CentrosEnum.Castellon:
              this.centrosJson.castellon++;
              break;
            case CentrosEnum.Valencia:
              this.centrosJson.valencia++;
              break;
          }
        })
        this.ponerDatosDoughnut()
      },
      (err) => {

      }
    )

    //* Fechas
    
      this._solicitudes.getAll().subscribe(
        (res:Solicitud[])=>{
          this.solicitudes = res;
          console.log(res)
          this.datosSolicitudes();
          this.basicData = {
            labels: ['Enero', 'Febrero', 'Marzo', 'Abril', 'Mayo', 'Junio', 'Julio', 'Agosto', 'Septiembre', 'Octubre', 'Noviembre', 'Diciembre'],
            datasets: [
              {
                label: 'Solicitadas',
                backgroundColor: '#42A5F5',
                // data: [65, 59, 80, 81, 56, 55, 40, 20, 19, 24, 20, 49]
                data: this.solicitudesPendientes
              },
              {
                label: 'Aceptadas',
                backgroundColor: '#FFA726',
                // data: [28, 48, 40, 19, 86, 27, 90]
                data: this.solicitudesAceptadas
              }
            ]
          };
        },
        (err:HttpErrorResponse)=>{

        }
      )
  

    this.basicOptions = {
      plugins: {
        legend: {
          labels: {
            color: '#495057'
          }
        }
      },
      scales: {
        x: {
          ticks: {
            color: '#495057'
          },
          grid: {
            color: '#ebedef'
          }
        },
        y: {
          ticks: {
            color: '#495057'
          },
          grid: {
            color: '#ebedef'
          }
        }
      }

    }
  }

  ponerDatosDoughnut() {
    this.centrostable = {
      labels: [CentrosEnum.Castellon, CentrosEnum.Valencia, CentrosEnum.Alicante],
      datasets: [
        {
          data: [this.centrosJson.castellon, this.centrosJson.valencia, this.centrosJson.alicante],
          backgroundColor: [
            "#FF6384",
            "#36A2EB",
            "#FFCE56"
          ],
          hoverBackgroundColor: [
            "#FF6384",
            "#36A2EB",
            "#FFCE56"
          ]
        }
      ]
    }
  }

  ponerDatosTabla() {
    this.userstable = {
      labels: ['Admins', 'Receptores', 'Colaboradores'],
      datasets: [
        {
          data: [this.usersJson.adminlen, this.usersJson.receptorlen, this.usersJson.colaboradorlen],
          backgroundColor: [
            "#42A5F5",
            "#6F747C",
            "#FFA726"
          ],
          hoverBackgroundColor: [
            "#64B5F6",
            "#8c9098",
            "#FFB74D"
          ]
        }
      ]
    };
  }


  datosSolicitudes(){
      this.solicitudes.forEach((solicitud:Solicitud)=>{
        if(solicitud.createdAt){
          let mes = this.fechasUtil.getNumberMonth(new Date(solicitud.createdAt))
          if(solicitud.aceptado){
            this.solicitudesAceptadas[mes]++;
          }else{
            this.solicitudesPendientes[mes]++;
          }
        }
      })
  }
}
