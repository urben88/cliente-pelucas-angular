import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
//? Importo el archivo con patrones
import patrones from "../../../../utils/validaciones/patterns";
import { AuthService } from 'src/app/core/services/db/auth.service';
//? Interaces
import {Login, Singin} from "../../../../models/Auth.interface"
import { ErrorPost } from 'src/app/core/models/Error.interface';

//? Servicio
import { Router } from '@angular/router';
import { User } from 'src/app/core/models/User.interface';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {


  erroresDB:String[] =[];

  singinForm:FormGroup =  this._builder.group({
    email:['', [Validators.required, Validators.pattern(patrones.email)]],
    password:['',[Validators.required]]
  })

  constructor(
    private _builder: FormBuilder,
    private _auth: AuthService,
    private _router: Router,
  ) { }

  ngOnInit(): void {
    this.singinForm.reset({ //? Existe setValue pero hay que poner por default valor a todos los controles
      email:"tirolin25@gmail.com"
    }) 
  }

  //? Mensages de error
  get emailErrorMsg(): string{
    const errors = this.singinForm.get('email')?.errors;
    if(errors?.['required']){
      return 'El email es obligatorio'
    }else if(errors?.['pattern']){
      return 'Formato no válido'
    }
    return '';
  }
  get passwordErrorMsg(): string{
    const errors = this.singinForm.get('password')?.errors;
    if(errors?.['required']){
      return 'La contraseña es obligatoria'
    }else if (errors?.['minlength']){
      return 'La contraseña debe de tener una longitud mínima de 5';
    }
    return '';
  }
  send(){
    this.erroresDB = [];
    if(this.singinForm.invalid){
      this.singinForm.markAllAsTouched();
    }else{
      console.log(this.singinForm.value)
      this._auth.singin(this.singinForm.value)
      .subscribe(
        (res:Singin)=>{
          localStorage.setItem('token',res.token);
          this.singinForm.reset(); //Borra el contenido de los inputs
          if(this._auth.isAdmin(res.user)){
            this._router.navigate(['/admin'])
          }else{
            this._router.navigate(['/'])
          }

        },
        (error:any) =>{
          console.log(error)
          this.erroresDB.push(error.error.msg)
        }
      )
    }
  }
  campoEsValido( campo:string){
    return this.singinForm.controls[campo].errors && this.singinForm.controls[campo].touched;
  }

}
