import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { MessageService } from 'primeng/api';
import { SelectItem } from 'primeng/api';
import { RolesEnum } from 'src/app/core/enums/Roles';
import { User } from 'src/app/core/models/User.interface';
import { AuthService } from 'src/app/core/services/db/auth.service';
import { UsersService } from 'src/app/core/services/db/users.service';

@Component({
  selector: 'admin-user-edit-table',
  templateUrl: './user-edit-table.component.html',
  styleUrls: ['./user-edit-table.component.scss']
})
export class UserEditTableComponent implements OnInit {
  users!:User[];
  statuses!: SelectItem[];
  editingStatus:boolean = false;
  userClone!:User;
  userAct!:User;

  roles=  [
    { label: RolesEnum.admin.toLocaleUpperCase(), value: RolesEnum.admin },
    { label: RolesEnum.colaborador.toLocaleUpperCase() , value: RolesEnum.colaborador },
    { label: RolesEnum.receptor.toLocaleUpperCase(), value: RolesEnum.receptor },
  ]

  selectedRoles:any[] =[];
  rolesCheck=[
    {name: RolesEnum.admin, key: 'A'}, 
    {name: RolesEnum.colaborador, key: 'C'}, 
    {name: RolesEnum.receptor, key: 'R'}
  ]
  cambiacheck(event:any){
    console.log(event,this.selectedRoles)
  }


  constructor(
    private messageService: MessageService, 
    private _users:UsersService,
    private _auth:AuthService,
    public _router:Router) { }

  ngOnInit(): void {
    this._users.getUsers().subscribe(
      (res)=>{
        console.log(res)
        this.users = res;
      },
      (err)=>{
        console.log(err)
      }
    )
    this._auth.getUser().subscribe(
      (res:User)=>{
        this.userAct = res;
        console.log(this.userAct)
      },
      (err:any)=>{
        throw err
      }
    )
  }

  onRowEditInit(user: User) {
    if(!user.id){
      user.id =0;
    }
    if(!this.editingStatus){
      this.editingStatus =true;
      user.rol?.forEach(rol =>{
        if(rol.role == RolesEnum.admin){
          this.selectedRoles.push({name: RolesEnum.admin, key: 'A'}) 
        }
        if(rol.role ==RolesEnum.colaborador){
          this.selectedRoles.push({name: RolesEnum.colaborador, key: 'C'}) 
        }
        if(rol.role == RolesEnum.receptor){
          this.selectedRoles.push({name: RolesEnum.receptor, key: 'R'}) 
        }
      })
      //? Me sirve para clonar el JSON y tener persistencia de los datos por si cancela la edición
      this.userClone = JSON.parse(JSON.stringify(user));

    }else{
      this.messageService.add({severity:'warn', summary: 'Advertencia', detail:'No puedes editar mas de un usuario a la vez'});

    }
  }

  onRowEditSave(user: User,editing:any) {
    this.editingStatus =false;
   
    if(!user.id){
      user.id =0;
    }

    let rolesname:string[] =[];
    this.selectedRoles.forEach(rol=>{
      rolesname.push(rol.name)
    })
    let res= {
      id:user.id,
      nombre:user.nombre,
      apellidos:user.apellidos,
      email:user.email,
      cpostal:user.cpostal,
      telefono:user.telefono,
      rolesBuscar: rolesname
    }
    this._users.updateUserAdmin(res).subscribe(
      (res)=>{
        console.log(res)
        this.messageService.add({severity:'success', summary: 'Success', detail:'El usuario ha sido actualizado'});
      },
      (err:Error)=>{
        console.log(err)
        this.messageService.add({severity:'error', summary: 'Error', detail:err.message});

      }
      );
     console.log(res)
          // delete this.clonedProducts[user.id];
          this.messageService.add({severity:'success', summary: 'Success', detail:'Product is updated'});
          this.messageService.add({severity:'error', summary: 'Error', detail:'Invalid Price'});
  }

  onRowEditCancel(user: User, index: number) {

    this.messageService.add({severity:'info', summary: 'Info', detail:'Has cancelado la edición del usuario con id: '+user.id});
    console.log(this.userClone)
    console.log(this.users[index])
    this.users[index]= this.userClone;
    this.selectedRoles = [];
    this.editingStatus =false;
    if(!user.id){
      user.id =0;
    }
    console.log(index)
      // this.users[index] = this.clonedProducts[user.id];
      // delete this.users[user.id];
  }

}
