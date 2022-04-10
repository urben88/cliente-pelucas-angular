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
    }
}