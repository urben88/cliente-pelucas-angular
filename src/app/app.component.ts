import { Component } from '@angular/core';
import { Router } from '@angular/router';
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'PelucasAngular';

  constructor( public router:Router){
  }
  mostrarFooter(){
    console.log("Se actia mostrar Footer")
    if(this.router.isActive('/auth',false) || this.router.isActive('/admin',false)){
      return 'esconder';
    }else{
      return 'fondo';
    }
    
  }
  mostrarNav(){
    console.log("Se actia mostrar Nav")
    if(this.router.isActive('/admin',false)){
      return 'esconder';
    }else{
      return 'fondo';
    }

    
  }
}
