export interface Solicitud {
    id?:               number;
    aceptado:         boolean;
    createdAt?:        Date;
    updatedAt?:        Date;
    user_id:          number;
    cheques_regaloId: number|null;
    centrosId:        number;
    cabello:          Cabello|null;
    protesis:         Protesis|null;
    textil:           Textil|null;
    cheque_regalo:    ChequeRegalo|null;
}

export interface Cabello {
    id?:          number;
    forma:       string;
    color:       string;
    longitud:    string;
    createdAt?:   Date;
    updatedAt?:   Date;
    solicitudId: number;
}
export interface Protesis {
    id?:          number;
    forma:       string;
    color:       string;
    longitud:    string;
    createdAt?:   Date;
    updatedAt?:   Date;
    solicitudId: number;
}

export interface ChequeRegalo {
    id?:          number;
    servicio:    string;
    descripcion: string;
    tipo:        string;
    createdAt?:   Date;
    updatedAt?:   Date;
}

export interface Textil {
    id?:          number;
    color:       string;
    createdAt?:   Date;
    updatedAt?:   Date;
    solicitudId: number;
}
