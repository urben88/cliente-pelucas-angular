import { Component, EventEmitter, Input, OnChanges, OnInit, Output, SimpleChange, SimpleChanges } from '@angular/core';

interface rowFiltro{
  campo:string,
  tipo:string
}

@Component({
  selector: 'admin-selec-row-table',
  templateUrl: './selec-row-table.component.html',
  styleUrls: ['./selec-row-table.component.scss']
})
export class SelecRowTableComponent implements OnInit, OnChanges {

  constructor() { }
 
  @Input() rows:any; 
  @Output() selected = new EventEmitter<any>();
  
  idSelect!:number|null;
  columns!:string[];
  tipos:rowFiltro[] =[];
  //? Interfaz SimpleChanges
  ngOnChanges(changes: SimpleChanges): void {
    console.log(changes['rows'].currentValue)

    if(changes['rows'].currentValue){
      let values = changes['rows'].currentValue;
      if(values.length != 0){
        this.columns = Object.keys(values[0]);
        this.ponerTipos(values[0])
      }
    }
  }

  // itemsp =[{
  //   id: 1,
  //   nombre: "ruben",
  //   apellidos: "esteve vicente",
  //   email: "tirolin25@gmail.com",
  //   telefono: "123456789",
  //   cpostal: "12345",
  //   password: "$2a$10$.j1DZuRgJim8HoyCperanOAqUSYGd1tvPfhNLmgHD/c36cx9iFdWu",
  //   createdAt: "2022-04-20T17:35:44.000Z",
  //   updatedAt: "2022-04-22T15:22:06.000Z" 
  // }]
  ngOnInit(): void {
  }


  loadCustomers() {
     
  }

  //? Me sirve para saber el tipo de dato (Para poner los filtros)
  ponerTipos(json:any){
     let keys = Object.keys(json);
     console.log(Object.entries(json))
     for (const [key, value] of Object.entries(json)){
    
      switch(typeof value){
         case 'string':
           this.tipos.push({
             campo:key,
             tipo:'text'
           })
           break
         case 'number':
          this.tipos.push({
            campo:key,
            tipo:'numeric'
          })
           break
         case 'boolean':
          this.tipos.push({
            campo:key,
            tipo:'boolean'
          })
           break
         case 'undefined':
           console.error("Error en selec-row Poner tipo Undefined")
           break
        default:
          this.tipos.push({
            campo:key,
            tipo:'date'
          })
       }
     }
     console.log(this.tipos)
  }

  //? Método que uso para imprimir los datos
  getData(object:any){
    return Object.values<any>(object)
  }

  //? A la hora de imprimir saber si es una fecha o no
  findFecha(value:any){
    if(typeof value == 'object'){
      return true
    }else{
      return false
    }
  }

  //? Para emitir el seleccionado
  clickselect(row:any){
    if(this.idSelect && (row.id == this.idSelect)){
      this.idSelect=null;
      this.selected.emit(null)
    }else{
      this.idSelect = row.id;
      this.selected.emit(row)
    }
  }
  //? Para poner estilo al click
  styleselect(row:any){
    // console.log("Entra en styleselect",this.idSelect,row.id)
    if(this.idSelect && this.idSelect == row.id){
      // console.log("Entra estiloo")
      return 'select'
    }
    return '';
  }
  //?Para hacer mas grande el filtro de la fecha
  widthFecha(event:rowFiltro){
    if(event.campo == 'createdAt' || event.campo == 'updatedAt'){
      return 'filtrofecha'
    }else{
      return 'filtro'
    }
  }

}
