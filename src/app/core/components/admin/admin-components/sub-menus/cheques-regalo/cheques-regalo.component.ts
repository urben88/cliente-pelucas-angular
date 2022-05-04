import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { ChequeRegalo } from 'src/app/core/models/ChequeRegalo';
import { ChequesRegaloService } from 'src/app/core/services/db/cheques-regalo.service';

@Component({
  selector: 'app-cheques-regalo',
  templateUrl: './cheques-regalo.component.html',
  styleUrls: ['./cheques-regalo.component.scss']
})
export class ChequesRegaloComponent implements OnInit {

  constructor(private _chequesRegalo:ChequesRegaloService) { }

  cheques!:ChequeRegalo[];
  chequeSelected!:ChequeRegalo;

  ngOnInit(): void {
    this._chequesRegalo.getAll().subscribe(
      (res:ChequeRegalo[])=>{
        console.log(res)
        this.cheques = res;
      },
      (err:HttpErrorResponse)=>{
        console.log(err)
      }
    )
  }
  chequeSelect(event:any){
    this.chequeSelected = event;
    console.log(this.chequeSelected)
  }

}
