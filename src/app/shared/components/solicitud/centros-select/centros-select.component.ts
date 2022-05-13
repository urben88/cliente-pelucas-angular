import { HttpErrorResponse } from '@angular/common/http';
import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Centro } from 'src/app/core/models/Centro.interface';
import { CentrosService } from 'src/app/core/services/db/centros.service';
import { SetSolicitudesService } from 'src/app/core/services/forComponents/set-solicitudes.service';

import {CentrosEnum} from '../../../../core/enums/Centros'
@Component({
  selector: 'solicitud-centros-select',
  templateUrl: './centros-select.component.html',
  styleUrls: ['./centros-select.component.scss']
})
export class CentrosSelectComponent implements OnInit {

  constructor(
    private _centros:CentrosService,
    private _build:FormBuilder,
    private _SetSolicitudesService:SetSolicitudesService

  ) { }

  @Input() error:String|null = null;

  @Output() centro = new EventEmitter<any>();
  @Output() valid = new EventEmitter<any>(false)

  CentrosEnum = CentrosEnum;
  provinciaSelected:any;

  arrayProvincias:any;

  dropdown:any;

  centros!:Centro[];
  selected!:Centro|null;

  centrosForm:FormGroup = this._build.group({
    centro:[null,[Validators.required,Validators.nullValidator]],
  })

  campoEsValido( campo:string){
    return true;
    // return this.centrosForm.controls[campo].errors && this.centrosForm.controls[campo].touched;
  }


  ngOnInit(): void {
    this.arrayProvincias = Object.entries(CentrosEnum);
    this.dropdown = this.enumToJSON(Object.keys(CentrosEnum),Object.values(CentrosEnum))
    this.buscar(this.provinciaSelected.value);
    this.centrosForm.valueChanges.subscribe(
      (res)=>{
        if(this.centrosForm.value.centro != null){
          this.centro.emit({
            value:this.centrosForm.value.centro,
            valid:true
          })
        }else{
          this.centro.emit({
            value:this.centrosForm.value.centro,
            valid:false
          })
        }
      },
      (err)=>{
        console.log(err)
      }
    )
    this._SetSolicitudesService.getSolicitud$().subscribe(
      (res)=>{
          if(res){
            this._centros.findBy('id',String(res.centrosId)).subscribe(
              (res)=>{

                  this.centrosForm.controls['centro'].setValue(res[0])
                  this.selected =res[0];
                  this.buscar(res[0].provincia)
                  this.provinciaSelected = res[0].provincia;
              }
              ,
            (err)=>{
              console.error(err)
            }
          )
       }else{
          this.centrosForm.reset();
        }
      }
    )
    
  }

   //? Mensages de error
   get centroErrorMsg(): string{
    //  console.log("mensaje error")
    const errors = this.centrosForm.get('centro')?.errors;
    if(errors?.['required']){
      return 'Debe seleccionar el centro'
    }else if(errors?.['pattern']){
      return 'Formato no válido'
    }
    return '';
  }


  buscar(provincia:any){
    this._centros.findBy('provincia',provincia).subscribe(
      (res:Centro[])=>{
        // console.log(res);
        this.centros=res;
      },
      (err:HttpErrorResponse)=>{
        console.log(err);
      }
    )
  }
  enumToJSON(label:any[],values:any[]){
    let array:any = []
    label.forEach((element:any,key:any)=>{
      let json:any = {};
      json['label'] = element;
      json['value'] = values[key];
      if(key == 0){
        this.provinciaSelected = json;
      }
      array.push(json)
    })
    // console.log(this.provinciaSelected.value)
    return array;
  }
  provinciaChange(event:any){
    this.buscar(event.value);
  }
  irInfo(url:string){
    window.location.href = url;
  }
  seleccionar(centro:Centro){
    if(this.centrosForm.controls['centro'].value !=null && this.centrosForm.controls['centro'].value.id == centro.id){
      this.centrosForm.controls['centro'].setValue(null)
      // this.centro.emit(null)
    }else{
      this.centrosForm.controls['centro'].setValue(centro)
      //  this.centro.emit(centro)
       console.log(centro)
    }
  }
  selectedStyle(centro:Centro){
    if(this.centrosForm.controls['centro'].value && centro.id == this.centrosForm.controls['centro'].value.id){
      return 'selected'
    }else{
      return ''
    }
  }

}
