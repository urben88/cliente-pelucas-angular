import { HttpErrorResponse } from '@angular/common/http';
import { Component, EventEmitter, Input, OnChanges, OnInit, Output, SimpleChanges } from '@angular/core';
import { Solicitud } from 'src/app/core/models/Solicitud.interface.';
import { SolicitudesService } from 'src/app/core/services/db/solicitudes.service';
import {color,formas,longitud} from '../../../../../core/enums/Protesis'
import  coloresBasicos from "../../../../../core/constants/coloresBasicos"
import { CentrosService } from 'src/app/core/services/db/centros.service';
import { Centro } from 'src/app/core/models/Centro.interface';
import { ChequeRegalo } from 'src/app/core/models/ChequeRegalo';
import { ChequesRegaloService } from 'src/app/core/services/db/cheques-regalo.service';
import { ConfirmationService, MessageService } from 'primeng/api';

@Component({
  selector: 'admin-solicitud-simple-show',
  templateUrl: './solicitud-simple-show.component.html',
  styleUrls: ['./solicitud-simple-show.component.scss']
})
export class SolicitudSimpleShowComponent implements OnInit,OnChanges {

  constructor(
    private _solicitud:SolicitudesService,
    private _centro:CentrosService,
    private _chequeregalo:ChequesRegaloService,
    private _confirmationService:ConfirmationService,
    private _message:MessageService,
  ) { }

  ngOnChanges(changes: SimpleChanges): void {
    if(changes['solicitudId']){
      this._solicitud.findOne(this.solicitudId).subscribe(
        (res:Solicitud)=>{
          this.solicitud = res;
          console.log(this.solicitud,"SOLICITUD SIMPLEEEEE")
        },
        (err:HttpErrorResponse)=>{
          console.log(err)
        }
      )
    }
    if(changes['solicitudSet']){
      this.solicitud = changes['solicitudSet'].currentValue;
    }
  }

  color=color;
  @Input() solicitudId!:number;
  @Input() solicitudSet!:Solicitud;
  @Output() actualizar = new EventEmitter<any>();

  solicitud!:Solicitud;
  cheque_regalo!:ChequeRegalo[];
  coloresBasicos = coloresBasicos
  ngOnInit(): void {

  }

  eliminar(event:any){
    this._confirmationService.confirm({
      target: event.target,
      message: '¿Estas seguro que quieres eliminar la solicitud?',
      icon: 'pi pi-exclamation-triangle',
      accept: () => {
        console.log('Has aceptado')
        this._solicitud.delete(this.solicitud.id).subscribe(
          (res:any)=>{
            console.log(res)
            this._message.add({severity:'success', summary: 'Creado', detail: 'Se ha actualizado los datos clínicos correctamente'});
            this.actualizar.emit();
            // this.solicitudSet = null;
          },
          (err:any)=>{
            console.error(err)
          }
        )
      },
      reject: () => {
        console.log('Has cancelado')
      }
  });
   
  }
  colorPeluca(value:any){
    switch (value){
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
  
  colorPanuelo(value:any){
    switch (value){
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
