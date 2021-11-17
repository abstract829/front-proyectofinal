import { Oferta } from './Oferta.interface';
export interface OfertasResponse {
    ok: boolean,
    msg: string,
    ofertas?: Oferta[]
}
