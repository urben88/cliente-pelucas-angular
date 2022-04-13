import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/app/core/services/auth.service';
@Component({
  selector: 'app-nav',
  templateUrl: './nav.component.html',
  styleUrls: ['./nav.component.scss']
})
export class NavComponent implements OnInit {

  //? Se ralla al ir al register y no cambia por un error del css
  constructor( public _auth:AuthService) { }

  ngOnInit(): void {
  }

}
