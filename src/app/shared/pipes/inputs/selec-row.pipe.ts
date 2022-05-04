import { Pipe, PipeTransform } from '@angular/core';
import { ChequeRegalo } from 'src/app/core/models/ChequeRegalo';
import { User } from '../../../core/models/User.interface';

@Pipe({
  name: 'selecRow'
})
export class SelecRowPipe implements PipeTransform {

  transform(value: any, ...args: unknown[]): unknown {
    value.forEach((element:any) => {

      switch (args[0]){
        case'users':
          this.users(element)
        break;
        case'cheques_regalo':
          this.cheques_regalo(element)
        break;
      }

    });
    return value;
  }

  users(element:User){
      delete element.password;
      delete element.rol
      element.createdAt = new Date(`${element.createdAt}`);
      element.updatedAt = new Date(`${element.updatedAt}`);
  }
  cheques_regalo(element:ChequeRegalo){
    element.createdAt = new Date(`${element.createdAt}`);
    element.updatedAt = new Date(`${element.updatedAt}`);
  }


}
