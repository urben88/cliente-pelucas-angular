import { EventEmitter, Injectable } from '@angular/core';
import { AuthService } from '../db/auth.service';


@Injectable({
  providedIn: 'root'
})
export class IsAdminService {

  $isAdmin= new EventEmitter<boolean>();
  value:boolean = false;
  constructor(
    private _auth:AuthService
  ) { 
    this.$isAdmin.subscribe(
      (res:any)=>{
        this.value = res
      },
      (err:any)=>{
        console.error(err)
      }
    )
  }

}
