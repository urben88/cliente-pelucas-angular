import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ConfirmationService, MessageService } from 'primeng/api';
import  coloresBasicos from "../../../../core/constants/coloresBasicos"
@Component({
  selector: 'solicitud-textiles-form',
  templateUrl: './textiles-form.component.html',
  styleUrls: ['./textiles-form.component.scss']
})
export class TextilesFormComponent implements OnInit {

  constructor(
    private _build:FormBuilder,
    private _confirmationService:ConfirmationService,
    private _message:MessageService,

    ) { }

    @Output() textil = new EventEmitter<any>();
    @Output() valid = new EventEmitter<any>();

  ngOnInit(): void {
    this.textilForm.valueChanges.subscribe(
      (res)=>{
        this.textil.emit({
          value: this.textilForm.value,
          valid: this.textilForm.valid
        })
        this.valid.emit(this.textilForm.valid)
      },
      (err)=>{
        console.log(err)
      }
    )
  }


  textilForm:FormGroup = this._build.group({
    color:[null,Validators.required],
  })

  coloresBasicos = coloresBasicos;

  erroresDB:String[] =[];

  //? Mensages de error
    get formaErrorMsg(): string{
      const errors = this.textilForm.get('forma')?.errors;
      if(errors?.['required']){
        return 'La forma es obligatoria'
      }else if(errors?.['pattern']){
        return 'Formato no válido'
      }
      return '';
    }
    get colorErrorMsg(): string{
      const errors = this.textilForm.get('color')?.errors;
      if(errors?.['required']){
        return 'El es color es obligatorio'
      }else if(errors?.['pattern']){
        return 'Formato no válido'
      }
      return '';
    }
    get longitudErrorMsg(): string{
      const errors = this.textilForm.get('longitud')?.errors;
      if(errors?.['required']){
        return 'La longitud es obligatoria'
      }else if(errors?.['pattern']){
        return 'Formato no válido'
      }
      return '';
    }
  campoEsValido( campo:string){
      return this.textilForm.controls[campo].errors && this.textilForm.controls[campo].touched;
    }

  colorPanuelo(){
    // coloresBasicos.forEach(element => {
    //   console.log(element.nombreColor)
    //   if(this.textilForm.controls['color'].value == element.nombreColor){
    //     console.log("entraa y ",element.nombreColor,`assets/decorados/panuelos/panuelo-${element.nombreColor}.svg`)
    //     return `/assets/decorados/panuelos/panuelo-${element.nombreColor}.svg`;
    //   }else{
    //     return ''
    //   }
    // });
    switch (this.textilForm.controls['color'].value){
      case coloresBasicos[0].nombreColor:
        return `assets/decorados/panuelos/panuelo-${coloresBasicos[0].nombreColor}.svg`
        break;
      case  coloresBasicos[1].nombreColor:
        return `assets/decorados/panuelos/panuelo-${coloresBasicos[1].nombreColor}.svg`
        break;
      case  coloresBasicos[2].nombreColor:
        return `assets/decorados/panuelos/panuelo-${coloresBasicos[2].nombreColor}.svg`
        break;
      case  coloresBasicos[3].nombreColor:
        return `assets/decorados/panuelos/panuelo-${coloresBasicos[3].nombreColor}.svg`
        break;
      case  coloresBasicos[4].nombreColor:
        return `assets/decorados/panuelos/panuelo-${coloresBasicos[4].nombreColor}.svg`
        break;
      case coloresBasicos[5].nombreColor:
        return `assets/decorados/panuelos/panuelo-${coloresBasicos[5].nombreColor}.svg`
        break;
      case coloresBasicos[6].nombreColor:
        return `assets/decorados/panuelos/panuelo-${coloresBasicos[6].nombreColor}.svg`
        break;
      case coloresBasicos[7].nombreColor:
        return `assets/decorados/panuelos/panuelo-${coloresBasicos[7].nombreColor}.svg`
        break;
      case coloresBasicos[8].nombreColor:
        return `assets/decorados/panuelos/panuelo-${coloresBasicos[8].nombreColor}.svg`
        break;
      case coloresBasicos[9].nombreColor:
        return `assets/decorados/panuelos/panuelo-${coloresBasicos[9].nombreColor}.svg`
        break;

      default:
        return ''
    }

  }

}
