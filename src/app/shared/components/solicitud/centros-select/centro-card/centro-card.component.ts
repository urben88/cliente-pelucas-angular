import { HttpErrorResponse } from '@angular/common/http';
import { Component, Input, OnChanges, OnInit, SimpleChanges } from '@angular/core';
import { Centro } from 'src/app/core/models/Centro.interface';
import { CentrosService } from 'src/app/core/services/db/centros.service';

@Component({
  selector: 'centro-card',
  templateUrl: './centro-card.component.html',
  styleUrls: ['./centro-card.component.scss']
})
export class CentroCardComponent implements OnInit,OnChanges {

  constructor(
    private _centros:CentrosService
  ) { }
  ngOnChanges(changes: SimpleChanges): void {
    if(changes['centroId']){
      this._centros.findBy("id",String(this.centroId)).subscribe(
        (res:Centro[])=>{
          this.centro = res[0];
          // console.log(this.centro,"CENTROOO CARD")
        },
        (err:HttpErrorResponse)=>{
          console.error(err);
        }
      )
    }
  }

  @Input() centroId!:number;
  @Input() info:boolean = false;
  centro!:Centro;

  ngOnInit(): void {
   
  }
  irInfo(ruta:string){
    window.location.href=ruta;
  }

}
