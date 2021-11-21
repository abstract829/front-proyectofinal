import { Pipe, PipeTransform } from '@angular/core';
import { Oferta } from '../interfaces/Oferta.interface';

@Pipe({
  name: 'paginacionOfertas'
})
export class PaginacionOfertasPipe implements PipeTransform {

  transform(ofertas : Oferta[], page: number = 0, toBuscar : string = ''): Oferta[] {
    
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
