import { HttpErrorResponse } from '@angular/common/http';
import { Component, Input, OnInit, SimpleChanges } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ConfirmationService, MessageService } from 'primeng/api';
import { DatosClinicos } from 'src/app/core/models/DatosClinicos';
import { User } from 'src/app/core/models/User.interface';
import { DatosClinicosService } from 'src/app/core/services/db/datos-clinicos.service';

@Component({
  selector: 'admin-solicitudes-form',
  templateUrl: './solicitudes-form.component.html',
  styleUrls: ['./solicitudes-form.component.scss']
})
export class SolicitudesFormComponent implements OnInit {

  constructor(
    private _build:FormBuilder,
    private _datosClinicos:DatosClinicosService,
    private _confirmationService:ConfirmationService,
    private _message:MessageService,

    ) { }


  ngOnChanges(changes: SimpleChanges): void {
    if(changes['user']){
      this._datosClinicos.findUserDatosClinicos(this.user.id).subscribe(
        (res)=>{
         this.DatosClinicosUser = res;
         this.haveDatosClinicos = true;
         console.log(res)
         this.reset()
        },
        (err:HttpErrorResponse)=>{
          if(err.status == 404){
             this.DatosClinicosUser =null;
             this.haveDatosClinicos = false;
             this.reset(true)
          }else{
            console.error(err)
          }
        }
      )
    }
  }

  solicitudesForm:FormGroup = this._build.group({
    have_enfermedades:[false,Validators.required],
  })

  erroresDB:String[] =[];
  haveDatosClinicos:boolean = false;
  DatosClinicosUser!:DatosClinicos |null;

  ngOnInit(): void {
  }
  
  @Input() user!:User;

  //? Mensages de error
  get have_enfermedadesErrorMsg(): string{
    const errors = this.solicitudesForm.get('have_enfermedades')?.errors;
    if(errors?.['required']){
      return 'Have enfermedades es obligatorio'
    }else if(errors?.['pattern']){
      return 'Formato no válido'
    }
    return '';
  }

  // get enfermedadesErrorMsg(): string{
  //   const errors = this.solicitudesForm.get('tipo')?.errors;
  //   if(errors?.['required']){
  //     return 'El tipo es obligatorio'
  //   }else if(errors?.['pattern']){
  //     return 'Formato no válido'
  //   }
  //   return '';
  // }

  campoEsValido( campo:string){
    return this.solicitudesForm.controls[campo].errors && this.solicitudesForm.controls[campo].touched;
  }


  btnStatusCreate(){
    if(this.user && this.DatosClinicosUser == null && !this.haveDatosClinicos){
      return true;
    }
    return false;
  }
  btnStatusUpdate(){
    if(this.user && this.DatosClinicosUser != null && this.haveDatosClinicos){
      return true;
    }
    return false;
  }

  //? Resetear datos
  reset(valuedefault = false){

    if(!valuedefault){
      if(this.DatosClinicosUser){
        // this.solicitudesForm.controls['have_enfermedades'].setValue(this.DatosClinicosUser?.have_enfermedades);
      }
    }else{
      // this.solicitudesForm.controls['have_enfermedades'].setValue(false);
    }

  }

  crear(){
    // this.erroresDB = [];
    // if(this.solicitudesForm.invalid){
    //   this.solicitudesForm.markAllAsTouched();
    //   console.log("Formulario inválido")
    // }else{
    //   console.log(this.solicitudesForm.value)
    //   let resul = this.solicitudesForm.value;
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
    //       }else{
    //         this.erroresDB.push(error.error.name)
    //       }
    //     }
    //   )
    // }

  }

  update(){
    // console.log("Click en actualizar")
    // this.erroresDB = [];
    // if(this.solicitudesForm.invalid){
    //   this.solicitudesForm.markAllAsTouched();
    //   console.log("Formulario invalido")
    // }else{
    //   console.log(this.solicitudesForm.value)
    //   let resul:any= this.solicitudesForm.value;
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
    //       }else{
    //         this.erroresDB.push(error.error.name)
    //       }

    //     }
    //   )
    // }

  }

  eliminar(event:any){
  //   this._confirmationService.confirm({
  //     target: event.target,
  //     message: '¿Estas seguro que quieres eliminar los datos clínicos?',
  //     icon: 'pi pi-exclamation-triangle',
  //     accept: () => {
  //         this._datosClinicos.delete(this.DatosClinicosUser?.id).subscribe(
  //           (res)=>{
  //             this._message.add({severity:'info', summary:'Eliminado', detail:'Se ha eliminado las medidas del usuario'});
  //             this.DatosClinicosUser =null;
  //             this.haveDatosClinicos =false;
  //             this.solicitudesForm.reset()
  //             // this.delete.emit(true)
  //           },
  //           (err)=>{
  //             this.erroresDB.push(err.error.name)
  //             console.error(err)
  //           }
  //         )
      
  //       },
  //     reject: () => {
  //     }
  // });

  }

}
