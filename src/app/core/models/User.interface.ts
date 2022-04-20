export interface User {
    id?:        number;
    nombre:    string;
    apellidos: string;
    telefono:  string;
    cpostal:   string;
    email:     string;
    password?:  string;
    rol?:       Rol[];
    createdAt?: Date;
    updatedAt?: Date;
}
export interface Rol {
    id:        number;
    role:      string;
    createdAt: Date;
    updatedAt: Date;
    user_role: UserRole;
}

export interface UserRole {
    createdAt: Date;
    updatedAt: Date;
    role_id:   number;
    user_id:   number;
}
