import { Component, Input, OnChanges, OnInit, SimpleChanges } from '@angular/core';
import { User } from 'src/app/core/models/User.interface';

@Component({
  selector: 'generic-info-user',
  templateUrl: './info-user.component.html',
  styleUrls: ['./info-user.component.scss']
})
export class InfoUserComponent implements OnInit,OnChanges {

  constructor() { }
  ngOnChanges(changes: SimpleChanges): void {
    if(changes['user']){
      // console.log(this.user)
    }
  }

  @Input() user!:User;
  @Input() title!:string;
  ngOnInit(): void {
  }

}
