import { Component, EventEmitter, Input, OnInit, Output, OnChanges, SimpleChanges } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/core/services/db/auth.service';
import { Notificacion } from '../../../../core/models/Notificacion';
import {TiposNotificaciones} from '../../../../core/enums/Notificaciones'
import { NotificacionesService } from '../../../../core/services/db/notificaciones.service';
import { User } from '../../../../core/models/User.interface';
import { MessageService } from 'primeng/api';
@Component({
  selector: 'admin-form-notificaciones',
  templateUrl: './form-notificaciones.component.html',
  styleUrls: ['./form-notificaciones.component.scss'],
  providers: [MessageService]
})
export class FormNotificacionesComponent implements OnInit,OnChanges {
  
  TiposNotificaciones:any[]=[
    {name:"Exito", code:TiposNotificaciones.success},
    {name:"Información", code:TiposNotificaciones.info},
    {name:"Aviso", code:TiposNotificaciones.warn},
  ]
  formats: string[] = ['bold', 'italic','video'];
  tipoSelected:any ={name:"Exito", code:TiposNotificaciones.success};
  @Input() notificacion!:Notificacion |null; 
  @Input() user!:User;
  @Output() new = new EventEmitter<Notificacion>();
  @Output() newupdate = new EventEmitter<Notificacion>();

  ngOnInit(): void {
    this.notificacion = null;
  }

  erroresDB:String[] =[];
  notificacionesForm:FormGroup =  this._builder.group({
    tipo:['success', [Validators.required]],
    header:['',[Validators.required,Validators.minLength(5),Validators.maxLength(100)]],
    mensaje:['',[Validators.required,,Validators.minLength(5)]],
  })

  constructor(
    private _builder: FormBuilder,
    private _auth: AuthService,
    private _notificaciones:NotificacionesService,
    private _message:MessageService,
    private _router: Router,
  ) { }

  ngOnChanges(changes: SimpleChanges): void {
    if(changes['notificacion']){
      console.log("Se ha cambiado de notificación")
      this.notificacionesForm.controls['tipo'].setValue(this.notificacion?.tipo );
      this.notificacionesForm.controls['header'].setValue(this.notificacion?.header);
      this.notificacionesForm.controls['mensaje'].setValue(this.notificacion?.mensaje);
    }
    if(changes['user']){
      console.log(this.user,"Cambia useeer")
    }
  }

  //? Mensages de error
  get tipoErrorMsg(): string{
    const errors = this.notificacionesForm.get('tipo')?.errors;
    if(errors?.['required']){
      return 'El tipo es obligatorio'
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

  //? Para retetear los datos
  reset( event:any){
    if(this.notificacion){

      this._notificaciones.show(this.notificacion.id).subscribe(
        (res:Notificacion) => {
          this.notificacionesForm.controls['tipo'].setValue(res.tipo );
          this.notificacionesForm.controls['header'].setValue(res.header);
          this.notificacionesForm.controls['mensaje'].setValue(res.mensaje);
        },
        (err: any) => {
          throw err
        }
      )
    }
  
  }
  send(){
    this.erroresDB = [];
    if(this.notificacionesForm.invalid){
      this.notificacionesForm.markAllAsTouched();
      console.log("Formulario invalido")
    }else{

      console.log(this.notificacionesForm.value)
      let resul:any={
        tipo:this.notificacionesForm.controls['tipo'].value,
        header:this.notificacionesForm.controls['header'].value,
        mensaje:this.notificacionesForm.controls['mensaje'].value,
        user_id: this.user.id,
      }
      console.log(resul)
      this._notificaciones.create(resul)
      .subscribe(
        (res)=>{
          console.log(res,'creado en form notificaciones')
          this.new.emit(res)
          this._message.add({severity:'success', summary: 'Creado', detail: 'Se ha creado la notificación correctamente'});
          this.notificacionesForm.reset(); //Borra el contenido de los inputs
        },
        (error:any) =>{
          console.log(error)
          if(error.error.msg){
            this.erroresDB.push(error.error.msg)
            this._message.add({severity:'error', summary: 'Error', detail: error.error.msg});
          }else{
            if(error.statusText == "Payload Too Large"){
              this._message.add({severity:'error', summary: 'Error', detail: "No puedes subir un mensaje tan pesado"});
              this.erroresDB.push("No puedes subir un mensaje tan pesado")
            }
          }

        }
      )
    }
  }
  //TODO Falta hacer la actualización de notificaciones
  update(){
    console.log("Click en actualizar")
    this.erroresDB = [];
    if(this.notificacionesForm.invalid){
      this.notificacionesForm.markAllAsTouched();
      console.log("Formulario invalido")
    }else{
      console.log(this.notificacionesForm.value)
      let resul:any={
        tipo:this.notificacionesForm.controls['tipo'].value,
        header:this.notificacionesForm.controls['header'].value,
        mensaje:this.notificacionesForm.controls['mensaje'].value
      }
      console.log(resul)
      this._notificaciones.update(this.notificacion?.id,resul)
      .subscribe(
        (res)=>{
          console.log(res)
          this.newupdate.emit(res)
          this._message.add({severity:'success', summary: 'Creado', detail: 'Se ha actualizado la notificación correctamente'});
          // this.notificacionesForm.reset(); //Borra el contenido de los inputs
        },
        (error:any) =>{
          console.log(error)
          if(error.error.msg){
            this.erroresDB.push(error.error.msg)
            this._message.add({severity:'error', summary: 'Error', detail: error.error.msg});
          }else{
            if(error.statusText == "Payload Too Large"){
              this._message.add({severity:'error', summary: 'Error', detail: "No puedes subir un mensaje tan pesado"});
              this.erroresDB.push("No puedes subir un mensaje tan pesado")
            }
          }

        }
      )
    }

  }
}
