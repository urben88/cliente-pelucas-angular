import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { MessageService } from 'primeng/api';

@Component({
  selector: 'icon-refresh',
  templateUrl: './icon-refresh.component.html',
  styleUrls: ['./icon-refresh.component.scss'],
  providers: [MessageService]
})
export class IconRefreshComponent implements OnInit {

  constructor(
    private _message:MessageService
  ) { }

  @Output() update = new EventEmitter<any>();

  ngOnInit(): void {
  }

  actualizarDatos(){
    this._message.add({severity:'info', summary: 'Reseteado', detail: 'Se ha reseteado con los datos anteriores'});
    this.update.emit(true)
  }

}
