export interface Foro{
    id?: number,
    title: string,
    desc: string,
    creado_por: number | undefined,
    fecha?:Date,
}