import { Component, OnInit } from '@angular/core';
import { UsersService } from '../../../../../services/db/users.service';
import { User, Rol } from '../../../../../models/User.interface';
import { RolesEnum } from '../../../../../enums/Roles';

@Component({
  selector: 'admin-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent implements OnInit {

  userstable:any;
  users!:User[];
  adminlen:number = 0;
  receptorlen:number = 0;
  colaboradorlen:number= 0;

  constructor(private _users:UsersService) { }

  ngOnInit(): void {
    this._users.getUsers().subscribe(
      (res) => {
        console.log("users",res)
        this.users = res;
        this.users.forEach((user:User)=>{
          user.rol?.forEach((rol:Rol)=>{
            if(rol.role == RolesEnum.admin){
              this.adminlen++;
            }
            if(rol.role == RolesEnum.colaborador){
              this.colaboradorlen++;
            }
            if(rol.role == RolesEnum.receptor){
              this.receptorlen++;
            }
          })
        })
        this.ponerDatosTabla()
      },
      (err) => {
        console.log(err)
      }
    )
  
  }

  ponerDatosTabla(){
    this.userstable = {
      labels: ['Admins','Receptores','Colaboradores'],
      datasets: [
          {
              data: [this.adminlen,this.receptorlen, this.colaboradorlen],
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
