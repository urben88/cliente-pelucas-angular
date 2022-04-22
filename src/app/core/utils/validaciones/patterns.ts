export default{
   email:/^[^@]+@[^@]+\.[a-zA-Z]{2,}$/ ,
   apellidos:/^[a-zA-ZñÑáéíóúÁÉÍÓÚüÜ]{2,25}[ ]{1}[a-zA-ZñÑáéíóúÁÉÍÓÚüÜ]{2,25}$/,
   telefono:/^\d{9}$/,
   cpostal: /^\d{5}$/
}