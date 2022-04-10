import { Component, OnInit } from '@angular/core';
import validar from '../../../../utils/validaciones'
@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss']
})
export class RegisterComponent implements OnInit {


  errores:any[] = [];

  nombre!:string;
  apellidos!:string;
  email!:string;
  cpostal!:number;
  telefono!:number;
  password!:string;
  password2!:string;

  lengthTel:number = 11;
  lengthCpos:number = 5;
  constructor() {
    
  }

  ngOnInit(): void {
  }

  //TODO Validaciones
  validarNombre(){
    console.log(this.nombre)
    if(this.nombre != "" && this.nombre != null){
      if(this.nombre.split(" ").length > 1){
        return [false,"El nombre esta mal escrito"]
      }else{
        this.nombre = validar.mayusFirstChar(this.nombre)
        return[true]
      }
    }else{
      return [false,"No has introducido el nombre"]
    }
  }

  validaEmail(){
    if(this.email !=  null){
      if(validar.validarEmail(this.email)){
        return [true]
      }else{
        return [false,"El email no esta bien escrito"]
      }
     
    }else{
      return [false,"No has escrito el email"];
    }
  }
  validarNumero(){
    if(this.telefono != null){
       if(this.telefono.toString().length < 9){
          return [false,"El telefono no esta bien escrito"]
       }else{
         return [true]
       }
    }else{
      return [false,"No has introducido el teléfono"]
    }
   
  }
  validarCodigoPostal(){
    if(this.cpostal != null){
       if(this.cpostal.toString().length < 5){
          return [false,"El codigo postal no esta bien escrito"]
       }else{
         return [true]
       }
    }else{
      return [false,"No has introducido el codigo postal"]
    }
   
  }
  validarContrasenas(){
    
    if(this.password ==  '' && this.password2 ==  ''){
      return [false, "No has escrito las contraseñas"]
    }

    if(this.password == ''){
      return [false, "No has escrito la primera contraseña"]
    }
    if(this.password2 == ''){
      return [false, "No has escrito la segunda contraseña"]
    }

    if(this.password != this.password2){
      return [false, "Las contraseñas no coinciden"]
    }else{
      return [true]
    }
  }

  validarApellidos(){
    if(this.apellidos != '' && this.apellidos.split(" ").length == 2){
      let resul = validar.validarApellidos(this.apellidos);
      this.apellidos = resul[0] + " " + resul[1]
    }else{
      this.errores.push("Error en los apellidos")
    }
  }

  //TODO Dar al boton enviar
  register(){
    this.errores = [];

    if(!this.validarNombre()[0]){
      this.errores.push(this.validarNombre()[1])
    }

    if(this.apellidos !=  null && this.apellidos.split(" ").length == 2){
        let resul = validar.validarApellidos(this.apellidos);
        this.apellidos = resul[0] + " " + resul[1]
      }else{
        this.errores.push("Error en los apellidos")
    }

    if(!this.validaEmail()[0]){
      this.errores.push(this.validaEmail()[1])
    }

    if(!this.validarNumero()[0]){
      this.errores.push(this.validarNumero()[1])
    }

    if(!this.validarContrasenas()[0]){
      this.errores.push(this.validarContrasenas()[1])
    }

    if(!this.validarCodigoPostal()[0]){
      this.errores.push(this.validarCodigoPostal()[1])
    }

    if(this.errores.length == 0){
      let resul = {
        nombre:this.nombre,
        apellidos:this.apellidos,
        email:this.email,
        telefono:this.telefono,
        cpostal:this.cpostal
      }
      console.log(resul)
    }else{
      console.log("Error en los datos")
    }
    

  }

}
