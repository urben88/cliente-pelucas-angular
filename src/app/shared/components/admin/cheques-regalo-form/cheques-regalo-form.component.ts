import { HttpErrorResponse } from '@angular/common/http';
import { Component, Input, OnChanges, OnInit, SimpleChanges } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ConfirmationService, MessageService } from 'primeng/api';
import { ChequeRegalo } from 'src/app/core/models/ChequeRegalo';
import { ChequesRegaloService } from 'src/app/core/services/db/cheques-regalo.service';

import {TiposChequesRegalo} from '../../../../core/enums/Cheques_regalo'
@Component({
  selector: 'admin-cheques-regalo-form',
  templateUrl: './cheques-regalo-form.component.html',
  styleUrls: ['./cheques-regalo-form.component.scss']
})
export class ChequesRegaloFormComponent implements OnInit,OnChanges {

  constructor(
    private _build:FormBuilder,
    private _confirmationService:ConfirmationService,
    private _message:MessageService,
    private _chequesRegalo:ChequesRegaloService

    ) { }


  ngOnChanges(changes: SimpleChanges): void {
    console.log(changes)
    if(changes['chequeRegalo']){
      if(this.chequeRegalo){
         this.reset()
      }else{
         this.reset(true)
      }
    }
  }

  chequesRegaloForm:FormGroup = this._build.group({
    tipo:['',[Validators.required]],
    servicio:['',[Validators.required,Validators.maxLength(50)]],
    descripcion:['',[Validators.maxLength(400)]],
  })

  tiposselect = [
    {name: 'Estética', value: TiposChequesRegalo.estética},
    {name: 'Peluquería', value: TiposChequesRegalo.peluquería},
    {name: 'Recogida', value: TiposChequesRegalo.recogida},
  ];


  erroresDB:String[] =[];
  haveDatosClinicos:boolean = false;

  ngOnInit(): void {
  }
  
  @Input() chequeRegalo!:ChequeRegalo|null;

  //? Mensages de error
  get tipoErrorMsg(): string{
    const errors = this.chequesRegaloForm.get('tipo')?.errors;
    if(errors?.['required']){
      return 'El tipo es obligatorio'
    }else if(errors?.['pattern']){
      return 'Formato no válido'
    }else if(errors?.['maxlength']){
      return 'Has superado el máximo de letras'
    }
    return '';
  }
  get servicioErrorMsg(): string{
    const errors = this.chequesRegaloForm.get('servicio')?.errors;
    if(errors?.['required']){
      return 'El servicio es obligatorio'
    }else if(errors?.['pattern']){
      return 'Formato no válido'
    }else if(errors?.['maxlength']){
      return 'Has superado el máximo de letras'
    }
    return '';
  }
  get descripcionErrorMsg(): string{
    const errors = this.chequesRegaloForm.get('descripcion')?.errors;
    if(errors?.['required']){
      return 'La descipcion es obligatorio'
    }else if(errors?.['pattern']){
      return 'Formato no válido'
    }else if(errors?.['maxlength']){
      return 'Has superado el máximo de letras'
    }
    return '';
  }

  campoEsValido( campo:string){
    return this.chequesRegaloForm.controls[campo].errors && this.chequesRegaloForm.controls[campo].touched;
  }

  //? Evento del switch de si tiene enfermedades
  cambiarSwitchEnfermedades(event:any){
    this.chequesRegaloForm.controls['have_enfermedades'].setValue(event.checked);
  }
  //? Evento del switch de si tiene alergias
  cambiarSwitchAlergias(event:any){
    this.chequesRegaloForm.controls['have_alergias'].setValue(event.checked);
  }

  btnStatusCreate(){
    if(!this.chequeRegalo){
      return true;
    }
    return false;
  }
  btnStatusUpdate(){
    if(this.chequeRegalo){
      return true;
    }
    return false;
  }

  //? Resetear datos
  reset(valuedefault = false){

    if(!valuedefault){
      this.chequesRegaloForm.controls['tipo'].setValue(this.chequeRegalo?.tipo);
      this.chequesRegaloForm.controls['servicio'].setValue(this.chequeRegalo?.servicio);
      this.chequesRegaloForm.controls['descripcion'].setValue(this.chequeRegalo?.descripcion);
    }else{
      this.chequesRegaloForm.controls['tipo'].setValue('');
      this.chequesRegaloForm.controls['servicio'].setValue('');
      this.chequesRegaloForm.controls['descripcion'].setValue('');
    }

  }

  crear(){
       this.erroresDB = [];
    if(this.chequesRegaloForm.invalid){
      this.chequesRegaloForm.markAllAsTouched();
      console.log("Formulario inválido")
    }else{
      console.log(this.chequesRegaloForm.value)
      let resul = this.chequesRegaloForm.value;
      console.log(resul)
      this._chequesRegalo.create(resul)
      .subscribe(
        (res:any)=>{
          this._message.add({severity:'success', summary: 'Creado', detail: 'Se han añadido los datos clínicos correctamente'});
          // this.SimpleTableComponent .reset(); //Borra el contenido de los inputs
        },
        (error:any) =>{
          console.log(error)
          if(error.error.msg){
            this.erroresDB.push(error.error.msg)
            this._message.add({severity:'error', summary: 'Error', detail: error.error.msg});
          }else{
            this.erroresDB.push(error.error.name)
          }
        }
      )
    }

  }

  update(){
    console.log("Click en actualizar")
    this.erroresDB = [];
    if(this.chequesRegaloForm.invalid){
      this.chequesRegaloForm.markAllAsTouched();
      console.log("Formulario invalido")
    }else{
      console.log(this.chequesRegaloForm.value)
      let resul:any= this.chequesRegaloForm.value;
      console.log(resul)
      this._chequesRegalo.update(this.chequeRegalo?.id,resul)
      .subscribe(
        (res)=>{
          console.log(res)
          this._message.add({severity:'success', summary: 'Creado', detail: 'Se ha actualizado el cheque regalo correctamente'});
          // this.medidasForm.reset(); //Borra el contenido de los inputs
        },
        (error:any) =>{
          console.log(error)
          if(error.error.msg){
            this.erroresDB.push(error.error.msg)
            this._message.add({severity:'error', summary: 'Error', detail: error.error.msg});
          }else{
            this.erroresDB.push(error.error.name)
          }

        }
      )
    }

  }

  eliminar(event:any){
    this._confirmationService.confirm({
      target: event.target,
      message: '¿Estas seguro que quieres eliminar los el cheque regalo?',
      icon: 'pi pi-exclamation-triangle',
      accept: () => {
          this._chequesRegalo.delete(this.chequeRegalo?.id).subscribe(
            (res)=>{
              this._message.add({severity:'info', summary:'Eliminado', detail:'Se ha eliminado el cheque regalo'});
              this.chequesRegaloForm.reset()
              this.chequeRegalo = null;
              // this.delete.emit(true)
            },
            (err)=>{
              console.error(err)
              this.erroresDB.push(err.error.name)
            }
          )
      
        },
      reject: () => {
      }
    });
  }
}
