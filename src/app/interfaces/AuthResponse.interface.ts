import { Usuario } from './Usuario.interface';
export interface AuthResponse{
    ok:boolean,
    msg:string,
    user?: Usuario,
    token?:string
}