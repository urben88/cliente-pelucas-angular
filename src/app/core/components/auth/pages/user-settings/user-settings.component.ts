import { Component, OnInit } from '@angular/core';
import { ConfirmationService, MessageService } from 'primeng/api';
import { UsersService } from '../../../../services/db/users.service';
import { AuthService } from '../../../../services/db/auth.service';
import { User } from '../../../../models/User.interface';
import { HttpErrorResponse } from '@angular/common/http';


@Component({
  selector: 'app-user-settings',
  templateUrl: './user-settings.component.html',
  styleUrls: ['./user-settings.component.scss'],
})
export class UserSettingsComponent implements OnInit {

  constructor(
    private _user:UsersService,
    private _auth:AuthService
  ) {}

  user:User | undefined;
  ngOnInit() {
    this._auth.getUser().subscribe(
      (res:User)=>{
        this.user = res;
      },
      (err:HttpErrorResponse)=>{
        console.error(err)
      }
    )
  }

}
