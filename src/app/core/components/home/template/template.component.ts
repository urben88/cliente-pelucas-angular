import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-template',
  templateUrl: './template.component.html',
  styleUrls: ['./template.component.scss']
})
export class TemplateComponent implements OnInit {

  constructor( public router:Router){
  }
  mostrarFooter(){
    if(this.router.isActive('/auth',false)){
      return false;
    }else{
      return true;
    }
    
  }

  ngOnInit(): void {
  }

}
