import { Component, OnInit } from '@angular/core';
import { User } from 'src/app/core/models/User.interface';
import { AuthService } from 'src/app/core/services/db/auth.service';

@Component({
  selector: 'app-notificaciones',
  templateUrl: './notificaciones.component.html',
  styleUrls: ['./notificaciones.component.scss']
})
export class NotificacionesComponent implements OnInit {

  constructor(
    private _auth:AuthService
  ) { }
  user!:User;

  ngOnInit(): void {
    this._auth.getUser().subscribe(
      (res:User)=>{
        this.user = res;
        console.log(this.user,"DEsde notificaciones")
      },
      (err:any)=>{
        throw err
      }
    )   
  }


}
