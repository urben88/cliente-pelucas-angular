import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class FechasUtilService {

  monthNames:any[] = ["January", "February", "March", "April", "May", "June",
  "July", "August", "September", "October", "November", "December"
  ];

  constructor(){

  }

  getLongMonthName(date:Date) {
      return this.monthNames[date.getMonth()];
  }

  getShortMonthName(date:Date) {
      return this.monthNames[date.getMonth()].substring(0, 3);
  }
  getNumberMonth(date:Date){
      return date.getMonth();
  }
}
