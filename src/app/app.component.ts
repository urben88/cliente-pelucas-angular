import { Component } from '@angular/core';
import { Router } from '@angular/router';
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'PelucasAngular';

  constructor( private router:Router){

  }
  mostrarFooter(){
    if(this.router.isActive('/auth',false)){
      return 'esconder';
    }else{
      return ''
    }
  }
}
