import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-menu',
  templateUrl: './template.component.html',
  styleUrls: ['./template.component.scss']
})
export class TemplateComponent implements OnInit {

  constructor() { }

  hideMenu:boolean = false;

  ngOnInit(): void {
  }
  statusMenu(event:any){
      this.hideMenu = event;
      console.log(this.hideMenu)
  }


}
