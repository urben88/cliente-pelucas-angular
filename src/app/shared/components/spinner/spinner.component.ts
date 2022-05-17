import { Component, OnInit } from '@angular/core';
import { SpinnerService } from '../../../core/services/spinner.service';

@Component({
  selector: 'app-spinner',
  templateUrl: './spinner.component.html',
  styleUrls: ['./spinner.component.scss']
})
export class SpinnerComponent implements OnInit {
  
  isLoading$:boolean = false;
  constructor(private _spinner:SpinnerService) { }

  ngOnInit(): void {
    this._spinner.getIsLoading$().subscribe(cargando=>{
      this.isLoading$ = cargando
    })
  }

}
