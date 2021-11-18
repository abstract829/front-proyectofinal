import { Foro } from './Foro.interface';
export interface ForoResponse{
    ok:boolean,
    msg:string,
    foros: Foro[]
}