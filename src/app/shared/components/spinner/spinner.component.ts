import { Component, OnInit } from '@angular/core';
import { SpinnerService } from '../../../core/services/spinner.service';

@Component({
  selector: 'app-spinner',
  templateUrl: './spinner.component.html',
  styleUrls: ['./spinner.component.scss']
})
export class SpinnerComponent implements OnInit {
  
  isLoading$ = this._spinner.isLoading$;
  constructor(private _spinner:SpinnerService) { }

  ngOnInit(): void {
  }

}
