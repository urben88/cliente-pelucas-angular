import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { MessageService } from 'primeng/api';
import { SelectItem } from 'primeng/api';
import { RolesEnum } from 'src/app/core/enums/Roles';
import { Centro } from 'src/app/core/models/Centro.interface';
import { AuthService } from 'src/app/core/services/db/auth.service';
import { FormBuilder, FormGroup } from '@angular/forms';
//?Para crear mi tipo de filtro
import { PrimeNGConfig } from 'primeng/api';
import Patterns from '../../../../core/utils/validaciones/patterns'
import { Rol } from '../../../../core/models/User.interface';
//?Métodos útiles
import metodos from '../../../../core/utils/metodos'
import { CentrosService } from 'src/app/core/services/db/centros.service';
import { CentrosEnum } from 'src/app/core/enums/Centros';



@Component({
  selector: 'admin-centro-edit-table',
  templateUrl: './centro-edit-table.component.html',
  styleUrls: ['./centro-edit-table.component.scss']
})
export class CentroEditTableComponent implements OnInit {

  
  centros!: Centro[];
  statuses!: SelectItem[];
  editingStatus: boolean = false;
  centroClone!: Centro;
  centroAct!: Centro;
  metodos = metodos;

  patterns = Patterns;

  provincias!: any[];


  selectedProvincia:any;


  provinciasselect = [
            {name: 'Castellón', value: CentrosEnum.Castellon},
            {name: 'Valencia', value: CentrosEnum.Valencia},
            {name: 'Alicante', value: CentrosEnum.Alicante},
  ];


  constructor(
    private messageService: MessageService,
    private _centro: CentrosService,
    private _auth: AuthService,
    public _router: Router,
    private primeConfig: PrimeNGConfig
  ) { }

  ngOnInit(): void {
    this._centro.getAll().subscribe(
      (res) => {
        console.log(res)
        this.centros = res;
      },
      (err) => {
        console.log(err)
      }
    )
    this.provincias = [
      {name: 'Valencia', value: CentrosEnum.Valencia},
      {name: 'Castellón', value: CentrosEnum.Castellon},
      {name: 'Alicante', value: CentrosEnum.Alicante},
  ]

  }

  //? Métodos tablas

  //? Para que carge los usuarios
  loadCentros() {

    setTimeout(() => {
      this._centro.getAll().subscribe(
        (res) => {
          console.log(res)
          this.centros = res;
        },
        (err) => {
          console.log(err)
        }
      )  
    }, 0);
  }


  //! Cuando le da a editar
  onRowEditInit(centro:Centro) {
    if (!centro.id) {
      centro.id = 0;
    }
    if (!this.editingStatus) {
      this.editingStatus = true;
      //? Me sirve para clonar el JSON y tener persistencia de los datos por si cancela la edición
      this.centroClone = JSON.parse(JSON.stringify(centro));
      console.log(this.selectedProvincia)
      switch (centro.provincia) {
        case CentrosEnum.Valencia:
          this.selectedProvincia={name: 'Valencia', value: CentrosEnum.Valencia}
          break;
        case CentrosEnum.Alicante:
          this.selectedProvincia ={name: 'Alicante', value: CentrosEnum.Alicante}
          break;
        case CentrosEnum.Castellon:
          this.selectedProvincia ={name: 'Castellón', value: CentrosEnum.Castellon}
          break;

        default:
          this.selectedProvincia ={name: 'Valencia', value: CentrosEnum.Valencia}

      }


    } else {
      this.messageService.add({ severity: 'warn', summary: 'Advertencia', detail: 'No puedes editar mas de un usuario a la vez' });

    }
  }


  //!Cuando guarda el row que está editando
  onRowEditSave(centro:Centro, index: any, editing: any) {
    this.editingStatus = false;
    if (!centro.id) {
      centro.id = 0;
    }
    console.log("Provincia ",this.selectedProvincia)

    let res = {
      id: centro.id,
      nombre: centro.nombre,
      provincia: this.selectedProvincia.value,
      ciudad: centro.ciudad,
      info: centro.info,
      img: centro.img
    }
    if (this.validate(res)) {
      this._centro.update(res).subscribe(
        (res:any) => {
          console.log(res)
          this.loadCentros()
          this.messageService.add({ severity: 'success', summary: 'Success', detail: 'El usuario ha sido actualizado' });
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
      this.centros[index] = this.centroClone;
      this.messageService.add({ severity: 'error', summary: 'Error', detail: 'Los campos no siguen un formato correcto' })
    }


  }

  //! Cuando le da al boton de cancelar edición
  onRowEditCancel(centro:Centro, index: number) {
    this.selectedProvincia = null;
    this.messageService.add({ severity: 'info', summary: 'Info', detail: 'Has cancelado la edición del usuario con id: ' + centro.id });
    console.log(this.centroClone)
    console.log(this.centros[index])
    this.centros[index] = this.centroClone;
    this.editingStatus = false;
    if (!centro.id) {
      centro.id = 0;
    }
    console.log(index)
    // this.users[index] = this.clonedProducts[user.id];
    // delete this.users[user.id];
  }

  //? Para hacer algunas validaciones caseras
  validate(res: any) {
    // let email = this.patterns.email.test(res.email)
    // let cpostal = this.patterns.cpostal.test(res.cpostal)
    // let tele = this.patterns.telefono.test(res.telefono)
    // let apellidos = this.patterns.apellidos.test(res.apellidos)
    // if (email && cpostal && tele && apellidos) {
    //   return true;
    // } else {
    //   return false;
    // }
    return true;
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
