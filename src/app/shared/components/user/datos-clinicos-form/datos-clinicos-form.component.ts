import { HttpErrorResponse } from '@angular/common/http';
import { Component, Input, OnChanges, OnInit, Output, SimpleChanges, EventEmitter } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ConfirmationService, MessageService } from 'primeng/api';
import { DatosClinicos } from 'src/app/core/models/DatosClinicos';
import { User } from 'src/app/core/models/User.interface';
import { DatosClinicosService } from 'src/app/core/services/db/datos-clinicos.service';
import { SolicitudDatosclinicosService } from '../../../../core/services/forComponents/solicitud-datosclinicos.service';
@Component({
  selector: 'user-datos-clinicos-form',
  templateUrl: './datos-clinicos-form.component.html',
  styleUrls: ['./datos-clinicos-form.component.scss']
})
export class DatosClinicosFormComponent implements OnInit,OnChanges {

  constructor(
    private _build:FormBuilder,
    private _datosClinicos:DatosClinicosService,
    private _confirmationService:ConfirmationService,
    private _message:MessageService,
    private solicitudDatosClinicos:SolicitudDatosclinicosService

    ) { }


  ngOnChanges(changes: SimpleChanges): void {
    if(changes['user']){
      console.log("USUARIO ENVIADO A DATOS CLINICOS",this.user,changes['user'].currentValue)
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
    this.datosclinicosForm.valueChanges.subscribe(
      (res:any)=>{
        this.status.emit(this.datosclinicosForm.valid);
      }
    )
  }

  datosclinicosForm:FormGroup = this._build.group({
    have_enfermedades:[false,Validators.required],
    enfermedades:['',[Validators.maxLength(300)]],
    tratamiento_actual:['',[Validators.maxLength(300)]],
    medicacion:['',[Validators.maxLength(300)]],
    have_alergias:[false,[Validators.required]],
    alergias:['',[Validators.maxLength(300)]],
    alergias_medicacion:['',[Validators.maxLength(300)]],
  },  { validators: [this.enfermedadesSelected(),this.alergiasSelected()] } )

  erroresDB:String[] =[];
  haveDatosClinicos:boolean = false;
  DatosClinicosUser!:DatosClinicos |null;

  //?Para enviar el estado a la solicitud
  @Output() status = new EventEmitter();

  ngOnInit(): void {
    //?Para cuando uso este componente desde una solicitud
    this.solicitudDatosClinicos.$emitter.subscribe(
      (res)=>{
        this.crear();
        console.log("SE CREA DATOS CLINICOS")
        this.status.emit(this.datosclinicosForm.valid);
      }
    )
  }
  
  @Input() user!:User;
  @Input() forAdmin:boolean = false;
  @Input() forSolicitud = false;

  //?Validaciones personalizadas para el formgroup
  enfermedadesSelected(){
    return (formGroup: FormGroup) => {
      const have_enfermedades:any = formGroup.get('have_enfermedades')?.value;
      // const have_protesis: string = formGroup.get('have_alergias')?.value;
         const enfermedades: any = formGroup.get('enfermedades')?.value;
         const tratamiento_actual: any = formGroup.get('tratamiento_actual')?.value;
         const medicacion: any = formGroup.get('medicacion')?.value;

      if (have_enfermedades) {
        if(enfermedades == '' || tratamiento_actual=='' || medicacion==''){
          return { enfermedades: "Los campos de las enfermedades deben estar rellenadas" };
        }
        if(enfermedades == null || tratamiento_actual==null || medicacion==null){
          return { enfermedades: "Los campos de las enfermedades deben estar rellenadas" };
        }
      }
      return null;
    };
  }
  alergiasSelected(){
    return (formGroup: FormGroup) => {
      const have_alergias:any = formGroup.get('have_alergias')?.value;
      // const have_protesis: string = formGroup.get('have_alergias')?.value;
         const alergias: any = formGroup.get('alergias')?.value;
         const alergias_medicacion: any = formGroup.get('alergias_medicacion')?.value;
         const medicacion: any = formGroup.get('medicacion')?.value;

      if (have_alergias) {
        if(alergias == '' || alergias_medicacion=='' ){
          return { alergias: "Los campos de las alergias deben estar rellenadas" };
        }
        if(alergias == null || alergias_medicacion==null){
          return { alergias: "Los campos de las alergias deben estar rellenadas" };
        }
      }
      return null;
    };
  }

  //? Mensages de error
  get have_enfermedadesErrorMsg(): string{
    const errors = this.datosclinicosForm.get('have_enfermedades')?.errors;
    if(errors?.['required']){
      return 'Have enfermedades es obligatorio'
    }else if(errors?.['pattern']){
      return 'Formato no válido'
    }
    return '';
  }
  get enfermedadesErrorMsg(): string{
    const errors = this.datosclinicosForm.get('enfermedades')?.errors;
    if(errors?.['required']){
      return 'Poner tus enfermedades es obligatorio'
    }else if(errors?.['pattern']){
      return 'Formato no válido'
    }else if(errors?.['maxlength']){
      return 'Has superado el máximo de letras'
    }
    return '';
  }
  get tratamiento_actualErrorMsg(): string{
    const errors = this.datosclinicosForm.get('tratamiento_actual')?.errors;
    if(errors?.['required']){
      return 'Poner el tratamiento actual es obligatorio'
    }else if(errors?.['pattern']){
      return 'Formato no válido'
    }else if(errors?.['maxlength']){
      return 'Has superado el máximo de letras'
    }
    return '';
  }
  get medicacionErrorMsg(): string{
    const errors = this.datosclinicosForm.get('medicacion')?.errors;
    if(errors?.['required']){
      return 'Poner los medicamentos es obligatorio'
    }else if(errors?.['pattern']){
      return 'Formato no válido'
    }else if(errors?.['maxlength']){
      return 'Has superado el máximo de letras'
    }
    return '';
  }
  get have_alergiasErrorMsg(): string{
    const errors = this.datosclinicosForm.get('have_alergias')?.errors;
    if(errors?.['required']){
      return 'Have alergias es obligatorio'
    }else if(errors?.['pattern']){
      return 'Formato no válido'
    }
    return '';
  }
  get alergiasErrorMsg(): string{
    const errors = this.datosclinicosForm.get('alergias')?.errors;
    if(errors?.['required']){
      return 'Poner las alergias es obligatorio'
    }else if(errors?.['pattern']){
      return 'Formato no válido'
    }else if(errors?.['maxlength']){
      return 'Has superado el máximo de letras'
    }
    return '';
  }
  get alergias_medicacionErrorMsg(): string{
    const errors = this.datosclinicosForm.get('alergias_medicacion')?.errors;
    if(errors?.['required']){
      return 'Las medicaciones para las alergias es obligatorio'
    }else if(errors?.['pattern']){
      return 'Formato no válido'
    }else if(errors?.['maxlength']){
      return 'Has superado el máximo de letras'
    }
    return '';
  }
  // get enfermedadesErrorMsg(): string{
  //   const errors = this.datosclinicosForm.get('tipo')?.errors;
  //   if(errors?.['required']){
  //     return 'El tipo es obligatorio'
  //   }else if(errors?.['pattern']){
  //     return 'Formato no válido'
  //   }
  //   return '';
  // }

  campoEsValido( campo:string){
    return this.datosclinicosForm.controls[campo].errors && this.datosclinicosForm.controls[campo].touched;
  }

  //? Evento del switch de si tiene enfermedades
  cambiarSwitchEnfermedades(event:any){
    this.datosclinicosForm.controls['have_enfermedades'].setValue(event.checked);
  }
  //? Evento del switch de si tiene alergias
  cambiarSwitchAlergias(event:any){
    this.datosclinicosForm.controls['have_alergias'].setValue(event.checked);
  }

  btnStatusCreate(){
    if(!this.forSolicitud && this.user && this.DatosClinicosUser == null && !this.haveDatosClinicos){
      return true;
    }
    return false;
  }
  btnStatusUpdate(){
    if( !this.forSolicitud && this.user && this.DatosClinicosUser != null && this.haveDatosClinicos){
      return true;
    }
    return false;
  }

  //? Resetear datos
  reset(valuedefault = false){

    if(!valuedefault){
      if(this.DatosClinicosUser){
        this.datosclinicosForm.controls['have_enfermedades'].setValue(this.DatosClinicosUser?.have_enfermedades);
        this.datosclinicosForm.controls['enfermedades'].setValue(this.DatosClinicosUser?.enfermedades);
        this.datosclinicosForm.controls['tratamiento_actual'].setValue(this.DatosClinicosUser?.tratamiento_actual);
        this.datosclinicosForm.controls['medicacion'].setValue(this.DatosClinicosUser?.medicacion);
        this.datosclinicosForm.controls['have_alergias'].setValue(this.DatosClinicosUser?.have_alergias);
        this.datosclinicosForm.controls['alergias'].setValue(this.DatosClinicosUser?.alergias);
        this.datosclinicosForm.controls['alergias_medicacion'].setValue(this.DatosClinicosUser?.alergias_medicacion);
      }
    }else{
      this.datosclinicosForm.controls['have_enfermedades'].setValue(false);
      this.datosclinicosForm.controls['enfermedades'].setValue('');
      this.datosclinicosForm.controls['tratamiento_actual'].setValue('');
      this.datosclinicosForm.controls['medicacion'].setValue('');
      this.datosclinicosForm.controls['have_alergias'].setValue(false);
      this.datosclinicosForm.controls['alergias'].setValue('');
      this.datosclinicosForm.controls['alergias_medicacion'].setValue('');
    }

  }

  crear(){
    this.erroresDB = [];
    if(this.datosclinicosForm.invalid){
      this.datosclinicosForm.markAllAsTouched();
      this._message.add({severity:'warn', summary: 'Aviso', detail: 'Debes de rellenar todos los campos de los datos clínicos para crearlos'});
      console.log("Formulario inválido Datos clínicos")
    }else{
      console.log(this.datosclinicosForm.value)
      let resul = this.datosclinicosForm.value;
      console.log("Se crean los datos clinicos")
      resul['user_id'] = this.user.id;
      console.log(resul)
      this._datosClinicos.create(resul)
      .subscribe(
        (res:any)=>{
          this._message.add({severity:'success', summary: 'Creado', detail: 'Se han añadido los datos clínicos correctamente'});
          this.haveDatosClinicos = true;
          this.DatosClinicosUser = res;
          console.log(res,"DATOS CLINICOS CREADO")
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
    if(this.datosclinicosForm.invalid){
      this.datosclinicosForm.markAllAsTouched();
      this._message.add({severity:'warn', summary: 'Aviso', detail: 'Debes de rellenar todos los campos para actualizarlos'});
      console.log("Formulario invalido")
    }else{
      console.log(this.datosclinicosForm.value)
      let resul:any= this.datosclinicosForm.value;
      if(!resul.have_alergias){
        resul.alergias = null;
        resul.alergias_medicacion = null;
      }
      if(!resul.have_enfermedades){
        resul.medicacion = null
        resul.tratamiento_actual = null
        resul.enfermedades = null
      }
      resul['user_id']=this.user.id;
      console.log(resul)
      this._datosClinicos.update(this.user.id,resul)
      .subscribe(
        (res)=>{
          console.log(res)
          this.DatosClinicosUser = res;
          this.haveDatosClinicos = true;
          this._message.add({severity:'success', summary: 'Creado', detail: 'Se ha actualizado los datos clínicos correctamente'});
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
      message: '¿Estas seguro que quieres eliminar los datos clínicos?',
      icon: 'pi pi-exclamation-triangle',
      accept: () => {
          this._datosClinicos.delete(this.DatosClinicosUser?.id).subscribe(
            (res)=>{
              this._message.add({severity:'info', summary:'Eliminado', detail:'Se ha eliminado las medidas del usuario'});
              this.DatosClinicosUser =null;
              this.haveDatosClinicos =false;
              this.datosclinicosForm.reset()
              this.datosclinicosForm.controls['have_enfermedades'].setValue(false)
              this.datosclinicosForm.controls['have_alergias'].setValue(false)
              // this.delete.emit(true)
            },
            (err)=>{
              this.erroresDB.push(err.error.name)
              console.error(err)
            }
          )
      
        },
      reject: () => {
      }
  });

  }





  //? Para que no se muevan las caja creo una condición
  //Este es para el ngClass
  posicion(){
    if( this.datosclinicosForm.controls['have_alergias'].value || this.datosclinicosForm.controls['have_enfermedades'].value){
      return 'flexcolumn'
    }else{
      return 'flexrow'
    }
  }
}
