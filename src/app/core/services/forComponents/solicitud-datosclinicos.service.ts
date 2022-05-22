import { EventEmitter, Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class SolicitudDatosclinicosService {

  constructor() { }
  $emitter = new EventEmitter();

  emitirEvento(dato:any=null){
    if(dato){
      this.$emitter.emit(dato);
    }else{
      this.$emitter.emit();
    }
  }
}
