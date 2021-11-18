import { Comentario } from './Comentario.interface';
export interface ComentarioResponse{
    ok:boolean,
    msg:string,
    comentarios: Comentario[]
}