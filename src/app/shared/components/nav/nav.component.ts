import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/app/core/services/db/auth.service';
import { NotificacionesService } from 'src/app/core/services/db/notificaciones.service';
import { Router } from '@angular/router';

//? Interfaces
import { User } from '../../../core/models/User.interface'
import { HttpErrorResponse, HttpResponseBase } from '@angular/common/http';
import { Notificacion } from '../../../core/models/Notificacion'

//?Enums
import { TiposNotificaciones } from 'src/app/core/enums/Notificaciones';
import { NotificacionesNavService } from '../../../core/services/forComponents/notificaciones/notificaciones-nav.service';
@Component({
  selector: 'app-nav',
  templateUrl: './nav.component.html',
  styleUrls: ['./nav.component.scss']
})
export class NavComponent implements OnInit {

  //? Se ralla al ir al register y no cambia por un error del css
  constructor(
    public _auth: AuthService,
    private _router: Router,
    public _notificaciones: NotificacionesService,
    private NotificacionesNavService: NotificacionesNavService
  ) { }

  notificaciones: Notificacion[] = [];
  notileng: string = String(0);
  user!: User;
  isAmin: boolean = false;

  ngOnInit() {


    if (this._auth.loggedIn()) {
      this._auth.getUser().subscribe(
        (res: User) => {
          this.user = res;
          console.log(this.user,"USER HAVE NAV ")
          this.NotificacionesNavService.emitirEvento()
        },
        (err: any) => {
          throw err
        }
      )

    }

    //?Subscripción para actualizar las notificaciones no leidas
    //* Me sirve para actualizar el numero de estas
    this.NotificacionesNavService.$emitter.subscribe(
      (res) => {
        console.log("EMITEEEEEEEEEEEE AL NAAAAAV",res)
        if (res.status == 404) {
          this.notileng = String(0);
        } else {
          console.log(res)
          this.notileng = String(res.body.length)
          this.notificaciones = res.body
          console.log(res.body, "NOTIFICACIONEEES")
          console.log(this.notificaciones, "Notificaciones actuales")
        }
      }
    )

    this._auth.getStatusToken$().subscribe(statustoken => {
      console.log("Entra a GET STATUS TOKEN")
      if (statustoken) {
        // this.getNotificacionesNoLeidas();
        // this.NotificacionesNavService.emitirEvento(this.user.id)
      }

    })

  }

  // getNotificacionesNoLeidas() {
  //   if (this.user.id) {
  //     console.log("ENTRAA")
  //     this._notificaciones.findUserNotificacionesNoLeidas(this.user.id).subscribe(
  //       (res) => {
  //         if (res.status == 404) {
  //           this.notileng = String(0);
  //         } else {
  //           console.log(res)
  //           this.notileng = String(res.body.length)
  //           this.notificaciones = res.body
  //         }
  //       },
  //       (err: HttpErrorResponse) => {
  //         console.log(err.error)

  //       }
  //     )
  //   }
  // }

  Admin() {
    if (this._auth.loggedIn()) {
      if (this._auth.isAdmin(this.user)) {
        return true
      } else {
        return false
      }
    } else {
      return false;
    }
  }
  irSettings() {
    this._router.navigate(['/auth/settings'])
  }

  colorFondoNoti(noti: Notificacion) {
    if (noti.tipo == TiposNotificaciones.success) return "successNoti"
    if (noti.tipo == TiposNotificaciones.warn) return "warnNoti"
    if (noti.tipo == TiposNotificaciones.info) return "infoNoti"
    return '';
  }

}
