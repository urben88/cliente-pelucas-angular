import { Component, OnInit } from '@angular/core';

import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import validar from '../../../../core/utils/metodos'
import validar2 from '../../../../core/utils/validaciones/validaciones'
import patrones from "../../../../core/utils/validaciones/patterns";
//?Servicios
import { AuthService } from 'src/app/core/services/db/auth.service';
//*Para los mensajes de advertencia
import { MessageService,Message } from 'primeng/api';
import {ConfirmationService} from 'primeng/api';

//?Interfaces
import { Singin } from "../../../../core/models/Auth.interface"
import { User } from "../../../../core/models/User.interface"
import { ErrorPost } from "../../../../core/models/Error.interface"
import { Router } from '@angular/router';



@Component({
  selector: 'user-update',
  templateUrl: './update.component.html',
  styleUrls: ['./update.component.scss'],
  providers: [MessageService,ConfirmationService],
  host: {class: 'caja'}
})
export class UpdateComponent implements OnInit {


  roles: any = [
    { name: 'Colaborador', code: 'colaborador' },
    { name: 'Receptor', code: 'receptor' },
  ]

  rol: any;
  errores: any = {
    nombre: [],
    apellidos: [],
    email: 'Error',
    telefono: [],
    cpostal: [],
    rol: []
  };

  erroresDB: any[] = [];

  //?Para el boton de cambiar contraseña
  cambiaswitch(event:any){
    this.changeForm.controls['passwordStatus'].setValue(event.checked);
  }
  datosUser!: User;
  changeForm: FormGroup = this._builder.group({
    nombre: ['', Validators.required],
    apellidos: ['', [Validators.required, Validators.pattern(patrones.apellidos)]],
    email: ['', [Validators.required, Validators.pattern(patrones.email)]],
    telefono: ['', [Validators.required, Validators.pattern(patrones.telefono)]],
    cpostal: ['', [Validators.required, Validators.pattern(patrones.cpostal)]],
    passwordStatus: [false, [Validators.required]],
    password1: [''],
    password2: [''],
    rol: ['receptor', Validators.required],
  }, {
    validators: [validar2.camposIguales('password1', 'password2')]
  });


  constructor(
    private _builder: FormBuilder,
    private _auth: AuthService,
    private _router: Router,
    private _messageService: MessageService,
    private _confirmationService:ConfirmationService
  ) {
  }

  ngOnInit() {
    this._auth.getUser().subscribe(
      (res: User) => {
        this.datosUser = res;
        console.log(this.datosUser)
        this.datosDefault();
      },
      (err: any) => {
        throw err
      }
    )
    this.changeForm.controls['passwordStatus'].valueChanges
    .subscribe( value=>{
      console.log('eeee')
      if(value){
        this.changeForm.controls['password1'].setValidators([Validators.required, Validators.minLength(5)])
        this.changeForm.controls['password2'].setValidators([Validators.required])
      }else{
        console.log("se eliminannn")
        this.changeForm.controls['password1'].clearValidators()
        this.changeForm.controls['password1'].updateValueAndValidity();
        this.changeForm.controls['password2'].clearValidators()
        this.changeForm.controls['password2'].updateValueAndValidity();
      }
    })
  }

  //? Moestrar mensaje
  showSuccess() {
    this._messageService.add({ severity: 'info', summary: 'Info', detail: 'Se ha reseteado el formulario a como estaba antes' });
  }

  //?Mostrar mensaje para confirmar
  confirm(event: any) {
    this._confirmationService.confirm({
        target: event.target,
        message: 'Estas seguro que quieres hacer los cambios?',
        icon: 'pi pi-exclamation-triangle',
        accept: () => {
          console.log('Has aceptado')
          this.register();
        },
        reject: () => {
          console.log('Has cancelado')
        }
    });
}
  
  //?Poner los datos default

  datosDefault() { 
    this._auth.getUser().subscribe(
      (res: User) => {
        this.datosUser = res; 
        this.changeForm.controls['nombre'].setValue(this.datosUser.nombre);
        this.changeForm.controls['apellidos'].setValue(this.datosUser.apellidos);
        this.changeForm.controls['email'].setValue(this.datosUser.email);
        this.changeForm.controls['cpostal'].setValue(this.datosUser.cpostal);
        this.changeForm.controls['telefono'].setValue(this.datosUser.telefono);
      },
      (err: any) => {
        throw err
      }
    )
   
  }

  //? Mensajes de error
  get nombreErrorMsg(): string {
    const errors = this.changeForm.get('nombre')?.errors;
    if (errors?.['required']) {
      return 'El nombre es obligatorio'
    }
    return '';
  }
  get apellidosErrorMsg(): string {
    const errors = this.changeForm.get('apellidos')?.errors;
    if (errors?.['required']) {
      return 'Los apellidos son obligatorios'
    } else if (errors?.['pattern']) {
      return 'Formato no válido'
    }
    return '';
  }
  get emailErrorMsg(): string {
    const errors = this.changeForm.get('email')?.errors;
    if (errors?.['required']) {
      return 'El email es obligatorio'
    } else if (errors?.['pattern']) {
      return 'Formato no válido'
    }
    return '';
  }
  get telefonoErrorMsg(): string {
    const errors = this.changeForm.get('telefono')?.errors;
    if (errors?.['required']) {
      return 'El telefono es obligatorio'
    } else if (errors?.['pattern']) {
      return 'Formato no válido'
    }
    return '';
  }
  get cpostalErrorMsg(): string {
    const errors = this.changeForm.get('cpostal')?.errors;
    if (errors?.['required']) {
      return 'El codigo postal es obligatorio'
    } else if (errors?.['pattern']) {
      return 'Formato no válido'
    }
    return '';
  }
  get password1ErrorMsg(): string {
    const errors = this.changeForm.get('password1')?.errors;
    if (errors?.['required']) {
      return 'La contraseña es obligatoria'
    } else if (errors?.['minlength']) {
      return 'La contraseña debe de tener una longitud mínima de 5';
    }
    return '';
  }
  get password2ErrorMsg(): string {
    const errors = this.changeForm.get('password2')?.errors;
    if (errors?.['required']) {
      return 'Repetir la contraseña es obligatoria'
    } else if (errors?.['noIguales']) {
      return 'Las contraseñas no coinciden'
    }
    return '';
  }

  //? Mostrar mensaje cada vez que escribimos
  campoEsValido(campo: string) {
    return this.changeForm.controls[campo].errors && this.changeForm.controls[campo].touched;

  }


  //TODO Dar al boton enviar
  register() {
    console.log(this.changeForm.value)
    this.erroresDB = []
    if (this.changeForm.invalid) {
      this.changeForm.markAllAsTouched();
      this._messageService.add({ severity: 'warn', summary: 'Aviso', detail: 'Introduce bien los datos antes de cambiarlos' });
      console.log("Error en los datos")
    } else {
      let resul: User = {
        apellidos: this.changeForm.value.apellidos.trim().toLowerCase(),
        cpostal: this.changeForm.value.cpostal,
        email: this.changeForm.value.email.trim(),
        nombre: this.changeForm.value.nombre.trim().toLowerCase(),
        telefono: this.changeForm.value.telefono.trim()
      }
      if(this.changeForm.controls['passwordStatus'].value){
        resul.password = this.changeForm.value.password1.trim()
      }
      console.log("resul",resul)
      this._auth.updateUser(resul)
        .subscribe(
          (res) => {
            console.log('Se han actualizado los datos correctamente')
            this._messageService.add({ severity: 'success', summary: 'Exito', detail: 'Tu cuenta se ha actualizado correctamente' });
            // this.changeForm.reset(); //Borra el contenido de los inputs
            // this._router.navigate(['/'])
          },
          (err: ErrorPost) => {
            console.log("Erroooor quiii",err)
            err.error.errors.forEach((error) => {
              console.log(error)
              if (error.type == "unique violation") {

                if (error.path == "email") {
                  this.erroresDB.push("El email ya esta en uso")
                  return;
                }

              }
              this.erroresDB.push(error.message)
            })
          }
        )
    }
  }


}
