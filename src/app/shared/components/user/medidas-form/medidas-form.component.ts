import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-medidas-form',
  templateUrl: './medidas-form.component.html',
  styleUrls: ['./medidas-form.component.scss']
})
export class MedidasFormComponent implements OnInit {

  constructor(private _build:FormBuilder) { }

  val!:number;
  medidasForm:FormGroup = this._build.group({
    redondo:[0,Validators.required],
    patilla_a_patilla:[0,Validators.required],
    largo_de_frente:[0,Validators.required],
    sien_a_sien:[0,Validators.required],
    oreja_a_oreja_por_encima:[0,Validators.required],
    anchura_del_cuello_superior:[0,Validators.required],
    oreja_a_oreja_por_nacimiento_pelo:[0,Validators.required],
    anchura_cuello_inferior:[0,Validators.required],
  })

  medicamentosSelected!:any;
  ngOnInit(): void {
  }
  

  //? Mensages de error
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


}
