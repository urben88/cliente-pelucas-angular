import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/core/services/db/auth.service';


@Component({
  selector: 'app-ejemplo-form',
  templateUrl: './ejemplo-form.component.html',
  styleUrls: ['./ejemplo-form.component.scss']
})
export class EjemploFormComponent implements OnInit {

  ngOnInit(): void {
  }


  erroresDB:String[] =[];

  singinForm:FormGroup =  this._builder.group({
    email:['', [Validators.required]],
    password:['',[Validators.required]]
  })

  constructor(
    private _builder: FormBuilder,
    private _auth: AuthService,
    private _router: Router,
  ) { }

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
  campoEsValido( campo:string){
    return this.singinForm.controls[campo].errors && this.singinForm.controls[campo].touched;
  }
  send(){
    this.erroresDB = [];
    if(this.singinForm.invalid){
      this.singinForm.markAllAsTouched();
    }else{
      console.log(this.singinForm.value)
      this._auth.singin(this.singinForm.value)
      .subscribe(
        (res:any)=>{
          this.singinForm.reset(); //Borra el contenido de los inputs
        },
        (error:any) =>{
          console.log(error)
          this.erroresDB.push(error.error.msg)
        }
      )
    }
  }
}
