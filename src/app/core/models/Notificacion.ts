export interface Notificacion{
    id?:    number,
    mensaje:    string,
    tipo:       string,
    user_id:    number,
    header:     string,
    createdAt?: Date,
    updatedAt?: Date,
}