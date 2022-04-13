export interface User {
    id?:        number;
    nombre:    string;
    apellidos: string;
    telefono:  string;
    cpostal:   string;
    email:     string;
    password:  string;
    rol:       string;
    createdAt?: Date;
    updatedAt?: Date;
}