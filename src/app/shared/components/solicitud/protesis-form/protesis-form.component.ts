import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ConfirmationService, MessageService } from 'primeng/api';
import { color,formas,longitud } from "../../../../core/enums/Protesis"

@Component({
  selector: 'solicitud-protesis-form',
  templateUrl: './protesis-form.component.html',
  styleUrls: ['./protesis-form.component.scss']
})
export class ProtesisFormComponent implements OnInit {

  constructor(
    private _build:FormBuilder,
    private _confirmationService:ConfirmationService,
    private _message:MessageService,

    ) { }

  @Output() protesisValue = new EventEmitter<any>();

  ngOnInit(): void {
    console.log(formas,"FORMAS")
    this.protesisForm.valueChanges.subscribe(
      (res)=>{
        this.protesisValue.emit(this.protesisForm.value)
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

  protesisForm:FormGroup = this._build.group({
    forma:[null,Validators.required],
    color:[null,Validators.required],
    longitud:[null,Validators.required],
  })

  erroresDB:String[] =[];

  //? Mensages de error
    get formaErrorMsg(): string{
      const errors = this.protesisForm.get('forma')?.errors;
      if(errors?.['required']){
        return 'La forma es obligatoria'
      }else if(errors?.['pattern']){
        return 'Formato no válido'
      }
      return '';
    }
    get colorErrorMsg(): string{
      const errors = this.protesisForm.get('color')?.errors;
      if(errors?.['required']){
        return 'El es color es obligatorio'
      }else if(errors?.['pattern']){
        return 'Formato no válido'
      }
      return '';
    }
    get longitudErrorMsg(): string{
      const errors = this.protesisForm.get('longitud')?.errors;
      if(errors?.['required']){
        return 'La longitud es obligatoria'
      }else if(errors?.['pattern']){
        return 'Formato no válido'
      }
      return '';
    }
  campoEsValido( campo:string){
      return this.protesisForm.controls[campo].errors && this.protesisForm.controls[campo].touched;
    }

  colorPeluca(){
    switch (this.protesisForm.controls['color'].value){
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
