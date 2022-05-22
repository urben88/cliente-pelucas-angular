import { Component, EventEmitter, OnChanges, OnInit, Output, SimpleChanges } from '@angular/core';
import { ChequeRegalo } from 'src/app/core/models/ChequeRegalo';
import { ChequesRegaloService } from 'src/app/core/services/db/cheques-regalo.service';
import { SetSolicitudesService } from 'src/app/core/services/forComponents/set-solicitudes.service';
import {TiposChequesRegalo} from '../../../../core/enums/Cheques_regalo'
@Component({
  selector: 'solicitud-cheques-regalo-select',
  templateUrl: './cheques-regalo-select.component.html',
  styleUrls: ['./cheques-regalo-select.component.scss']
})
export class ChequesRegaloSelectComponent implements OnInit {

  constructor(
    private _chequesregalo:ChequesRegaloService,
    private _SetSolicitudesService:SetSolicitudesService

  ) { }

  onChange(event:any): void {
    let valido = false;
    if(this.chequeSelected){
      this.valid.emit(true);
      valido = true;
    }
    this.cheques_regalo.emit(
      {
        value: this.chequeSelected,
        valid: valido
      })
   
  }

  @Output() cheques_regalo = new EventEmitter<any>();
  @Output() valid = new EventEmitter<any>(false)

  Chequedescripcion!:ChequeRegalo|null;
  servicios:any = [];
  tiposChequesRegalo = TiposChequesRegalo;
  chequeSelected:any = null;
  cron:any;

  ngOnInit(): void {

  

    for(let tipo in this.tiposChequesRegalo){
      // console.log(tipo,"tipooooooooooooooooo")
      this._chequesregalo.findBy('tipo',tipo).subscribe(
        (res:any[])=>{
          let campo:any=[];
          if(tipo == 'recogida'){
            this.chequeSelected = res[0];
          }
          campo['tipo']=tipo;
          campo['cheques']=res;
          this.servicios.push(campo)
          // this.servicios[tipo] = res;
        },
        (err:any)=>{
          console.error(err)
        }
      )
    }
    this._SetSolicitudesService.getSolicitud$().subscribe(
      (res)=>{
        if(res){
          let campo:any=[];
          this.servicios.forEach((servicio:any) => {
   
            servicio.cheques.forEach((cheq:any) => {
              if(cheq.id == res.cheque_regalo?.id){
                this.chequeSelected = cheq;
              }
            });
          });
        }else{
          //?Para que busque el cheque con id 1 que es el de recogida y ponerlo default
          this.servicios.forEach((servicio:any) => {
            servicio.cheques.forEach((cheq:any) => {
              if(cheq.servicio == "recogida"){
                this.chequeSelected = cheq;
                // console.log(this.chequeSelected)
              }
            });
          });

          let valido;
          if(this.chequeSelected){
            this.valid.emit(true);
            valido = true;
          }
          this.cheques_regalo.emit(
            {
              value: this.chequeSelected,
              valid: valido
            })
        }
      }
    )
   
  }
  
  hoverDescripcion(cheque:ChequeRegalo){
    // console.log(cheque)
    this.cron = setTimeout(()=>{
      this.Chequedescripcion = cheque;
    },500)
  }
  outDescripcion(cheque:ChequeRegalo){
    // console.log(cheque)
    clearTimeout(this.cron)
    this.Chequedescripcion = null;
  }


  infoStyle(cheque:ChequeRegalo){
    if(this.Chequedescripcion !=null && cheque.id == this.Chequedescripcion.id){
      // console.log("veer")
      return 'show'
    }else{
      // console.log("se escondee")
      return 'hidden'

    }
  }
}
