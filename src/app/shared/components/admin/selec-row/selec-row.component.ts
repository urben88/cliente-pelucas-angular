import { Component, Input, OnInit } from '@angular/core';
import from ''
@Component({
  selector: 'admin-selec-row',
  templateUrl: './selec-row.component.html',
  styleUrls: ['./selec-row.component.scss']
})
export class SelecRowComponent implements OnInit {

  constructor() { }

  @Input() item = ''; 
  ngOnInit(): void {
  }

  
  customers: Notification[];

  totalRecords: number;

  cols: any[];

  loading: boolean;

  representatives: Representative[];

  selectAll: boolean = false;

  selectedCustomers: Customer[];

  ngOnInit() {
      this.representatives = [
          {name: "Amy Elsner", image: 'amyelsner.png'},
          {name: "Anna Fali", image: 'annafali.png'},
          {name: "Asiya Javayant", image: 'asiyajavayant.png'},
          {name: "Bernardo Dominic", image: 'bernardodominic.png'},
          {name: "Elwin Sharvill", image: 'elwinsharvill.png'},
          {name: "Ioni Bowcher", image: 'ionibowcher.png'},
          {name: "Ivan Magalhaes",image: 'ivanmagalhaes.png'},
          {name: "Onyama Limba", image: 'onyamalimba.png'},
          {name: "Stephen Shaw", image: 'stephenshaw.png'},
          {name: "Xuxue Feng", image: 'xuxuefeng.png'}
      ];

      this.loading = true;
  }

  loadCustomers() {
     
  }

  onSelectionChange(value = []) {
      this.selectAll = value.length === this.totalRecords;
      this.selectedCustomers = value;
  }

  onSelectAllChange() {
      const checked = event.checked;

      if (checked) {
          this.customerService.getCustomers().then(res => {
              this.selectedCustomers = res.customers;
              this.selectAll = true;
          });
      }
      else {
          this.selectedCustomers = [];
          this.selectAll = false;
      }
  }

}
