import { Component, EventEmitter, OnInit, Output } from '@angular/core';
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

  @Output() cabelloValue = new EventEmitter<any>();

  ngOnInit(): void {
    console.log(formas,"FORMAS")
    this.cabellosForm.valueChanges.subscribe(
      (res)=>{
        this.cabelloValue.emit(this.cabellosForm.value)
      },
      (err)=>{
        console.log(err)
      }
    )
  }
  formas=formas;
  color=color;
  longitud=longitud;
  colorProtesis:string = ""

  cabellosForm:FormGroup = this._build.group({
    forma:[null,Validators.required],
    color:[null,Validators.required],
    longitud:[null,Validators.required],
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
  get colorErrorMsg(): string{
    const errors = this.cabellosForm.get('color')?.errors;
    if(errors?.['required']){
      return 'El es color es obligatorio'
    }else if(errors?.['pattern']){
      return 'Formato no válido'
    }
    return '';
  }
  get longitudErrorMsg(): string{
    const errors = this.cabellosForm.get('longitud')?.errors;
    if(errors?.['required']){
      return 'La longitud es obligatoria'
    }else if(errors?.['pattern']){
      return 'Formato no válido'
    }
    return '';
  }

  campoEsValido( campo:string){
      return this.cabellosForm.controls[campo].errors && this.cabellosForm.controls[campo].touched;
    }

  colorPeluca(){
    switch (this.cabellosForm.controls['color'].value){
      case this.color[0].value:
        return 'assets/decorados/pelucas/rubio.svg'
        break;
      case this.color[1].value:
        return 'assets/decorados/pelucas/castano.svg'
        break;
      case this.color[2].value:
        return 'assets/decorados/pelucas/moreno.svg'
        break;
      case this.color[3].value:
        return 'assets/decorados/pelucas/mechado.svg'
        break;
      case this.color[4].value:
        return 'assets/decorados/pelucas/cano.svg'
        break;
      case this.color[5].value:
        return 'assets/decorados/pelucas/rojizo.svg'
        break;

      default:
        return ''
    }

  }
  
}
