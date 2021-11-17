export interface Oferta {
    id?:         number;
    title:      string;
    desc:       string;
    empresa:    string;
    email:      string;
    creado_por: number | undefined;
    categoria:  number;
    fecha?:      Date;
    img: string,
    salario_min: number,
    salario_max: number,
    tipo_jornada: number,
}