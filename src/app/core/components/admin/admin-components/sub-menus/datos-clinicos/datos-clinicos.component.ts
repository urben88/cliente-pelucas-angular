import { Component, OnInit } from '@angular/core';
import { User } from 'src/app/core/models/User.interface';
import { UsersService } from 'src/app/core/services/db/users.service';

@Component({
  selector: 'app-datos-clinicos',
  templateUrl: './datos-clinicos.component.html',
  styleUrls: ['./datos-clinicos.component.scss']
})
export class DatosClinicosComponent implements OnInit {

  constructor(
    private _user:UsersService
  ) { }
  
  users!:User[];
  userSelected!:User|null;
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
  }
  //? Método para obtener el usuario seleccionado
  userSelect(event:any){
    this.userSelected = null;
    if(event){
      this.userSelected = event;
      console.log(this.userSelected)
    }
  }

}
