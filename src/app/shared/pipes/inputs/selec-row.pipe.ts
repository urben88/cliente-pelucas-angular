import { Pipe, PipeTransform } from '@angular/core';
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


}
