import { Component, EventEmitter, Input, OnInit, Output, SimpleChanges, OnChanges } from '@angular/core';
import { MessageService } from 'primeng/api';
import patrones from '../../../../core/utils/validaciones/patterns'
interface rowFiltro{
  campo:string,
  tipo:string
}
@Component({
  selector: 'admin-delete-table',
  templateUrl: './delete-table.component.html',
  styleUrls: ['./delete-table.component.scss'],
  providers: [MessageService]
})
export class DeleteTableComponent implements OnInit,OnChanges {

  constructor(
    private _message:MessageService
  ) { }

  @Input() rows:any; 
  @Input() sort:boolean = false; 
  @Output() selected = new EventEmitter<any>();
  @Output() delete = new EventEmitter<any>();

  patrones = patrones
  tipos:rowFiltro[] =[];
  columns!:string[];
  idSelect!:number|null;

  ngOnInit(): void {
    console.log(this.patrones)
    if(this.patrones.fechaUTC.test('2022-04-20T17:35:44.000Z')){
      console.log("Pttern correct")
    }else{
      console.log("Pttern incooo")
    }
    
  }

  ngOnChanges(changes: SimpleChanges): void {
    console.log(changes['rows'].currentValue)
    if(changes['rows']){
      if(changes['rows'].currentValue){
        let values = changes['rows'].currentValue;
        if(values.length != 0){
          this.columns = Object.keys(values[0]);
        }
      }
    }
   
  }
   //? Método que uso para imprimir los datos
   //!Tranformo el texto para quitar etiquetas HTML del mensaje
  getData(object:any){
    let array = Object.values<any>(object)
    let solu =array.map((valor)=>{
      if(typeof valor == "string"){
        return valor.replace(/<[^>]*>?/g, '')
      }
      return valor
    })
    // console.log(solu)
    return solu;
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

  //? Cuando da click a eliminar
  clickdelete(data:any){
    console.log("click en tablaa borrar")
    this._message.add({severity:'error', summary: 'Eliminado', detail: 'Se ha eliminado el campo'})
    this.delete.emit(data)
  }

}
