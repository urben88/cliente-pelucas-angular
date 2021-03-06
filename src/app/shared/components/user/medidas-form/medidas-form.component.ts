import { HttpErrorResponse } from '@angular/common/http';
import { Component, EventEmitter, Input, OnChanges, OnInit, Output, SimpleChanges } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ConfirmationService, MessageService } from 'primeng/api';
import { Medidas } from 'src/app/core/models/Medidas';
import { User } from 'src/app/core/models/User.interface';
import { MedidasService } from 'src/app/core/services/db/medidas.service';
import patrones from '../../../../core/utils/validaciones/patterns'
import { SolicitudMedidasService } from '../../../../core/services/forComponents/solicitud-medidas.service';
@Component({
  selector: 'user-medidas-form',
  templateUrl: './medidas-form.component.html',
  styleUrls: ['./medidas-form.component.scss'],
  providers: [ConfirmationService, MessageService]
})
export class MedidasFormComponent implements OnInit,OnChanges {

  constructor(
    private _build:FormBuilder,
    private _medidas:MedidasService,
    private _message:MessageService,
    private _confirmationService:ConfirmationService,
    private SolicitudMedidasService:SolicitudMedidasService
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
       this.medidasForm.valueChanges.subscribe(
        (res:any)=>{
          this.status.emit(this.medidasForm.valid);
        }
      )
    }

  @Input() user!:User;
  @Input() forAdmin = false;
  @Input() forSolicitud = false;
  // @Output() delete = new EventEmitter<boolean>();
  medidasUser!:Medidas|null;
  haveMedidas:boolean =false;
  erroresDB:String[] =[];

  //?Para enviar el estado a la solicitud
  @Output() status = new EventEmitter();


  val!:number;
  medidasForm:FormGroup = this._build.group({
    redondo:[null,[Validators.required,Validators.pattern(patrones.decimal)]],
    patilla_a_patilla:[null,[Validators.required,Validators.pattern(patrones.decimal)]],
    largo_de_frente:[null,[Validators.required,Validators.pattern(patrones.decimal)]],
    sien_a_sien:[null,[Validators.required,Validators.pattern(patrones.decimal)]],
    oreja_a_oreja_por_encima:[null,[Validators.required,Validators.pattern(patrones.decimal)]],
    anchura_del_cuello_superior:[null,[Validators.required,Validators.pattern(patrones.decimal)]],
    oreja_a_oreja_por_nacimiento_pelo:[null,[Validators.required,Validators.pattern(patrones.decimal)]],
    anchura_cuello_inferior:[null,[Validators.required,Validators.pattern(patrones.decimal)]],
  })

  medicamentosSelected!:any;
  ngOnInit(): void {
     //?Para cuando uso este componente desde una solicitud
     this.SolicitudMedidasService.$emitter.subscribe(
      (res)=>{
        console.log(res,"EVENTOOOOO SERVICIO MEDIDAAAAAS")
        this.crear();
        this.status.emit(this.medidasForm.valid)
      }
    )
  }
  

  //? Mensages de error
    get redondoErrorMsg(): string{
      const errors = this.medidasForm.get('redondo')?.errors;
      if(errors?.['required']){
        return 'La medida es obligatoria'
      }else if(errors?.['pattern']){
        return 'Formato no v??lido'
      }
      return '';
    }
    get patilla_a_patillaErrorMsg(): string{
      const errors = this.medidasForm.get('patilla_a_patilla')?.errors;
      if(errors?.['required']){
        return 'La medida es obligatoria'
      }else if(errors?.['pattern']){
        return 'Formato no v??lido'
      }
      return '';
    }
    get largo_de_frenteErrorMsg(): string{
      const errors = this.medidasForm.get('largo_de_frente')?.errors;
      if(errors?.['required']){
        return 'La medida es obligatoria'
      }else if(errors?.['pattern']){
        return 'Formato no v??lido'
      }
      return '';
    }
    get sien_a_sienErrorMsg(): string{
      const errors = this.medidasForm.get('sien_a_sien')?.errors;
      if(errors?.['required']){
        return 'La medida es obligatoria'
      }else if(errors?.['pattern']){
        return 'Formato no v??lido'
      }
      return '';
    }
    get oreja_a_oreja_por_encimaErrorMsg(): string{
      const errors = this.medidasForm.get('oreja_a_oreja_por_encima')?.errors;
      if(errors?.['required']){
        return 'La medida es obligatoria'
      }else if(errors?.['pattern']){
        return 'Formato no v??lido'
      }
      return '';
    }
    get anchura_del_cuello_superiorErrorMsg(): string{
      const errors = this.medidasForm.get('anchura_del_cuello_superior')?.errors;
      if(errors?.['required']){
        return 'La medida es obligatoria'
      }else if(errors?.['pattern']){
        return 'Formato no v??lido'
      }
      return '';
    }
    get oreja_a_oreja_por_nacimiento_peloErrorMsg(): string{
      const errors = this.medidasForm.get('oreja_a_oreja_por_nacimiento_pelo')?.errors;
      if(errors?.['required']){
        return 'La medida es obligatoria'
      }else if(errors?.['pattern']){
        return 'Formato no v??lido'
      }
      return '';
    }
    get anchura_cuello_inferiorErrorMsg(): string{
      const errors = this.medidasForm.get('anchura_cuello_inferior')?.errors;
      if(errors?.['required']){
        return 'La medida es obligatoria'
      }else if(errors?.['pattern']){
        return 'Formato no v??lido'
      }
      return '';
    }
  // get enfermedadesErrorMsg(): string{
  //   const errors = this.medidasForm.get('tipo')?.errors;
  //   if(errors?.['required']){
  //     return 'El tipo es obligatorio'
  //   }else if(errors?.['pattern']){
  //     return 'Formato no v??lido'
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
        this.medidasForm.controls['patilla_a_patilla'].setValue(this.medidasUser?.patilla_a_patilla);
        this.medidasForm.controls['largo_de_frente'].setValue(this.medidasUser?.largo_de_frente);
        this.medidasForm.controls['sien_a_sien'].setValue(this.medidasUser?.sien_a_sien);
        this.medidasForm.controls['oreja_a_oreja_por_encima'].setValue(this.medidasUser?.oreja_a_oreja_por_encima);
        this.medidasForm.controls['anchura_del_cuello_superior'].setValue(this.medidasUser?.anchura_del_cuello_superior);
        this.medidasForm.controls['oreja_a_oreja_por_nacimiento_pelo'].setValue(this.medidasUser?.oreja_a_oreja_por_nacimiento_pelo);
        this.medidasForm.controls['anchura_cuello_inferior'].setValue(this.medidasUser?.anchura_cuello_inferior);
      }
    }else{
      this.medidasForm.controls['redondo'].setValue(null);
        this.medidasForm.controls['patilla_a_patilla'].setValue(null);
        this.medidasForm.controls['largo_de_frente'].setValue(null);
        this.medidasForm.controls['sien_a_sien'].setValue(null);
        this.medidasForm.controls['oreja_a_oreja_por_encima'].setValue(null);
        this.medidasForm.controls['anchura_del_cuello_superior'].setValue(null);
        this.medidasForm.controls['oreja_a_oreja_por_nacimiento_pelo'].setValue(null);
        this.medidasForm.controls['anchura_cuello_inferior'].setValue(null);
    }

  }
  btnStatusCreate(){
    if(!this.forSolicitud && this.user && this.medidasUser == null && !this.haveMedidas){
      return true;
    }
    return false;
  }
  btnStatusUpdate(){
    if(!this.forSolicitud && this.user && this.medidasUser != null && this.haveMedidas){
      return true;
    }
    return false;
  }
  crear(){
    this.erroresDB = [];
    if(this.medidasForm.invalid){
      this.medidasForm.markAllAsTouched();
      console.log("Formulario inv??lido en medidas")
    }else{
      console.log("Se crean las medidas medidas")
      console.log(this.medidasForm.value)
      let resul = this.medidasForm.value;
      resul['user_id'] = this.user.id;
      console.log(resul)
      this._medidas.create(resul)
      .subscribe(
        (res)=>{
          this._message.add({severity:'success', summary: 'Creado', detail: 'Se han a??adido las medidas correctamente'});
          this.haveMedidas = true;
          this.medidasUser = res;
          console.log(res,"MEDIDAS CREADO")
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
          this._message.add({severity:'success', summary: 'Creado', detail: 'Se ha actualizado la notificaci??n correctamente'});
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
      message: '??Estas seguro que quieres eliminarlas?',
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
              this.erroresDB.push(err.error.name)
            }
          )
      
        },
      reject: () => {
      }
  });
  }


}
