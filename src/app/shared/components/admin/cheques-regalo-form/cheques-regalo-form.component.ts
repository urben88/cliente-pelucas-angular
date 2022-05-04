import { HttpErrorResponse } from '@angular/common/http';
import { Component, Input, OnInit, SimpleChanges } from '@angular/core';
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
export class ChequesRegaloFormComponent implements OnInit {

  constructor(
    private _build:FormBuilder,
    private _confirmationService:ConfirmationService,
    private _message:MessageService,
    private _chequesRegalo:ChequesRegaloService

    ) { }


  ngOnChanges(changes: SimpleChanges): void {
    if(changes['chequeRegalo']){

      // this._chequesRegalo.findUserDatosClinicos(this.user.id).subscribe(
      //   (res)=>{
      //    this.DatosClinicosUser = res;
      //    this.haveDatosClinicos = true;
      //    console.log(res)
      //    this.reset()
      //   },
      //   (err:HttpErrorResponse)=>{
      //     if(err.status == 404){
      //        this.DatosClinicosUser =null;
      //        this.haveDatosClinicos = false;
      //        this.reset(true)
      //     }else{
      //       console.error(err)
      //     }
      //   }
      // )
    }
  }

  chequesRegaloForm:FormGroup = this._build.group({
    have_enfermedades:[false,Validators.required],
    enfermedades:['',[Validators.maxLength(300)]],
    tratamiento_actual:['',[Validators.maxLength(300)]],
    medicacion:['',[Validators.maxLength(300)]],
    have_alergias:[false,[Validators.required]],
    alergias:['',[Validators.maxLength(300)]],
    alergias_medicacion:['',[Validators.maxLength(300)]],
  })

  erroresDB:String[] =[];
  haveDatosClinicos:boolean = false;

  ngOnInit(): void {
  }
  
  @Input() chequeRegalo!:ChequeRegalo;

  //? Mensages de error
  get have_enfermedadesErrorMsg(): string{
    const errors = this.chequesRegaloForm.get('have_enfermedades')?.errors;
    if(errors?.['required']){
      return 'Have enfermedades es obligatorio'
    }else if(errors?.['pattern']){
      return 'Formato no válido'
    }
    return '';
  }
  // get enfermedadesErrorMsg(): string{
  //   const errors = this.chequesRegaloForm.get('tipo')?.errors;
  //   if(errors?.['required']){
  //     return 'El tipo es obligatorio'
  //   }else if(errors?.['pattern']){
  //     return 'Formato no válido'
  //   }
  //   return '';
  // }

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
    if(!this.haveDatosClinicos){
      return true;
    }
    return false;
  }
  btnStatusUpdate(){
    if(this.haveDatosClinicos){
      return true;
    }
    return false;
  }

  //? Resetear datos
  reset(valuedefault = false){

    if(!valuedefault){
      
        // this.chequesRegaloForm.controls['have_enfermedades'].setValue(this.DatosClinicosUser?.have_enfermedades);
    }else{
      this.chequesRegaloForm.controls['have_enfermedades'].setValue(false);
      this.chequesRegaloForm.controls['enfermedades'].setValue('');
      this.chequesRegaloForm.controls['tratamiento_actual'].setValue('');
      this.chequesRegaloForm.controls['medicacion'].setValue('');
      this.chequesRegaloForm.controls['have_alergias'].setValue(false);
      this.chequesRegaloForm.controls['alergias'].setValue('');
      this.chequesRegaloForm.controls['alergias_medicacion'].setValue('');
    }

  }

  crear(){
    // this.erroresDB = [];
    // if(this.chequesRegaloForm.invalid){
    //   this.chequesRegaloForm.markAllAsTouched();
    //   console.log("Formulario inválido")
    // }else{
    //   console.log(this.chequesRegaloForm.value)
    //   let resul = this.chequesRegaloForm.value;
    //   resul['user_id'] = this.user.id;
    //   console.log(resul)
    //   this._datosClinicos.create(resul)
    //   .subscribe(
    //     (res:any)=>{
    //       this._message.add({severity:'success', summary: 'Creado', detail: 'Se han añadido los datos clínicos correctamente'});
    //       this.haveDatosClinicos = true;
    //       this.DatosClinicosUser = res;
    //       // this.SimpleTableComponent .reset(); //Borra el contenido de los inputs
    //     },
    //     (error:any) =>{
    //       console.log(error)
    //       if(error.error.msg){
    //         this.erroresDB.push(error.error.msg)
    //         this._message.add({severity:'error', summary: 'Error', detail: error.error.msg});
    //       }
    //     }
    //   )
    // }

  }

  update(){
    // console.log("Click en actualizar")
    // this.erroresDB = [];
    // if(this.chequesRegaloForm.invalid){
    //   this.chequesRegaloForm.markAllAsTouched();
    //   console.log("Formulario invalido")
    // }else{
    //   console.log(this.chequesRegaloForm.value)
    //   let resul:any= this.chequesRegaloForm.value;
    //   resul['user_id']=this.user.id;
    //   console.log(resul)
    //   this._datosClinicos.update(this.user.id,resul)
    //   .subscribe(
    //     (res)=>{
    //       console.log(res)
    //       this.DatosClinicosUser = res;
    //       this.haveDatosClinicos = true;
    //       this._message.add({severity:'success', summary: 'Creado', detail: 'Se ha actualizado los datos clínicos correctamente'});
    //       // this.medidasForm.reset(); //Borra el contenido de los inputs
    //     },
    //     (error:any) =>{
    //       console.log(error)
    //       if(error.error.msg){
    //         this.erroresDB.push(error.error.msg)
    //         this._message.add({severity:'error', summary: 'Error', detail: error.error.msg});
    //       }

    //     }
    //   )
    // }

  }

  eliminar(event:any){
    // this._confirmationService.confirm({
    //   target: event.target,
    //   message: 'Estas seguro que quieres eliminar los datos clínicos?',
    //   icon: 'pi pi-exclamation-triangle',
    //   accept: () => {
    //       this._datosClinicos.delete(this.DatosClinicosUser?.id).subscribe(
    //         (res)=>{
    //           this._message.add({severity:'info', summary:'Eliminado', detail:'Se ha eliminado las medidas del usuario'});
    //           this.DatosClinicosUser =null;
    //           this.haveDatosClinicos =false;
    //           this.chequesRegaloForm.reset()
    //           // this.delete.emit(true)
    //         },
    //         (err)=>{
    //           console.error(err)
    //         }
    //       )
      
    //     },
    //   reject: () => {
    //   }
    // });
  }
}
