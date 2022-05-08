import { Pipe, PipeTransform } from '@angular/core';
import { ChequeRegalo } from 'src/app/core/models/ChequeRegalo';
import { User } from '../../../core/models/User.interface';
import { Solicitud } from '../../../core/models/Solicitud.interface.';
import { UsersService } from '../../../core/services/db/users.service';

@Pipe({
  name: 'selecRow'
})
export class SelecRowPipe implements PipeTransform {

  constructor(
    private _user:UsersService
  ){}
  transform(value: any, ...args: unknown[]): unknown {
    value.forEach((element:any) => {

      switch (args[0]){
        case'users':
          this.users(element)
        break;
        case'cheques_regalo':
          this.cheques_regalo(element)
        break;
        case'solicitudes':
          this.solicitudes(element)
        break;
      }

    });
    console.log(value,"RESULTADO PIPE")
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
  async solicitudes(element:any){
    element.createdAt = new Date(`${element.createdAt}`);
    element.updatedAt = new Date(`${element.updatedAt}`);
    delete element.centrosId;
    delete element.cheques_regaloId;
    
    // await this._user.showOne(element.user_id).subscribe(
    //   (res:User)=>{
    //     console.log(res)
    //     element.user = res.email
    //   },
    //   (err:any)=>{
    //     console.log(err)
    //   }
    // )
  } 


}
