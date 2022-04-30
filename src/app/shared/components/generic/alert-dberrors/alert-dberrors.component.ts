import { Component, Input, OnInit } from '@angular/core';


@Component({
  selector: 'alert-dberrors',
  templateUrl: './alert-dberrors.component.html',
  styleUrls: ['./alert-dberrors.component.scss'],
})
export class AlertDBerrorsComponent implements OnInit {
  
  constructor(
  ) { }
  @Input() erroresDB!:any[]

  ngOnInit(): void {
  }


}
