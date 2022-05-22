import { Component, OnInit } from '@angular/core';
import { UsersService } from '../../../../../services/db/users.service';
import { User, Rol } from '../../../../../models/User.interface';
import { RolesEnum } from '../../../../../enums/Roles';

@Component({
  selector: 'app-users',
  templateUrl: './users.component.html',
  styleUrls: ['./users.component.scss']
})
export class UsersComponent implements OnInit {

  ngOnInit(): void {
  }
  constructor(){

  }

}
