import { Component, OnInit } from '@angular/core';
import { UsersService } from '../../../../../services/db/users.service';
import { User, Rol } from '../../../../../models/User.interface';
import { RolesEnum } from '../../../../../enums/Roles';
import { CentrosService } from 'src/app/core/services/db/centros.service';
import { CentrosEnum } from 'src/app/core/enums/Centros';
import { Centro } from 'src/app/core/models/Centro.interface';

@Component({
  selector: 'admin-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent implements OnInit {

  userstable:any;
  centrostable:any;

  users!:User[];
  centros!:Centro[]

  usersJson ={
    adminlen:0,
    receptorlen:0,
    colaboradorlen:0
  }
  centrosJson={
    castellon:0,
    valencia:0,
    alicante:0
  }

  constructor(private _users:UsersService, private _centros:CentrosService) { }

  ngOnInit(): void {

    //* Usuarios
    this._users.getUsers().subscribe(
      (res) => {
        console.log("users",res)
        this.users = res;
        this.users.forEach((user:User)=>{
          user.rol?.forEach((rol:Rol)=>{
            if(rol.role == RolesEnum.admin){
              this.usersJson.adminlen++;
            }
            if(rol.role == RolesEnum.colaborador){
              this.usersJson.colaboradorlen++;
            }
            if(rol.role == RolesEnum.receptor){
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
      (res)=>{
        this.centros = res;
        this.centros.forEach((centro:Centro)=>{
          switch(centro.provincia){
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
      (err)=>{

      }
    )
  
  }

  ponerDatosDoughnut(){
    this.centrostable = {
        labels: [CentrosEnum.Castellon,CentrosEnum.Valencia,CentrosEnum.Alicante],
        datasets: [
            {
                data: [this.centrosJson.castellon,this.centrosJson.valencia,this.centrosJson.alicante],
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

  ponerDatosTabla(){
    this.userstable = {
      labels: ['Admins','Receptores','Colaboradores'],
      datasets: [
          {
              data: [this.usersJson.adminlen,this.usersJson.receptorlen,this.usersJson.colaboradorlen],
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
}
