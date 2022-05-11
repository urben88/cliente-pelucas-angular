import { HttpErrorResponse } from '@angular/common/http';
import { Component, Input, OnInit, SimpleChanges } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ConfirmationService, MessageService } from 'primeng/api';
import { Centro } from 'src/app/core/models/Centro.interface';
import { ChequeRegalo } from 'src/app/core/models/ChequeRegalo';
import { DatosClinicos } from 'src/app/core/models/DatosClinicos';
import { Cabello, Protesis, Textil } from 'src/app/core/models/Solicitud.interface.';
import { User } from 'src/app/core/models/User.interface';
import { DatosClinicosService } from 'src/app/core/services/db/datos-clinicos.service';
import { disponibilidad } from '../../../../core/enums/Solicitudes'
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


  ngOnChanges( ): void {
  
  }

  solicitudesForm:FormGroup = this._build.group({
    disponibilidad:[null,[Validators.required,Validators.maxLength(100)]],
    centrosId:[1,Validators.required],
    cheques_regaloId:[1,Validators.required],
    have_protesis:[false,Validators.required],
    have_cabello:[false,Validators.required],
    have_panuelo:[false,Validators.required],
  },{validators:[this.validarProducto(),this.validarTextil()]})

  @Input() forAdmin:boolean = false;
  erroresDB:String[] =[];
  otrosErrores:any = {
    producto: ''
  };
  haveDatosClinicos:boolean = false;
  DatosClinicosUser!:DatosClinicos |null;

  //?Productos
  protesis!:Protesis;
  protesisValid:boolean = false;

  cabello!:Cabello;
  cabelloValid:boolean = false;

  textil!:Textil;
  textilValid:boolean = false;

  cheque_regalo!:ChequeRegalo;
  cheque_regaloValid:boolean = false;

  centro!:Centro;
  centroValid:boolean = false;


  disponibilidad:any = disponibilidad;

  ngOnInit(): void {
  }
  
  @Input() user!:User;

  //? Mensages de error
  get disponibilidadErrorMsg(): string{
    const errors = this.solicitudesForm.get('disponibilidad')?.errors;
    if(errors?.['required']){
      return 'La disponibilidad es obligatoria'
    }else if(errors?.['pattern']){
      return 'Formato no válido'
    }else if(errors?.['maxlength']){
      return 'Límite de texto superado'
    }
    return '';
  }
  get centrosIdErrorMsg(): string{
    const errors = this.solicitudesForm.get('centrosId')?.errors;
    if(errors?.['required']){
      return 'El centro es obligatorio'
    }else if(errors?.['pattern']){
      return 'Formato no válido'
    }
    return '';
  }
  get cheques_regaloIdErrorMsg(): string{
    const errors = this.solicitudesForm.get('cheques_regaloId')?.errors;
    if(errors?.['required']){
      return 'El cheque regalo es obligatorio'
    }else if(errors?.['pattern']){
      return 'Formato no válido'
    }
    return '';
  }
  get have_protesisErrorMsg(): string{
    const errors = this.solicitudesForm.get('have_protesis')?.errors;
    if(errors?.['required']){
      return 'Es obligatorio seleccionarlo'
    }else if(errors?.['pattern']){
      return 'Formato no válido'
    }
    return '';
  }
  get have_cabelloErrorMsg(): string{
    const errors = this.solicitudesForm.get('have_cabello')?.errors;
    if(errors?.['required']){
      return 'Es obligatorio seleccionarlo'
    }else if(errors?.['pattern']){
      return 'Formato no válido'
    }
    return '';
  }
  get have_panueloErrorMsg(): string{
    const errors = this.solicitudesForm.get('have_panuelo')?.errors;
    if(errors?.['required']){
      return 'Es obligatorio seleccionarlo'
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
    if(!this.forAdmin){
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

  protesisChange(event:any){
    if(event.checked){
      this.solicitudesForm.controls['have_cabello'].setValue(false)
      this.addError({"protesis":"La prótesis no es correcta"})
    }else{
      // this.solicitudesForm.controls['have_cabello'].setValue(true)
      this.addError({"cabello":undefined})
    }
  }
  cabelloChange(event:any){
    if(event.checked){
      this.solicitudesForm.controls['have_protesis'].setValue(false)
      this.addError({"cabello":"El cabello no es correcto"})
    }else{
      this.addError({"protesis":undefined})
      // this.solicitudesForm.controls['have_protesis'].setValue(true)
    }
  }

  //? Método para añadir un error

  addError(error:any){
    this.solicitudesForm.updateValueAndValidity();
    const errors = this.solicitudesForm.errors || null;
    if(errors == null && Object.values(error)[0] == undefined){
      this.solicitudesForm.setErrors(null)
    }else{
      this.solicitudesForm.setErrors({
        ...errors,
        ...error
      })
    }
    console.log(this.solicitudesForm.errors)
  }
  //! Cogo todos los elementos de los componentes
  getProtesis(event:any){
    console.log(event)
    // this.solicitudesForm.controls['protesis'].setValue(event.value);
    this.protesis = event.value;
    this.protesisValid = event.valid;
    if(!this.protesisValid){
      this.addError({'protesis':"La prótesis no es correcta"})
    }else{
      console.log("protesis correectaaaaa")
      this.addError({'protesis':undefined})
    }
  }

  getCabello(event:any){
    console.log(event)
    this.cabello = event.value;
    // this.solicitudesForm.controls['cabello'].setValue(event.value);
    this.cabelloValid = event.valid;
  }
  getTextil(event:any){
    console.log(event)
    // this.solicitudesForm.controls['cabello'].setValue(event.value);
    this.textil = event.value;
    this.textilValid = event.valid;
    if(!this.protesisValid){
      this.addError({'textil':"Debes elegir el color del pañuelo"})
    }else{
      this.addError({'textil':undefined})
    }

  }
  getCentro(event:any){
    console.log(event)
    // this.solicitudesForm.controls['cabello'].setValue(event.value);
    this.centro = event.value;
    this.centroValid = event.valid;

  }
  getChequeRegalo(event:any){
    console.log(event)
    // this.solicitudesForm.controls['cabello'].setValue(event.value);
    this.cheque_regalo = event.value;
    this.cheque_regaloValid = event.valid;
  }



  // //? Resetear datos
  reset(valuedefault = false){

    if(!valuedefault){
      if(this.DatosClinicosUser){
        // this.solicitudesForm.controls['have_enfermedades'].setValue(this.DatosClinicosUser?.have_enfermedades);
      }
    }else{
      // this.solicitudesForm.controls['have_enfermedades'].setValue(false);
    }

  }

  validarProducto(){
    return (formGroup: FormGroup) => {
      const have_cabello:string = formGroup.get('have_cabello')?.value;
      const have_protesis:string = formGroup.get('have_protesis')?.value;
 
      if(!have_cabello && !have_protesis){
        return {productos:"Debes elegir un producto"}; 
      }else{
        return null;
      }     
    };
  }
  validarTextil(){
    return (formGroup: FormGroup) => {
      const have_panuelo:string = formGroup.get('have_panuelo')?.value;
 
      if(have_panuelo){
        return {textil:"Debes elegir el color del pañuelo"}; 
      }else{
        return null;
      }     
    };
  }
  // validarProducto(){
  //   return (formGroup: FormGroup) => {
  //     const have_cabello:string = formGroup.get('have_cabello')?.value;
  //     const have_protesis:string = formGroup.get('have_protesis')?.value;
 
  //     if(!have_cabello && !have_protesis){
  //       return {productos:"Debes elegir un producto"}; 
  //     }else{
  //       return null;
  //     }     
  //   };
  // }

  crear(){
    this.erroresDB = [];
    if(this.solicitudesForm.invalid ){
      this.solicitudesForm.markAllAsTouched();
      console.log("Formulario inválido")
    }else{
      console.log("correcto")
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
    }

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
  disponibilidadDefault(){
    let valoresDisponibilidad:any = [];
    this.disponibilidad.forEach((element:any) => {
      valoresDisponibilidad.push(Object.values(element)[0])
    });
    // console.log(valoresDisponibilidad)
    // console.log(this.solicitudesForm.controls['disponibilidad'].value,"valoor")
    if(valoresDisponibilidad.includes(this.solicitudesForm.controls['disponibilidad'].value)){
      // console.log("falseeee")
      return false;
    }else if(this.solicitudesForm.controls['disponibilidad'].value == '' || this.solicitudesForm.controls['disponibilidad'].value == null ){
      // console.log("falseeee")
      return false;
    }else{
      // console.log("trueee")
      return true;
    }
  }

}
