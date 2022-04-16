import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import validar from '../../../../utils/metodos'
import validar2 from '../../../../utils/validaciones/validaciones'
import patrones from "../../../../utils/validaciones/patterns";
//?Servicios
import { AuthService } from 'src/app/core/services/auth.service';

//?Interfaces
import {Singin} from "../../../../models/Auth.interface"
import {User} from "../../../../models/User.interface"
import {ErrorPost} from "../../../../models/Error.interface"
import { Router } from '@angular/router';

@Component({
  selector: 'app-user-settings',
  templateUrl: './user-settings.component.html',
  styleUrls: ['./user-settings.component.scss']
})
export class UserSettingsComponent implements OnInit {

  roles:any=[
    {name: 'Colaborador', code: 'colaborador'},
    {name: 'Receptor', code: 'receptor'},
  ]
  rol:any;
  errores:any ={
    nombre:[],
    apellidos:[],
    email:'Error',
    telefono:[],
    cpostal:[],
    rol:[]
  };
  
  datosUser!:User;
  changeForm:FormGroup =  this._builder.group({
    nombre:['',Validators.required],
    apellidos:['',[Validators.required,Validators.pattern(patrones.apellidos)]],
    email:['',[Validators.required,Validators.pattern(patrones.email)]],
    telefono:['',[Validators.required,Validators.pattern(patrones.telefono)]],
    cpostal:['',[Validators.required,Validators.pattern(patrones.cpostal)]],
    password1:['',[Validators.required ,Validators.minLength(5)]],
    password2:['',Validators.required],
    rol:['receptor',Validators.required],
  },{
    validators: [ validar2.camposIguales('password1','password2') ]
  });
  
  
  constructor( private _builder:FormBuilder, private _auth:AuthService, private _router:Router) {
  }

  async ngOnInit(){
    this._auth.getUser().subscribe(
      (res:User)=>{
        this.datosUser = res;
        console.log(this.datosUser)
        this.datosDefault();
      },
      (err:any)=>{
        throw err
      }
    )
  }
  
//?Poner los datos default

  datosDefault(){
    this.changeForm.controls['nombre'].setValue(this.datosUser.nombre);
    this.changeForm.controls['apellidos'].setValue(this.datosUser.apellidos);
    this.changeForm.controls['email'].setValue(this.datosUser.email);
    this.changeForm.controls['cpostal'].setValue(this.datosUser.cpostal);
    this.changeForm.controls['telefono'].setValue(this.datosUser.telefono);
  }

//? Mensajes de error
  get nombreErrorMsg(): string{
    const errors = this.changeForm.get('nombre')?.errors;
    if(errors?.['required']){
      return 'El nombre es obligatorio'
    }
    return '';
  }
  get apellidosErrorMsg(): string{
    const errors = this.changeForm.get('apellidos')?.errors;
    if(errors?.['required']){
      return 'Los apellidos son obligatorios'
    }else if(errors?.['pattern']){
      return 'Formato no válido'
    }
    return '';
  }
  get emailErrorMsg(): string{
    const errors = this.changeForm.get('email')?.errors;
    if(errors?.['required']){
      return 'El email es obligatorio'
    }else if(errors?.['pattern']){
      return 'Formato no válido'
    }
    return '';
  }
  get telefonoErrorMsg(): string{
    const errors = this.changeForm.get('telefono')?.errors;
    if(errors?.['required']){
      return 'El telefono es obligatorio'
    }else if(errors?.['pattern']){
      return 'Formato no válido'
    }
    return '';
  }
  get cpostalErrorMsg(): string{
    const errors = this.changeForm.get('cpostal')?.errors;
    if(errors?.['required']){
      return 'El codigo postal es obligatorio'
    }else if(errors?.['pattern']){
      return 'Formato no válido'
    }
    return '';
  }
  get password1ErrorMsg(): string{
    const errors = this.changeForm.get('password1')?.errors;
    if(errors?.['required']){
      return 'La contraseña es obligatoria'
    }else if (errors?.['minlength']){
      return 'La contraseña debe de tener una longitud mínima de 5';
    }
    return '';
  }
  get password2ErrorMsg(): string{
    const errors = this.changeForm.get('password2')?.errors;
    if(errors?.['required']){
      return 'Repetir la contraseña es obligatoria'
    }else if (errors?.['noIguales']){
      return 'Las contraseñas no coinciden'
    }
    return '';
  }

  //? Mostrar mensaje cada vez que escribimos
  campoEsValido( campo:string){
    return this.changeForm.controls[campo].errors && this.changeForm.controls[campo].touched;
    
  }


  //TODO Dar al boton enviar
  register(){

    if(this.changeForm.invalid){
      this.changeForm.markAllAsTouched();
      console.log("Error en los datos")
    }else{
      console.log(this.changeForm.value)
      let resul:User ={
        apellidos:this.changeForm.value.apellidos.trim().toLowerCase(), 
        cpostal: this.changeForm.value.cpostal.trim(),
        email: this.changeForm.value.email.trim(),
        nombre: this.changeForm.value.nombre.trim().toLowerCase(),
        password: this.changeForm.value.password1.trim(),
        rol: this.changeForm.value.rol.trim().toLowerCase(),
        telefono: this.changeForm.value.telefono.trim()
      }
      console.log(resul)
      this._auth.singup(resul)
      .subscribe(
        (res)=>{
            console.log('Registrado correctamente')
            this.changeForm.reset(); //Borra el contenido de los inputs
            this._router.navigate(['/'])
        },
        (err:ErrorPost)=>{
          console.log(err)
          err.error.errors.forEach((error) =>{
           console.log(error)
          })
        }
      )
    }
  }


}
