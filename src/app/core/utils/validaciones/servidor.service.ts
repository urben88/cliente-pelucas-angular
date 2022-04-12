import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { AbstractControl, AsyncValidator, ValidationErrors } from '@angular/forms';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

//? Genero el servicio para cada peticion con ng g s core/utils/validaciones/nombreservicio --skipTests
@Injectable({
  providedIn: 'root'
})
export class ServidorService implements AsyncValidator{

  constructor(private http: HttpClient) { }
  
  validate(control: AbstractControl): Observable<ValidationErrors | null> {
    const email = control.value;
    return this.http.get<any[]>('http://localhost:3000/usuarios')
    .pipe(
      map( resp =>{
        return (resp.length === 0) ? null : { emailTomado:true}
      })
    )
  }
}
