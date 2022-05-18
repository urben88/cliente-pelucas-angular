import { HttpErrorResponse } from '@angular/common/http';
import { Component, Input, OnChanges, OnInit, SimpleChanges, ViewEncapsulation } from '@angular/core';
import { Router } from '@angular/router';
import { ConfirmationService } from 'primeng/api';
import { Notificacion } from 'src/app/core/models/Notificacion';
import { NotificacionesService } from 'src/app/core/services/db/notificaciones.service';
import { NotificacionesNavService } from '../../../../../core/services/forComponents/notificaciones/notificaciones-nav.service';

@Component({
  selector: 'app-show-notificacion',
  templateUrl: './show-notificacion.component.html',
  styleUrls: ['./show-notificacion.component.scss'],
})
export class ShowNotificacionComponent implements OnInit, OnChanges {

  constructor(
    private _notificaciones: NotificacionesService,
    private _router: Router,
    private _confirmationService: ConfirmationService,
  ) { }

  notificacion!: Notificacion;
  ngOnChanges(changes: SimpleChanges): void {
    if (changes['id']) {
      if (changes['id'].currentValue) {
        this._notificaciones.show(changes['id'].currentValue).subscribe(
          (res: Notificacion) => {
            console.log(res);
            if (res) {
              this.notificacion = res;
            } else {
              // this._router.navigate(['/notificaciones',false])
            }
          },
          (err: HttpErrorResponse) => {
            console.error(err)
            // this._router.navigate(['/notificaciones'])
          }
        )
      }

    }
  }


  @Input() id!: number;
  ngOnInit(): void {
  }
  eliminar(event: any) {
    if (this.id) {
      this._confirmationService.confirm({
        target: event.target,
        message: '¿Estas seguro que quieres eliminar el mensaje?',
        icon: 'pi pi-exclamation-triangle',
        accept: () => {
          console.log('Has aceptado')
          this._notificaciones.delete(this.id).subscribe(
            (res) => {
              console.log(res);
              this._router.navigate(['/notificaciones'])
            },
            (err: any) => {
              console.error(err);
            }
          )
        },
        reject: () => {
          console.log('Has cancelado')
        }
      })
    }
  }


}
