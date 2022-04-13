import {User} from "./User.interface"

//? Cuando te registras singup
export interface Singup{
    user:  User;
    token: string;
}

export interface AtedAt {
    fn:   string;
    args: any[];
}

//? Cuando te logueas singin
export interface Singin {
    user:  User;
    token: string;
}

export interface Login{
    email:string,
    password:string
}