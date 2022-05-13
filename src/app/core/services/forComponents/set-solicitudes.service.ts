import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';
import { Solicitud } from '../../models/Solicitud.interface.';

@Injectable({
  providedIn: 'root'
})
export class SetSolicitudesService {

  private setSolicitud$: Subject<Solicitud|null>;
  
  constructor() {
    this.setSolicitud$ = new Subject();
  }

  solicitud!:Solicitud|null;

  setSolicitud(solicitud:Solicitud|null){
    if(solicitud){
      this.solicitud = solicitud;
      this.setSolicitud$.next(this.solicitud)
    }else{
      this.setSolicitud$.next(null);
    }
  }

  getSolicitud$(){
    return this.setSolicitud$.asObservable();
  }

  resetSolicitud(){
    this.solicitud=null;
  }
}
