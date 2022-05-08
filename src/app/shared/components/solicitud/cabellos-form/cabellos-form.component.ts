import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ConfirmationService, MessageService } from 'primeng/api';
import { color,formas,longitud } from "../../../../core/enums/Protesis"
@Component({
  selector: 'solicitud-cabellos-form',
  templateUrl: './cabellos-form.component.html',
  styleUrls: ['./cabellos-form.component.scss']
})
export class CabellosFormComponent implements OnInit {

  constructor(
    private _build:FormBuilder,
    private _confirmationService:ConfirmationService,
    private _message:MessageService,

    ) { }

  ngOnInit(): void {
    console.log(formas,"FORMAS")
  }
  formas=formas;
  color=color;
  longitud=longitud;

  cabellosForm:FormGroup = this._build.group({
    forma:["",Validators.required],
    color:["",Validators.required],
    longitud:["",Validators.required],
  })

  erroresDB:String[] =[];

  //? Mensages de error
    get formaErrorMsg(): string{
      const errors = this.cabellosForm.get('forma')?.errors;
      if(errors?.['required']){
        return 'La forma es obligatoria'
      }else if(errors?.['pattern']){
        return 'Formato no válido'
      }
      return '';
    }
  //? Mensages de error
    get colorErrorMsg(): string{
      const errors = this.cabellosForm.get('color')?.errors;
      if(errors?.['required']){
        return 'La forma es obligatoria'
      }else if(errors?.['pattern']){
        return 'Formato no válido'
      }
      return '';
    }
  //? Mensages de error
    get longitudErrorMsg(): string{
      const errors = this.cabellosForm.get('longitud')?.errors;
      if(errors?.['required']){
        return 'La forma es obligatoria'
      }else if(errors?.['pattern']){
        return 'Formato no válido'
      }
      return '';
    }
  campoEsValido( campo:string){
      return this.cabellosForm.controls[campo].errors && this.cabellosForm.controls[campo].touched;
    }
  
}
