import { Component, Input, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/core/services/db/auth.service';
import { Notificacion } from '../../../../core/models/Notificacion';
import {TiposNotificaciones} from '../../../../core/enums/Notificaciones'
@Component({
  selector: 'admin-form-notificaciones',
  templateUrl: './form-notificaciones.component.html',
  styleUrls: ['./form-notificaciones.component.scss']
})
export class FormNotificacionesComponent implements OnInit {
  
  TiposNotificaciones:any[]=[
    {name:"Exito", code:TiposNotificaciones.success},
    {name:"Información", code:TiposNotificaciones.info},
    {name:"Aviso", code:TiposNotificaciones.warn},
  ]
  tipoSelected:any = {name:"Exito", code:TiposNotificaciones.success};
  @Input() notificacion!:Notificacion; 

  ngOnInit(): void {
  }

  erroresDB:String[] =[];
  notificacionesForm:FormGroup =  this._builder.group({
    tipo:['', [Validators.required]],
    header:['',[Validators.required,Validators.minLength(5),Validators.maxLength(100)]],
    mensaje:['',[Validators.required,,Validators.minLength(5)]],
  })

  constructor(
    private _builder: FormBuilder,
    private _auth: AuthService,
    private _router: Router,
  ) { }

  //? Mensages de error
  get tipoErrorMsg(): string{
    const errors = this.notificacionesForm.get('tipo')?.errors;
    if(errors?.['required']){
      return 'El email es obligatorio'
    }else if(errors?.['pattern']){
      return 'Formato no válido'
    }
    return '';
  }
  get headerErrorMsg(): string{
    const errors = this.notificacionesForm.get('header')?.errors;
    if(errors?.['required']){
      return 'La cabecera es obligatoria'
    }else if (errors?.['minlength']){
      return 'La cabecera debe de tener una longitud mínima de 5 carácteres';
    }else if (errors?.['maxlength']){
      return 'Como máximo se permiten 100 carácteres en la cabecera';
    }
    return '';
  }
  get mensajeErrorMsg(): string{
    const errors = this.notificacionesForm.get('mensaje')?.errors;
    if(errors?.['required']){
      return 'El mensaje es obligatoro'
    }else if (errors?.['minlength']){
      return 'El mensaje debe de tener una longitud mínima de 5 carácteres';
    }else if (errors?.['maxlength']){
      return 'Como máximo se permiten 100 carácteres el mensaje';
    }
    return '';
  }
  campoEsValido( campo:string){
    return this.notificacionesForm.controls[campo].errors && this.notificacionesForm.controls[campo].touched;
  }
  send(){
    this.erroresDB = [];
    if(this.notificacionesForm.invalid){
      this.notificacionesForm.markAllAsTouched();
    }else{
      console.log(this.notificacionesForm.value)
      this._auth.singin(this.notificacionesForm.value)
      .subscribe(
        (res)=>{
          this.notificacionesForm.reset(); //Borra el contenido de los inputs
        },
        (error:any) =>{
          console.log(error)
          this.erroresDB.push(error.error.msg)
        }
      )
    }
  }
}
