import { HttpErrorResponse } from '@angular/common/http';
import { Component, Input, OnChanges, OnInit, SimpleChanges } from '@angular/core';
import { ChequeRegalo } from 'src/app/core/models/Solicitud.interface.';
import { ChequesRegaloService } from 'src/app/core/services/db/cheques-regalo.service';

@Component({
  selector: 'cheques-regalo-card',
  templateUrl: './cheques-regalo-card.component.html',
  styleUrls: ['./cheques-regalo-card.component.scss']
})
export class ChequesRegaloCardComponent implements OnInit,OnChanges {

  constructor(
    private _cheques_regalo:ChequesRegaloService
  ) { }
  ngOnChanges(changes: SimpleChanges): void {
    if(changes['cheque_regaloId']){
      this._cheques_regalo.findBy('id',String(changes['cheque_regaloId'].currentValue)).subscribe(
        (res:any)=>{
          this.cheque_regalo = res[0];
        },
        (err:HttpErrorResponse)=>{
         console.error(err)
        }
      )
    }
  }

  @Input() cheque_regaloId!:number;

  cheque_regalo!:ChequeRegalo;


  ngOnInit(): void {
  }

}
