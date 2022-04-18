import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import validar from '../../../../utils/metodos'
import validar2 from '../../../../utils/validaciones/validaciones'
import patrones from "../../../../utils/validaciones/patterns";
//?Servicios
import { AuthService } from 'src/app/core/services/auth.service';
//*Para los mensajes de advertencia
import { MessageService } from 'primeng/api';
import {ConfirmationService} from 'primeng/api';

//?Interfaces
import { Singin } from "../../../../models/Auth.interface"
import { User } from "../../../../models/User.interface"
import { ErrorPost } from "../../../../models/Error.interface"
import { Router } from '@angular/router';

@Component({
  selector: 'app-user-settings',
  templateUrl: './user-settings.component.html',
  styleUrls: ['./user-settings.component.scss'],
  providers: [MessageService,ConfirmationService]
})
export class UserSettingsComponent implements OnInit {

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

  datosUser!: User;
  changeForm: FormGroup = this._builder.group({
    nombre: ['', Validators.required],
    apellidos: ['', [Validators.required, Validators.pattern(patrones.apellidos)]],
    email: ['', [Validators.required, Validators.pattern(patrones.email)]],
    telefono: ['', [Validators.required, Validators.pattern(patrones.telefono)]],
    cpostal: ['', [Validators.required, Validators.pattern(patrones.cpostal)]],
    password1: ['', [Validators.required, Validators.minLength(5)]],
    password2: ['', Validators.required],
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

  async ngOnInit() {
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
  }

  //? Moestrar mensaje
  showSuccess() {
    this._messageService.add({ severity: 'info', summary: 'Info', detail: 'Se ha reseteado el formulario a como estaba antes' });
  }

  //?Mostrar mensaje para confirmar
  confirm(event: any) {
    this._confirmationService.confirm({
        target: event.target,
        message: 'Are you sure that you want to proceed?',
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
    this.changeForm.controls['nombre'].setValue(this.datosUser.nombre);
    this.changeForm.controls['apellidos'].setValue(this.datosUser.apellidos);
    this.changeForm.controls['email'].setValue(this.datosUser.email);
    this.changeForm.controls['cpostal'].setValue(this.datosUser.cpostal);
    this.changeForm.controls['telefono'].setValue(this.datosUser.telefono);
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
    this.erroresDB = []
    if (this.changeForm.invalid) {
      this.changeForm.markAllAsTouched();
      this._messageService.add({ severity: 'warn', summary: 'Aviso', detail: 'Introduce bien los datos antes de cambiarlos' });
      console.log("Error en los datos")
    } else {
      console.log(this.changeForm.value)
      let resul: User = {
        apellidos: this.changeForm.value.apellidos.trim().toLowerCase(),
        cpostal: this.changeForm.value.cpostal,
        email: this.changeForm.value.email.trim(),
        nombre: this.changeForm.value.nombre.trim().toLowerCase(),
        password: this.changeForm.value.password1.trim(),
        telefono: this.changeForm.value.telefono.trim()
      }
      // console.log(resul)
      this._auth.updateUser(resul)
        .subscribe(
          (res) => {
            console.log('Se han actualizado los datos correctamente')
            this._messageService.add({ severity: 'success', summary: 'Exito', detail: 'Tu cuenta se ha actualizado correctamente' });
            // this.changeForm.reset(); //Borra el contenido de los inputs
            // this._router.navigate(['/'])
          },
          (err: ErrorPost) => {
            console.log(err)
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
