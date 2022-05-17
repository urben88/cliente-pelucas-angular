import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { MenuItem } from 'primeng/api';
import { BehaviorSubject, Observable, Subject } from 'rxjs';
import { User } from 'src/app/core/models/User.interface';
import { AuthService } from 'src/app/core/services/db/auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'admin-nav',
  templateUrl: './nav.component.html',
  styleUrls: ['./nav.component.scss']
})
export class NavComponent implements OnInit {
  items!: MenuItem[];
  home!: MenuItem;

  user!:User;
  @Output() menuStatus= new EventEmitter;
  escondido:boolean = false;

  constructor(public _auth:AuthService,
    private _router:Router) { 
  }


  ngOnInit(){

    this.items = [
        {label: 'Centros',routerLink:'/centros'},
        {label: 'Blog'},
        {label: 'Tips'},
        {label: 'About us',routerLink:'/about_us'},
        {label: 'Sugerencias'},
        {label: 'Tus Notificaciones',routerLink:'/notificaciones'}
    ];
    this.home = {icon: 'pi pi-home', routerLink: '/'};

    this._auth.getUser().subscribe(
      (res:User)=>{
        this.user = res;
        console.log(this.user)
      },
      (err:any)=>{
        throw err
      }
    )

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
