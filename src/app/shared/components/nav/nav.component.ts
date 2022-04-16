import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/app/core/services/auth.service';
import { Router } from '@angular/router';

//? Interfaces
import {User}from '../../../core/models/User.interface'
@Component({
  selector: 'app-nav',
  templateUrl: './nav.component.html',
  styleUrls: ['./nav.component.scss']
})
export class NavComponent implements OnInit {

  //? Se ralla al ir al register y no cambia por un error del css
  constructor( 
    public _auth:AuthService,
    private _router:Router
    ) { }

  user!:User;
   ngOnInit(){
    this._auth.getUser().subscribe(
      (res:User)=>{
        this.user = res;
      },
      (err:any)=>{
        throw err
      }
    )
    
  }
  irSettings(){
    this._router.navigate(['/auth/settings'])
  }
    
}
