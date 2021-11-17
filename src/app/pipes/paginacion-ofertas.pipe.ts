import { Pipe, PipeTransform } from '@angular/core';
import { Oferta } from '../interfaces/Oferta.interface';

@Pipe({
  name: 'paginacionOfertas'
})
export class PaginacionOfertasPipe implements PipeTransform {

  transform(ofertass : Oferta[], page: number = 0, toBuscar : string = '', min : number = 0, max : number = 999999): Oferta[] {
    
    const ofertas = ofertass.filter( o => (Number(o.salario_max) <= max && Number(o.salario_min) >= min) )
    if(toBuscar.length === 0)
    return ofertas.slice( page, page + 4 )

    const filter = ofertas.filter( o =>{
      const title = o.title.toLowerCase()
      const buscar = toBuscar.toLowerCase()
      return title.includes( buscar )
    })

    return filter.slice( page, page + 4 )
  }

}
