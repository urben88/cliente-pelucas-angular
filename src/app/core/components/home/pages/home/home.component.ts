import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../../../../services/db/auth.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {

  constructor(private _auth:AuthService) { }

  ngOnInit(): void {
    window.scroll(0,0)
    const tag = document.createElement('script');
    tag.src = 'https://www.youtube.com/iframe_api';
    document.body.appendChild(tag);
    this._auth.refreshToken();
    

  }

  info = {
    titulo:'Advanced Card',
    subtitulo:'Card Subheader',
    body:'Lorem ipsum dolor sit amet, consectetur adipisicing elit. Inventore sed consequuntur error repudiandae numquam deserunt quisquam repellat libero asperiores earum nam nobis, culpa ratione quam perferendis esse, cupiditate neque quas!',
    img:'assets/img/home/chica_panuelo.jpg'
  }
  cambiarInfo(tipo:string){
    switch(tipo){
      case "protesis":
        this.info = {
          titulo:"Prótesis",
          subtitulo:"Descripción",
          body:"La prótesis capilar es una pieza formada por una base especial en forma de malla a la que están unidas fibras de cabello. Es muy fina por lo que se une a la piel del cráneo y no se distingue del cuero cabelludo. Su objetivo principal es que el resultado sea tan natural que parezca tu propio cabello.",
          img:"assets/img/home/protesis.jpg"
        }
        break;
      case "natural":
        this.info = {
          titulo:"Pelo Natural",
          subtitulo:"Descripción",
          body:"En primer lugar nos gustaría aclarar que llamamos pelo natural a aquel cabello de origen humano (independientemente de su origen) y sintético al pelo hecho con fibras sintéticas como puede ser el nailon.",
          img:"assets/img/home/pelo_natural.jpg"
        }
        break;
      case "panuelo":
        this.info = {
          titulo:"Pañuelo",
          subtitulo:"Descripción",
          body:"Un pañuelo, también conocido como bandana o paliacate, es una pieza de tela triangular o cuadrada que se ata alrededor de la cabeza, la cara o el cuello con fines protectores o decorativos.",
          img:"assets/img/home/textil.jpg"
        }
        break;

        default:
          this.info = {
            titulo:'Advanced Card',
            subtitulo:'Card Subheader',
            body:'Lorem ipsum dolor sit amet, consectetur adipisicing elit. Inventore sed consequuntur error repudiandae numquam deserunt quisquam repellat libero asperiores earum nam nobis, culpa ratione quam perferendis esse, cupiditate neque quas!',
            img:'assets/img/home/chica_panuelo.jpg'
          }
    }

  }

}
