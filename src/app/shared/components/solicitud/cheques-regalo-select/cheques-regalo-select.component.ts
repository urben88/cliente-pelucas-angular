import { Component, EventEmitter, OnChanges, OnInit, Output, SimpleChanges } from '@angular/core';
import { ChequeRegalo } from 'src/app/core/models/ChequeRegalo';
import { ChequesRegaloService } from 'src/app/core/services/db/cheques-regalo.service';
import {TiposChequesRegalo} from '../../../../core/enums/Cheques_regalo'
@Component({
  selector: 'solicitud-cheques-regalo-select',
  templateUrl: './cheques-regalo-select.component.html',
  styleUrls: ['./cheques-regalo-select.component.scss']
})
export class ChequesRegaloSelectComponent implements OnInit {

  constructor(
    private _chequesregalo:ChequesRegaloService
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
  chequeSelected:any;
  cron:any;

  prueba =[{
    servicio:"hiuhiuhiu"
  }]
  ngOnInit(): void {
    for(let tipo in this.tiposChequesRegalo){
      console.log(tipo,"tipooooooooooooooooo")
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
    console.log(this.servicios,"serviciossssssssssssss")
    console.log(this.servicios[0],"sssss")

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
