import { HttpErrorResponse } from '@angular/common/http';
import { Component, EventEmitter, Input, OnChanges, OnInit, Output, SimpleChanges } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ConfirmationService, MessageService } from 'primeng/api';
import { Medidas } from 'src/app/core/models/Medidas';
import { User } from 'src/app/core/models/User.interface';
import { MedidasService } from 'src/app/core/services/db/medidas.service';
import patrones from '../../../../core/utils/validaciones/patterns'
@Component({
  selector: 'app-medidas-form',
  templateUrl: './medidas-form.component.html',
  styleUrls: ['./medidas-form.component.scss'],
  providers: [ConfirmationService, MessageService]
})
export class MedidasFormComponent implements OnInit,OnChanges {

  constructor(
    private _build:FormBuilder,
    private _medidas:MedidasService,
    private _message:MessageService,
    private _confirmationService:ConfirmationService
    ) { }

    ngOnChanges(changes: SimpleChanges): void {
       if(changes['user']){
         this._medidas.findUserMedidas(this.user.id).subscribe(
           (res)=>{
            this.medidasUser = res;
            this.haveMedidas = true;
            console.log(res)
            this.reset()
           },
           (err:HttpErrorResponse)=>{
             if(err.status == 404){
                this.medidasUser =null;
                this.haveMedidas = false;
                this.reset(true)
                console.log("entraa",this.haveMedidas,this.user)
             }else{
                console.error(err)
             }
           }
         )
       }
    }

  @Input() user!:User;
  // @Output() delete = new EventEmitter<boolean>();
  medidasUser!:Medidas|null;
  haveMedidas:boolean =false;
  erroresDB:String[] =[];


  val!:number;
  medidasForm:FormGroup = this._build.group({
    redondo:[0,[Validators.required,Validators.pattern(patrones.decimal)]],
    patilla_a_patilla:[0,[Validators.required,Validators.pattern(patrones.decimal)]],
    largo_de_frente:[0,[Validators.required,Validators.pattern(patrones.decimal)]],
    sien_a_sien:[0,[Validators.required,Validators.pattern(patrones.decimal)]],
    oreja_a_oreja_por_encima:[0,[Validators.required,Validators.pattern(patrones.decimal)]],
    anchura_del_cuello_superior:[0,[Validators.required,Validators.pattern(patrones.decimal)]],
    oreja_a_oreja_por_nacimiento_pelo:[0,[Validators.required,Validators.pattern(patrones.decimal)]],
    anchura_cuello_inferior:[0,[Validators.required,Validators.pattern(patrones.decimal)]],
  })

  medicamentosSelected!:any;
  ngOnInit(): void {
  }
  

  //? Mensages de error
    get redondoErrorMsg(): string{
      const errors = this.medidasForm.get('redondo')?.errors;
      if(errors?.['required']){
        return 'La medida es obligatoria'
      }else if(errors?.['pattern']){
        return 'Formato no válido'
      }
      return '';
    }
    get patilla_a_patillaErrorMsg(): string{
      const errors = this.medidasForm.get('patilla_a_patilla')?.errors;
      if(errors?.['required']){
        return 'La medida es obligatoria'
      }else if(errors?.['pattern']){
        return 'Formato no válido'
      }
      return '';
    }
    get largo_de_frenteErrorMsg(): string{
      const errors = this.medidasForm.get('largo_de_frente')?.errors;
      if(errors?.['required']){
        return 'La medida es obligatoria'
      }else if(errors?.['pattern']){
        return 'Formato no válido'
      }
      return '';
    }
    get sien_a_sienErrorMsg(): string{
      const errors = this.medidasForm.get('sien_a_sien')?.errors;
      if(errors?.['required']){
        return 'La medida es obligatoria'
      }else if(errors?.['pattern']){
        return 'Formato no válido'
      }
      return '';
    }
    get oreja_a_oreja_por_encimaErrorMsg(): string{
      const errors = this.medidasForm.get('oreja_a_oreja_por_encima')?.errors;
      if(errors?.['required']){
        return 'La medida es obligatoria'
      }else if(errors?.['pattern']){
        return 'Formato no válido'
      }
      return '';
    }
    get anchura_del_cuello_superiorErrorMsg(): string{
      const errors = this.medidasForm.get('anchura_del_cuello_superior')?.errors;
      if(errors?.['required']){
        return 'La medida es obligatoria'
      }else if(errors?.['pattern']){
        return 'Formato no válido'
      }
      return '';
    }
    get oreja_a_oreja_por_nacimiento_peloErrorMsg(): string{
      const errors = this.medidasForm.get('oreja_a_oreja_por_nacimiento_pelo')?.errors;
      if(errors?.['required']){
        return 'La medida es obligatoria'
      }else if(errors?.['pattern']){
        return 'Formato no válido'
      }
      return '';
    }
    get anchura_cuello_inferiorErrorMsg(): string{
      const errors = this.medidasForm.get('anchura_cuello_inferior')?.errors;
      if(errors?.['required']){
        return 'La medida es obligatoria'
      }else if(errors?.['pattern']){
        return 'Formato no válido'
      }
      return '';
    }
  // get enfermedadesErrorMsg(): string{
  //   const errors = this.medidasForm.get('tipo')?.errors;
  //   if(errors?.['required']){
  //     return 'El tipo es obligatorio'
  //   }else if(errors?.['pattern']){
  //     return 'Formato no válido'
  //   }
  //   return '';
  // }

  campoEsValido( campo:string){
    return this.medidasForm.controls[campo].errors && this.medidasForm.controls[campo].touched;
  }
  errorStyle(control:string){
    if(this.medidasForm.get(control)?.errors){
      return 'inputError'
    }else{
      return ''
    }
  }
  reset(valuedefault = false){

    if(!valuedefault){
      if(this.medidasUser){
        this.medidasForm.controls['redondo'].setValue(this.medidasUser?.redondo );
        this.medidasForm.controls['redondo'].setValue(this.medidasUser?.redondo);
        this.medidasForm.controls['largo_de_frente'].setValue(this.medidasUser?.largo_de_frente);
        this.medidasForm.controls['sien_a_sien'].setValue(this.medidasUser?.sien_a_sien);
        this.medidasForm.controls['oreja_a_oreja_por_encima'].setValue(this.medidasUser?.oreja_a_oreja_por_encima);
        this.medidasForm.controls['anchura_del_cuello_superior'].setValue(this.medidasUser?.anchura_del_cuello_superior);
        this.medidasForm.controls['oreja_a_oreja_por_nacimiento_pelo'].setValue(this.medidasUser?.oreja_a_oreja_por_nacimiento_pelo);
        this.medidasForm.controls['anchura_cuello_inferior'].setValue(this.medidasUser?.anchura_cuello_inferior);
      }
    }else{
      this.medidasForm.controls['redondo'].setValue(0);
        this.medidasForm.controls['redondo'].setValue(0);
        this.medidasForm.controls['largo_de_frente'].setValue(0);
        this.medidasForm.controls['sien_a_sien'].setValue(0);
        this.medidasForm.controls['oreja_a_oreja_por_encima'].setValue(0);
        this.medidasForm.controls['anchura_del_cuello_superior'].setValue(0);
        this.medidasForm.controls['oreja_a_oreja_por_nacimiento_pelo'].setValue(0);
        this.medidasForm.controls['anchura_cuello_inferior'].setValue(0);
    }

  }
  btnStatusCreate(){
    if(this.medidasUser == null && !this.haveMedidas){
      return true;
    }
    return false;
  }
  btnStatusUpdate(){
    if(this.medidasUser != null && this.haveMedidas){
      return true;
    }
    return false;
  }
  crear(){
    this.erroresDB = [];
    if(this.medidasForm.invalid){
      this.medidasForm.markAllAsTouched();
      console.log("Formulario inválido")
    }else{
      console.log(this.medidasForm.value)
      let resul = this.medidasForm.value;
      resul['user_id'] = this.user.id;
      console.log(resul)
      this._medidas.create(resul)
      .subscribe(
        (res)=>{
          this._message.add({severity:'success', summary: 'Creado', detail: 'Se han añadido las medidas correctamente'});
          this.haveMedidas = true;
          this.medidasUser = res;
          // this.medidasForm.reset(); //Borra el contenido de los inputs
        },
        (error:any) =>{
          console.log(error)
          if(error.error.msg){
            this.erroresDB.push(error.error.msg)
            this._message.add({severity:'error', summary: 'Error', detail: error.error.msg});
          }
        }
      )
    }
  }

  update(){
 console.log("Click en actualizar")
    this.erroresDB = [];
    if(this.medidasForm.invalid){
      this.medidasForm.markAllAsTouched();
      console.log("Formulario invalido")
    }else{
      console.log(this.medidasForm.value)
      let resul:any= this.medidasForm.value;
      resul['user_id']=this.user.id;
      console.log(resul)
      this._medidas.update(this.user.id,resul)
      .subscribe(
        (res)=>{
          console.log(res)
          this.medidasUser = res;
          this.haveMedidas = true;
          this._message.add({severity:'success', summary: 'Creado', detail: 'Se ha actualizado la notificación correctamente'});
          // this.medidasForm.reset(); //Borra el contenido de los inputs
        },
        (error:any) =>{
          console.log(error)
          if(error.error.msg){
            this.erroresDB.push(error.error.msg)
            this._message.add({severity:'error', summary: 'Error', detail: error.error.msg});
          }

        }
      )
    }
  }

  eliminar(event:any){
    this._confirmationService.confirm({
      target: event.target,
      message: 'Estas seguro que quieres eliminarlas?',
      icon: 'pi pi-exclamation-triangle',
      accept: () => {
          this._medidas.delete(this.medidasUser?.id).subscribe(
            (res)=>{
              this._message.add({severity:'info', summary:'Eliminado', detail:'Se ha eliminado las medidas del usuario'});
              this.medidasUser =null;
              this.haveMedidas =false;
              // this.delete.emit(true)
            },
            (err)=>{
              console.error(err)
            }
          )
      
        },
      reject: () => {
      }
  });
  }


}
