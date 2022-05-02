export interface DatosClinicos {
    id?:                  number;
    have_enfermedades:   boolean;
    enfermedades?:        string;
    tratamiento_actual?:  string;
    medicacion?:          null;
    otros?:               null;
    have_alergias:       boolean;
    alergias?:            string;
    alergias_medicacion?: string;
    createdAt?:           Date;
    updatedAt?:           Date;
    user_id:             number;
}
