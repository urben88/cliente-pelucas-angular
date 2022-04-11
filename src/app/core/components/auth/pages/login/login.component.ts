import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
//? Importo el archivo con patrones
import patrones from "../../../../utils/validaciones/patterns";
@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {


  singinForm:FormGroup =  this._builder.group({
    email:['', [Validators.required, Validators.pattern(patrones.email)]],
    password:['',[Validators.required]]
  })

  constructor(
    private _builder: FormBuilder 
  ) { }

  ngOnInit(): void {
    this.singinForm.reset({ //? Existe setValue pero hay que poner por default valor a todos los controles
      email:"tirolin25@gmail.com"
    }) 
  }

  send(){
    if(this.singinForm.invalid){
      this.singinForm.markAllAsTouched();
    }else{
      console.log(this.singinForm.value)
      this.singinForm.reset(); //Borra el contenido de los inputs
    }
  }
  campoEsValido( campo:string){
    return this.singinForm.controls[campo].errors && this.singinForm.controls[campo].touched;
  }


}
