import { Component, EventEmitter, Input, OnChanges, OnInit, Output, SimpleChanges } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ConfirmationService, MessageService } from 'primeng/api';
import { Cabello } from 'src/app/core/models/Solicitud.interface.';
import { SetSolicitudesService } from 'src/app/core/services/forComponents/set-solicitudes.service';
import { color,formas,longitud } from "../../../../core/enums/Protesis"
import { Solicitud } from '../../../../core/models/Solicitud.interface.';
@Component({
  selector: 'solicitud-cabellos-form',
  templateUrl: './cabellos-form.component.html',
  styleUrls: ['./cabellos-form.component.scss']
})
export class CabellosFormComponent implements OnInit,OnChanges {

  constructor(
    private _build:FormBuilder,
    private _confirmationService:ConfirmationService,
    private _message:MessageService,
    private _SetSolicitudesService:SetSolicitudesService
    ) { }

  ngOnChanges(changes: SimpleChanges): void {
    if(changes['touch']){
      if(changes['touch'].currentValue){
        this.cabellosForm.markAllAsTouched();
      }
    }
    if(changes['set']){
      let valor = changes['set'].currentValue;
      console.log(valor)
      this.cabellosForm.controls['forma'] = valor.forma;
      this.cabellosForm.controls['color'] = valor.color;
      this.cabellosForm.controls['longitud'] = valor.longitud;
    }
  }

  @Output() cabello = new EventEmitter<any>();
  @Output() valid = new EventEmitter<any>(false)
  @Input() touch = false;
  @Input() set:any = null;

  ngOnInit(): void {
    console.log(formas,"FORMAS")
    this.cabellosForm.valueChanges.subscribe(
      (res)=>{
        this.cabello.emit(
          {
            value: this.cabellosForm.value,
            valid: this.cabellosForm.valid
          })
        this.valid.emit(this.cabellosForm.valid)
      },
      (err)=>{
        console.log(err)
      }
    )
    this._SetSolicitudesService.getSolicitud$().subscribe(
      (res:Solicitud|null)=>{
        if(res){
            let cabello=res.cabello
            this.cabellosForm.controls['forma'].setValue(cabello?.forma)
            this.cabellosForm.controls['color'].setValue(cabello?.color)
            this.cabellosForm.controls['longitud'].setValue(cabello?.longitud)
        }else{
          this.cabellosForm.reset();
        }
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
