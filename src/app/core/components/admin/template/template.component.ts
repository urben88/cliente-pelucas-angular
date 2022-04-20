import { Component, OnInit } from '@angular/core';
import { User } from '../../../models/User.interface';
import { AuthService } from '../../../services/db/auth.service';

@Component({
  selector: 'app-menu',
  templateUrl: './template.component.html',
  styleUrls: ['./template.component.scss']
})
export class TemplateComponent implements OnInit {

  constructor(private _auth:AuthService) { }

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
