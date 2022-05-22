import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'changeDbAt'
})
export class ChangeDbAtPipe implements PipeTransform {

  transform(value: any, ...args: unknown[]): any {
    if(value == "createdAt") return"Creado";
    if(value == "updatedAt") return"Actualizado";
    return value;
  }

}
