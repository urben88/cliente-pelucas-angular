import { Component, OnInit } from '@angular/core';
import { CentrosEnum } from 'src/app/core/enums/Centros';
import { Centro } from 'src/app/core/models/Centro.interface';
import { CentrosService } from 'src/app/core/services/db/centros.service';

//? Centros json
import centros from "../../../../constants/centros"
@Component({
  selector: 'app-centros',
  templateUrl: './centros.component.html',
  styleUrls: ['./centros.component.scss']
})
export class CentrosComponent implements OnInit {

  images!: any[];
  valencia  !:Centro[];
  alicante  !:Centro[];
  castellon !:Centro[];

  responsiveOptions:any[] = [
      {
          breakpoint: '1024px',
          numVisible: 5
      },
      {
          breakpoint: '768px',
          numVisible: 3
      },
      {
          breakpoint: '560px',
          numVisible: 1
      }
  ];

  constructor(private _centros:CentrosService) { }

  ngOnInit(): void {
    this._centros.getAll().subscribe(
      (res)=>{
        this.images =res;
        this.images.unshift(centros[0]);
      },
      (err:Error)=>{
        console.log(err)
      }
    )

    let attr = "provincia"
    this._centros.findBy(attr,CentrosEnum.Valencia).subscribe(
      (res:Centro[])=>{
        this.valencia = res;
      },
      (err)=>{
        console.log(err)
      }
    )
    this._centros.findBy(attr,CentrosEnum.Castellon).subscribe(
      (res:Centro[])=>{
        this.castellon = res;
      },
      (err)=>{
        console.log(err)
      }
    )
    this._centros.findBy(attr,CentrosEnum.Alicante).subscribe(
      (res:Centro[])=>{
        this.alicante = res;
      },
      (err)=>{
        console.log(err)
      }
    )

   
  }
  
  irInfo(url:string){
    window.location.href = url;
  }


}
