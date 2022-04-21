//?Usar JQUERY
import * as $ from 'jquery';

import { Component, OnInit } from '@angular/core';
import { User } from '../../../models/User.interface';
import { AuthService } from '../../../services/db/auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-menu',
  templateUrl: './template.component.html',
  styleUrls: ['./template.component.scss']
})
export class TemplateComponent implements OnInit {

  constructor(private _auth:AuthService,public _router:Router) { }

  user!:User;
  hideMenu:boolean = false;

  ngOnInit(): void {
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

  statusMenu(event:any){
    this.hideMenu = event;
      console.log(this.hideMenu)
  }


}
