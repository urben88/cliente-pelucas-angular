import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { MessageService } from 'primeng/api';
import { SelectItem } from 'primeng/api';
import { RolesEnum } from 'src/app/core/enums/Roles';
import { User } from 'src/app/core/models/User.interface';
import { AuthService } from 'src/app/core/services/db/auth.service';
import { UsersService } from 'src/app/core/services/db/users.service';
import { FormBuilder, FormGroup } from '@angular/forms';
//?Para crear mi tipo de filtro
import { PrimeNGConfig } from 'primeng/api';
import Patterns from '../../../../core/utils/validaciones/patterns'
import { Rol } from '../../../../core/models/User.interface';
//?Métodos útiles
import metodos from '../../../../core/utils/metodos'
@Component({
  selector: 'admin-user-edit-table',
  templateUrl: './user-edit-table.component.html',
  styleUrls: ['./user-edit-table.component.scss']
})
export class UserEditTableComponent implements OnInit {
  
  users!: User[];
  statuses!: SelectItem[];
  editingStatus: boolean = false;
  userClone!: User;
  userAct!: User;
  metodos = metodos;

  patterns = Patterns;
  roles = [
    { label: RolesEnum.admin.toLocaleUpperCase(), value: RolesEnum.admin },
    { label: RolesEnum.colaborador.toLocaleUpperCase(), value: RolesEnum.colaborador },
    { label: RolesEnum.receptor.toLocaleUpperCase(), value: RolesEnum.receptor },
  ]

  selectedRoles: any[] = [];
  rolesCheck = [
    { name: RolesEnum.admin, key: 'A' },
    { name: RolesEnum.colaborador, key: 'C' },
    { name: RolesEnum.receptor, key: 'R' }
  ]


  constructor(
    private messageService: MessageService,
    private _users: UsersService,
    private _auth: AuthService,
    public _router: Router,
    private primeConfig: PrimeNGConfig
  ) { }

  ngOnInit(): void {
    this._users.getUsers().subscribe(
      (res) => {
        console.log(res)
        this.users = res;
      },
      (err) => {
        console.log(err)
      }
    )
    this._auth.getUser().subscribe(
      (res: User) => {
        this.userAct = res;
        console.log(this.userAct)
      },
      (err: any) => {
        throw err
      }
    )


  }

  //? Métodos tablas

  //? Para que carge los usuarios
  loadUsers(event: any) {


    setTimeout(() => {
      this._users.getUsers().subscribe(
        (res) => {
          console.log(res)
          this.users = res;
        },
        (err) => {
          console.log(err)
        }
      )
    }, 0);
  }


  //! Cuando le da a editar
  onRowEditInit(user: User) {
    if (!user.id) {
      user.id = 0;
    }
    if (!this.editingStatus) {
      this.editingStatus = true;
      user.rol?.forEach(rol => {
        if (rol.role == RolesEnum.admin) {
          this.selectedRoles.push({ name: RolesEnum.admin, key: 'A' })
        }
        if (rol.role == RolesEnum.colaborador) {
          this.selectedRoles.push({ name: RolesEnum.colaborador, key: 'C' })
        }
        if (rol.role == RolesEnum.receptor) {
          this.selectedRoles.push({ name: RolesEnum.receptor, key: 'R' })
        }
      })
      //? Me sirve para clonar el JSON y tener persistencia de los datos por si cancela la edición
      this.userClone = JSON.parse(JSON.stringify(user));

    } else {
      this.messageService.add({ severity: 'warn', summary: 'Advertencia', detail: 'No puedes editar mas de un usuario a la vez' });

    }
  }

  //? Para ver el log de los roles que selecciona al editar
  cambiacheck(event: any) {
    console.log(event, this.selectedRoles)
  }

  //!Cuando guarda el row que está editando
  onRowEditSave(user: User, index: any, editing: any) {
    this.editingStatus = false;

    if (!user.id) {
      user.id = 0;
    }

    //?Obtengo los nombres de los roles seleccionados
    let rolesname: string[] = [];
    this.selectedRoles.forEach(rol => {
      rolesname.push(rol.name)
    })
    //?Pongo valor por default si no se han seleccionado ninguno
    if (rolesname.length == 0) {
      rolesname.push(RolesEnum.receptor)
    }

    let res = {
      id: user.id,
      nombre: user.nombre,
      apellidos: user.apellidos,
      email: user.email,
      cpostal: user.cpostal,
      telefono: user.telefono,
      rolesBuscar: rolesname
    }
    if (this.validate(res)) {
      this._users.updateUserAdmin(res).subscribe(
        (res) => {
          console.log(res)
          this.messageService.add({ severity: 'success', summary: 'Success', detail: 'El usuario ha sido actualizado' });
          this._users.getUsers().subscribe(
            (res) => {
              console.log(res)
              this.users = res;
            },
            (err) => {
              console.log(err)
            }
          )
        },
        (err: Error) => {
          console.log(err)
          this.messageService.add({ severity: 'error', summary: 'Error', detail: err.message });

        }
      );
      console.log(res)
    } else {
      editing = false;
      this.editingStatus = false;
      this.users[index] = this.userClone;
      this.messageService.add({ severity: 'error', summary: 'Error', detail: 'Los campos no siguen un formato correcto' })
    }


  }

  //! Cuando le da al boton de cancelar edición
  onRowEditCancel(user: User, index: number) {

    this.messageService.add({ severity: 'info', summary: 'Info', detail: 'Has cancelado la edición del usuario con id: ' + user.id });
    console.log(this.userClone)
    console.log(this.users[index])
    this.users[index] = this.userClone;
    this.selectedRoles = [];
    this.editingStatus = false;
    if (!user.id) {
      user.id = 0;
    }
    console.log(index)
    // this.users[index] = this.clonedProducts[user.id];
    // delete this.users[user.id];
  }

  //? Para hacer algunas validaciones caseras
  validate(res: any) {
    let email = this.patterns.email.test(res.email)
    let cpostal = this.patterns.cpostal.test(res.cpostal)
    let tele = this.patterns.telefono.test(res.telefono)
    let apellidos = this.patterns.apellidos.test(res.apellidos)
    if (email && cpostal && tele && apellidos) {
      return true;
    } else {
      return false;
    }
  }

  //?Clase para el badge role
  badgeRole(rol:Rol) {

    if(rol.role == RolesEnum.admin){
      return 'badge bg-primary'
    }

    if(rol.role == RolesEnum.receptor){
      return 'badge bg-secondary'
    }

    if(rol.role == RolesEnum.colaborador){
      return 'badge bg-warning text-dark'
    }
    return ''
  }

}
