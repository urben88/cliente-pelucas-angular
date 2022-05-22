import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import validar from '../../../../utils/metodos'
import validar2 from '../../../../utils/validaciones/validaciones'
import patrones from "../../../../utils/validaciones/patterns";
//?Servicios
import { AuthService } from 'src/app/core/services/db/auth.service';

//?Interfaces
import {Login, Singin} from "../../../../models/Auth.interface"
import {User} from "../../../../models/User.interface"
import {ErrorPost} from "../../../../models/Error.interface"
import { Router } from '@angular/router';
import { IsAdminService } from 'src/app/core/services/forComponents/is-admin.service';
@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss']
})
export class RegisterComponent implements OnInit {

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
  
  erroresDB:any[] = [];

  singupForm:FormGroup = this._builder.group({
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

  constructor( private _builder:FormBuilder, private _auth:AuthService, private _router:Router, private _isAdmin:IsAdminService) {

    
  }

  ngOnInit(): void {
  }


//? Mensajes de error
  get nombreErrorMsg(): string{
    const errors = this.singupForm.get('nombre')?.errors;
    if(errors?.['required']){
      return 'El nombre es obligatorio'
    }
    return '';
  }
  get apellidosErrorMsg(): string{
    const errors = this.singupForm.get('apellidos')?.errors;
    if(errors?.['required']){
      return 'Los apellidos son obligatorios'
    }else if(errors?.['pattern']){
      return 'Formato no válido'
    }
    return '';
  }
  get emailErrorMsg(): string{
    const errors = this.singupForm.get('email')?.errors;
    if(errors?.['required']){
      return 'El email es obligatorio'
    }else if(errors?.['pattern']){
      return 'Formato no válido'
    }
    return '';
  }
  get telefonoErrorMsg(): string{
    const errors = this.singupForm.get('telefono')?.errors;
    if(errors?.['required']){
      return 'El telefono es obligatorio'
    }else if(errors?.['pattern']){
      return 'Formato no válido'
    }
    return '';
  }
  get cpostalErrorMsg(): string{
    const errors = this.singupForm.get('cpostal')?.errors;
    if(errors?.['required']){
      return 'El codigo postal es obligatorio'
    }else if(errors?.['pattern']){
      return 'Formato no válido'
    }
    return '';
  }
  get password1ErrorMsg(): string{
    const errors = this.singupForm.get('password1')?.errors;
    if(errors?.['required']){
      return 'La contraseña es obligatoria'
    }else if (errors?.['minlength']){
      return 'La contraseña debe de tener una longitud mínima de 5';
    }
    return '';
  }
  get password2ErrorMsg(): string{
    const errors = this.singupForm.get('password2')?.errors;
    if(errors?.['required']){
      return 'Repetir la contraseña es obligatoria'
    }else if (errors?.['noIguales']){
      return 'Las contraseñas no coinciden'
    }
    return '';
  }

  //? Mostrar mensaje cada vez que escribimos
  campoEsValido( campo:string){
    return this.singupForm.controls[campo].errors && this.singupForm.controls[campo].touched;
    
  }


  //TODO Dar al boton enviar
  register(){
    this.erroresDB = []
    if(this.singupForm.invalid){
      this.singupForm.markAllAsTouched();
      console.log("Error en los datos")
    }else{
      console.log(this.singupForm.value)
      let resul:User ={
        apellidos:this.singupForm.value.apellidos.trim().toLowerCase(), 
        cpostal: this.singupForm.value.cpostal,
        email: this.singupForm.value.email.trim(),
        nombre: this.singupForm.value.nombre.trim().toLowerCase(),
        password: this.singupForm.value.password1.trim(),
        rol: this.singupForm.value.rol.trim().toLowerCase(),
        telefono: this.singupForm.value.telefono.trim()
      }
      console.log(resul)
      this._auth.singup(resul)
      .subscribe(
        (res)=>{
            console.log('Registrado correctamente')
            this.singupForm.reset(); //Borra el contenido de los inputs
            this._auth.setToken(res.token)
            this._isAdmin.$isAdmin.emit(false)
            this._router.navigate(['/'])
        },
        (err:ErrorPost)=>{
          console.log(err)
          err.error.errors.forEach((error) =>{
          //  console.log(error)
          if(error.type == "unique violation"){

              if(error.path == "email"){
                this.erroresDB.push("El email ya esta en uso")
                return;
              }

          }
           this.erroresDB.push(error.message)
          })
          console.log(this.erroresDB)
        }
      )
    }
  }

}
