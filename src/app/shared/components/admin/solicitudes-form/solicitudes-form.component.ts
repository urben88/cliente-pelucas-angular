import { HttpErrorResponse } from '@angular/common/http';
import { Component, EventEmitter, Input, OnChanges, OnInit, Output, SimpleChanges } from '@angular/core';
import { FormBuilder, FormGroup, ValidationErrors, Validators } from '@angular/forms';
import { ConfirmationService, MessageService } from 'primeng/api';
import { Centro } from 'src/app/core/models/Centro.interface';
import { ChequeRegalo } from 'src/app/core/models/ChequeRegalo';
import { DatosClinicos } from 'src/app/core/models/DatosClinicos';
import { Cabello, Protesis, Textil } from 'src/app/core/models/Solicitud.interface.';
import { User } from 'src/app/core/models/User.interface';
import { AuthService } from 'src/app/core/services/db/auth.service';
import { DatosClinicosService } from 'src/app/core/services/db/datos-clinicos.service';
import { SolicitudesService } from 'src/app/core/services/db/solicitudes.service';
import { disponibilidad } from '../../../../core/enums/Solicitudes'
import { SetSolicitudesService } from '../../../../core/services/forComponents/set-solicitudes.service';
import { Solicitud } from '../../../../core/models/Solicitud.interface.';
import { Observable } from 'rxjs';
import { Medidas } from '../../../../core/models/Medidas';
import { UsersService } from '../../../../core/services/db/users.service';
import { SolicitudDatosclinicosService } from '../../../../core/services/forComponents/solicitud-datosclinicos.service';
import { SolicitudMedidasService } from '../../../../core/services/forComponents/solicitud-medidas.service';
@Component({
  selector: 'admin-solicitudes-form',
  templateUrl: './solicitudes-form.component.html',
  styleUrls: ['./solicitudes-form.component.scss']
})
export class SolicitudesFormComponent implements OnInit, OnChanges {

  constructor(
    private _build: FormBuilder,
    private _solicitud: SolicitudesService,
    private _confirmationService: ConfirmationService,
    private _message: MessageService,
    private _auth: AuthService,
    private _SetSolicitudesService: SetSolicitudesService,
    private _user:UsersService,
    private SolicitudDatosclinicosService:SolicitudDatosclinicosService,
    private SolicitudMedidasService:SolicitudMedidasService
  ) { }

  ngOnChanges(changes: SimpleChanges): void {
    if (changes['user_id']) {
      //?Saber si ya existe una solicitud en el usuario
      this._solicitud.userHave(this.user_id).subscribe(
        (res: any) => {
          this.userHave = res.have
        },
        (err: HttpErrorResponse) => {
          console.error(err)
        }
      )

      //?Obtener datos clinicos y medidas del usuario
     this.getDatosClinicosMedidas();
    }
    if (changes['setSolicitud']) {
      if (this.userHave) {
        this.getDatosClinicosMedidas();
        // console.log(changes['setSolicitud'].currentValue)
        let solicitud = changes['setSolicitud'].currentValue;
        if (solicitud.cabello) {
          this.setCabello = solicitud.cabello
        }
      }
    }
  }

    //?Método para obtener datos clinicos y medidas del usuario
    getDatosClinicosMedidas(){
      this._user.getStatusDatos(this.user_id).subscribe(
        (res:any)=>{
          console.log("REEEEEEEESSSSS",res)
          this.datos_clinicos = res.datos_clinicos;
          this.medidas = res.medidas
        }
      )
    }

  solicitudesForm: FormGroup = this._build.group({
    disponibilidad: [null, [Validators.required, Validators.maxLength(100)]],
    centrosId: [1, Validators.required],
    cheques_regaloId: [1, Validators.required],
    have_protesis: [false, Validators.required],
    have_cabello: [false, Validators.required],
    have_panuelo: [false, Validators.required],
  }, { validators: [this.validarProducto(), this.validarTextil(), this.validarCentro()] })

  ngOnInit(): void {
    this.solicitudesForm.valueChanges.subscribe(
      (res) => {
        // console.log(res, "CAMBIAAAA FOOORM")
      }
    )
    this._SetSolicitudesService.getSolicitud$().subscribe(
      (res: Solicitud | null) => {
        if (res) {
          this.solicitudesForm.controls['disponibilidad'].setValue(res.disponibilidad)
          this.solicitudesForm.controls['have_protesis'].setValue(res.protesis ? true : false)
          this.solicitudesForm.controls['have_cabello'].setValue(res.cabello ? true : false)
          this.solicitudesForm.controls['have_panuelo'].setValue(res.textil ? true : false)
          this.solicitudesForm.controls['centrosId'].setValue(res.centrosId)
          this.solicitudesForm.controls['cheques_regaloId'].setValue(res.cheques_regaloId)
        } else {
          this.solicitudesForm.reset();
        }
      }
    )
  }

  @Input() forAdmin: boolean = false;
  @Input() user_id!: any;
  @Output() newSolicitud = new EventEmitter<any>(false);
  @Input() setSolicitud!: any;

  userHave: boolean = false;
  erroresDB: String[] = [];

  //? Saber si tiene datos clinicos o memdidas
  datos_clinicos!:DatosClinicos;
  medidas!:Medidas;

  //?Para actualizar las tablas
  @Output() actualizar = new EventEmitter<any>();

  //?Estado de los formularios
  datosClinicosStatusform:boolean = false;
  medidasStatusform:boolean = false;

  //?Productos
  protesis!: Protesis;
  setProtesis!: any;
  protesisValid: boolean = false;

  cabello!: Cabello;
  setCabello!: any;
  cabelloValid: boolean = false;

  textil!: Textil;
  setTextil!: any;
  textilValid: boolean = false;

  cheque_regalo!: ChequeRegalo;
  setCheque_regalo!: any;
  cheque_regaloValid: boolean = false;

  centro!: Centro;
  setCentro!: any;
  centroValid: boolean = false;


  disponibilidad: any = disponibilidad;


  @Input() user!: User;

  //? Mensages de error
  get disponibilidadErrorMsg(): string {
    const errors = this.solicitudesForm.get('disponibilidad')?.errors;
    if (errors?.['required']) {
      return 'La disponibilidad es obligatoria'
    } else if (errors?.['pattern']) {
      return 'Formato no válido'
    } else if (errors?.['maxlength']) {
      return 'Límite de texto superado'
    }
    return '';
  }
  get centrosIdErrorMsg(): string {
    const errors = this.solicitudesForm.get('centrosId')?.errors;
    if (errors?.['required']) {
      return 'El centro es obligatorio'
    } else if (errors?.['pattern']) {
      return 'Formato no válido'
    }
    return '';
  }
  get cheques_regaloIdErrorMsg(): string {
    const errors = this.solicitudesForm.get('cheques_regaloId')?.errors;
    if (errors?.['required']) {
      return 'El cheque regalo es obligatorio'
    } else if (errors?.['pattern']) {
      return 'Formato no válido'
    }
    return '';
  }
  get have_protesisErrorMsg(): string {
    const errors = this.solicitudesForm.get('have_protesis')?.errors;
    if (errors?.['required']) {
      return 'Es obligatorio seleccionarlo'
    } else if (errors?.['pattern']) {
      return 'Formato no válido'
    }
    return '';
  }
  get have_cabelloErrorMsg(): string {
    const errors = this.solicitudesForm.get('have_cabello')?.errors;
    if (errors?.['required']) {
      return 'Es obligatorio seleccionarlo'
    } else if (errors?.['pattern']) {
      return 'Formato no válido'
    }
    return '';
  }
  get have_panueloErrorMsg(): string {
    const errors = this.solicitudesForm.get('have_panuelo')?.errors;
    if (errors?.['required']) {
      return 'Es obligatorio seleccionarlo'
    } else if (errors?.['pattern']) {
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

  campoEsValido(campo: string) {
    return this.solicitudesForm.controls[campo].errors && this.solicitudesForm.controls[campo].touched;
  }


  //? Para mostrar o esconder los botones
  btnStatusCreate() {
    if (!this.userHave) {
      return true;
    }
    return false;
  }
  btnStatusUpdate() {
    if (this.forAdmin && this.userHave) {
      return true;
    }
    return false;
  }

  //TODO Para controlar el estado del FormGroup
  //? Método para añadir un error

  addError(error: any) {
    const errors = this.solicitudesForm.errors || null
    this.solicitudesForm.setErrors({ ...errors, ...error })
    if (Object.values(error)[0] == null) {
      if (this.solicitudesForm.errors) {
        delete this.solicitudesForm.errors[Object.keys(error)[0]]
      }
    }

    //  this.solicitudesForm.updateValueAndValidity();
    // const errors = this.solicitudesForm.errors || null;
    // console.log(Object.values(error)[0],errors,"aquiiii")
    // if(errors == null && Object.values(error)[0] == undefined){
    //   this.solicitudesForm.setErrors(null)
    //   console.log("Entra en este ladoooo")
    // }else{
    //   if(Object.values(error)[0] == undefined){
    //     this.solicitudesForm.setErrors({
    //       ...errors
    //     })
    //   }else{
    //     console.log("Otrooo ladoo ladoooo")
    //     this.solicitudesForm.setErrors({
    //       ...errors,
    //       ...error
    //     })
    //   }
    // }
    // console.log(this.solicitudesForm.errors)
  }

  protesisChange(event: any) {
    if (event.checked) {
      this.solicitudesForm.controls['have_cabello'].setValue(false)
      this.addError({ "protesis": "La prótesis no es correcta" })
    } else {
      // this.solicitudesForm.controls['have_cabello'].setValue(true)
      this.addError({ "cabello": null })
    }
  }
  cabelloChange(event: any) {
    if (event.checked) {
      this.solicitudesForm.controls['have_protesis'].setValue(false)
      this.addError({ "cabello": "El cabello no es correcto" })
    } else {
      this.addError({ "protesis": null })
      // this.solicitudesForm.controls['have_protesis'].setValue(true)
    }
  }

  //! Cogo todos los elementos de los componentes
  getProtesis(event: any) {
    // console.log(event)
    this.protesis = event.value;
    this.protesisValid = event.valid;
    //?Cada vez que suelta un output actualizo el form y asi las validaciones personalizadas
    this.solicitudesForm.updateValueAndValidity()
  }

  getCabello(event: any) {
    // console.log(event)
    this.cabello = event.value;
    this.cabelloValid = event.valid;
    this.solicitudesForm.updateValueAndValidity()
  }
  getTextil(event: any) {
    // console.log(event)
    this.textil = event.value;
    this.textilValid = event.valid;
    // console.log(this.textilValid)
    this.solicitudesForm.updateValueAndValidity()
  }
  getCentro(event: any) {
    // console.log(event)
    this.centro = event.value;
    this.centroValid = event.valid;

    if (event.value) {
      this.solicitudesForm.controls['centrosId'].setValue(event.value.id)
    }

    // console.log(this.centro)
    this.solicitudesForm.updateValueAndValidity()
  }
  getChequeRegalo(event: any) {
    // console.log(event)
    if (event.value) {
      this.solicitudesForm.controls['cheques_regaloId'].setValue(event.value.id)
    }
    this.cheque_regalo = event.value;
    this.cheque_regaloValid = event.valid;
    this.solicitudesForm.updateValueAndValidity()
  }

  //?Validaciones personalizadas para el form group y así conectar las validaciones
  validarProducto() {
    return (formGroup: FormGroup) => {
      const have_cabello: string = formGroup.get('have_cabello')?.value;
      const have_protesis: string = formGroup.get('have_protesis')?.value;

      if (!have_cabello && !have_protesis) {
        return { productos: "Debes elegir un producto" };
      } else {
        if (!this.protesisValid && have_protesis) {
          return { protesis: "La prótesis no es válida" };
        }
        if (!this.cabelloValid && have_cabello) {
          return { cabello: "El cabello no es válido" };
        }
        return null;
      }
    };
  }

  validarTextil() {
    return (formGroup: FormGroup) => {
      const have_panuelo: string = formGroup.get('have_panuelo')?.value;
      if (have_panuelo) {
        if (!this.textilValid) {
          return { textil: "Debes elegir el color del pañuelo" };
        } else {
          return null
        }
      } else {
        return null;
      }
    };
  }
  validarCentro() {
    return (formGroup: FormGroup) => {
      if (!this.centroValid) {
        return { centro: "Debes seleccionar un centro" };
      } else {
        return null;
      }
    };
  }

  //?Obtener lel estado de los datos clinicos y medidas
  datosClinicosStatus(event:any){
    this.datosClinicosStatusform = event;
  }
  medidasStatus(event:any){
    this.medidasStatusform = event;
  }

  //? Resetear datos
  reset(valuedefault = false) {

    // if (!valuedefault) {
    //   if (this.DatosClinicosUser) {
    //     // this.solicitudesForm.controls['have_enfermedades'].setValue(this.DatosClinicosUser?.have_enfermedades);
    //   }
    // } else {
    //   // this.solicitudesForm.controls['have_enfermedades'].setValue(false);
    // }

  }

  crearJSONSolicitud() {
    let json: any = {};

    if (this.user_id) {
      json['user_id'] = this.user_id;
    } else {
      this._auth.getUser().subscribe(
        (res: User) => {
          json['user_id'] = res.id;
        }),
        (err: HttpErrorResponse) => {
          console.error(err)
        }
    }
    json['disponibilidad'] = this.solicitudesForm.controls['disponibilidad'].value;
    json['centrosId'] = this.solicitudesForm.controls['centrosId'].value;
    json['cheques_regaloId'] = this.solicitudesForm.controls['cheques_regaloId'].value;

    if (this.solicitudesForm.controls['have_cabello'].value) {
      json['cabello'] = this.cabello;
    }
    if (this.solicitudesForm.controls['have_protesis'].value) {
      json['protesis'] = this.protesis;
    }
    if (this.solicitudesForm.controls['have_panuelo'].value) {
      json['textil'] = this.textil;
    }
    json['aceptado'] = false;
    return json;


  }



  crear() {
    this.erroresDB = [];
    this.SolicitudDatosclinicosService.emitirEvento();
    this.SolicitudMedidasService.emitirEvento();
    if (this.solicitudesForm.invalid && !this.datosClinicosStatusform && !this.medidasStatusform) {
      this.solicitudesForm.markAllAsTouched();
      this._message.add({ severity: 'warn', summary: 'Aviso', detail: 'No todos los campos estan completados, o tienen algún error' });
      // for(var i in this.solicitudesForm.errors){
      //   this._message.add({ severity: 'error', summary: 'Error', detail: i });
      // }

      console.log("Formulario inválido")
    } else {
      console.log("correcto")
      // console.log(this.solicitudesForm.value)
      let resul = this.crearJSONSolicitud()
      // console.log(resul)
      this._solicitud.create(resul)
        .subscribe(
          (res: any) => {
            this._message.add({ severity: 'success', summary: 'Creado', detail: 'Se ha enviado tu solicitud cón éxito' });
            this.newSolicitud.emit(true)
            this.actualizar.emit()
            // this.SimpleTableComponent .reset(); //Borra el contenido de los inputs
          },
          (error: any) => {
            console.error(error)
            if (error.error.msg) {
              this.erroresDB.push(error.error.msg)
              this._message.add({ severity: 'error', summary: 'Error', detail: error.error.msg });
            } else {
              this.erroresDB.push(error.error.name)
            }
          }
        )
    }

  }

  update() {
    console.log("Click en actualizar")
    this.erroresDB = [];
    if (this.solicitudesForm.invalid) {
      this.solicitudesForm.markAllAsTouched();
      console.log("Formulario invalido")
    } else {
      // console.log(this.solicitudesForm.value)
      let resul = this.crearJSONSolicitud()
      // console.log(resul)
      this._solicitud.update(this.user_id, resul)
        .subscribe(
          (res) => {
            // console.log(res)
            this._message.add({ severity: 'success', summary: 'Creado', detail: 'Se ha actualizado los datos clínicos correctamente' });
            this.actualizar.emit()
            // this.medidasForm.reset(); //Borra el contenido de los inputs
          },
          (error: any) => {
            console.error(error)
            if (error.error.msg) {
              this.erroresDB.push(error.error.msg)
              this._message.add({ severity: 'error', summary: 'Error', detail: error.error.msg });
            } else {
              this.erroresDB.push(error.error.name)
            }

          }
        )
    }

  }

  eliminar(event: any) {
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
  disponibilidadDefault() {
    let valoresDisponibilidad: any = [];
    this.disponibilidad.forEach((element: any) => {
      valoresDisponibilidad.push(Object.values(element)[0])
    });
    // console.log(valoresDisponibilidad)
    // console.log(this.solicitudesForm.controls['disponibilidad'].value,"valoor")
    if (valoresDisponibilidad.includes(this.solicitudesForm.controls['disponibilidad'].value)) {
      // console.log("falseeee")
      return false;
    } else if (this.solicitudesForm.controls['disponibilidad'].value == '' || this.solicitudesForm.controls['disponibilidad'].value == null) {
      // console.log("falseeee")
      return false;
    } else {
      // console.log("trueee")
      return true;
    }
  }

}
