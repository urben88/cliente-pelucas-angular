import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
@Component({
  selector: 'app-datos-clinicos-form',
  templateUrl: './datos-clinicos-form.component.html',
  styleUrls: ['./datos-clinicos-form.component.scss']
})
export class DatosClinicosFormComponent implements OnInit {

  constructor(private _build:FormBuilder) { }

  datosclinicosForm:FormGroup = this._build.group({
    have_enfermedades:[false,Validators.required],
    enfermedades:['',[Validators.maxLength(300)]],
    tratamiento_actual:['',[Validators.maxLength(300)]],
    medicacion:['',[Validators.maxLength(300)]],
    have_alergias:[false,[Validators.required]],
    alergias:['',[Validators.maxLength(300)]],
    alergias_medicacion:['',[Validators.maxLength(300)]],
  })

  medicamentosSelected!:any;
  ngOnInit(): void {
  }
  

  //? Mensages de error
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
