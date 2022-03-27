import { Component, OnInit } from '@angular/core';
import { environment } from 'src/environments/environment';
import { PeliculasService } from 'src/app/services/peliculas.service';
import { Pelicula } from 'src/app/interfaces/Pelicula.interface';
@Component({
  selector: 'app-peliculas-list',
  templateUrl: './peliculas-list.component.html',
  styleUrls: ['./peliculas-list.component.scss']
})
export class PeliculasListComponent implements OnInit {
  texto:any = environment.texto;
  peliculas:any = [];
  constructor(private _peliculas:PeliculasService) { }

  ngOnInit(): void {
    this._peliculas.getPeliculas().subscribe(
      res=> this.peliculas = res,
      err=> console.log(err)
    )
  }

}
