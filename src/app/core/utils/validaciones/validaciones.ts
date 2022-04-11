import { AbstractControl, ValidationErrors } from "@angular/forms";

export default{
    validarEmail(valor:any) {
        if (/^([a-zA-Z0-9_\.\-])+\@(([a-zA-Z0-9\-])+\.)+([a-zA-Z0-9]{2,4})+$/.test(valor)){
         return true;
        } else {
         return false;
        }
    },
    mayusFirstChar(palabra:string){
        return palabra.charAt(0).toUpperCase() + palabra.slice(1);
    },
    validarApellidos(apellidos:string){
        apellidos.trim();
        let separados = apellidos.split(' ');
        let primero = this.mayusFirstChar(separados[0]);
        let segundo = this.mayusFirstChar(separados[1]);
        return [primero,segundo];
    },

    //? Para que las contraseñas sean iguales
    camposIguales(campo1:string,campo2:string){
        return (formGroup: AbstractControl): ValidationErrors|null =>{
            const pass1 = formGroup.get(campo1)?.value;
            const pass2 = formGroup.get(campo2)?.value;

            if( pass1 !== pass2){
                //? Para pasarle el error directamente al campo 
                formGroup.get(campo2)?.setErrors({ noIguales: true})
                return { noIguales: true}
            }
            formGroup.get(campo2)?.setErrors(null)
            return null ;
        }
    }
}