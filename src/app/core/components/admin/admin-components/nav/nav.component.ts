import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { BehaviorSubject, Observable, Subject } from 'rxjs';
import { AuthService } from 'src/app/core/services/db/auth.service';

@Component({
  selector: 'admin-nav',
  templateUrl: './nav.component.html',
  styleUrls: ['./nav.component.scss']
})
export class NavComponent implements OnInit {
  
  @Output() menuStatus= new EventEmitter;
  escondido:boolean = false;

  constructor(public _auth:AuthService) { 
  }


  ngOnInit(): void {

  }
  pasarStatusMenu(){
    if(this.escondido){
      this.escondido = false;
    }else{
      this.escondido = true;
    }
    this.menuStatus.emit(this.escondido)
  }



}
