import { Pipe, PipeTransform } from '@angular/core';
import { Foro } from '../interfaces/Foro.interface';

@Pipe({
  name: 'paginacionForo'
})
export class PaginacionForoPipe implements PipeTransform {

  transform(foros : Foro[], page: number = 0, toBuscar : string = ''): Foro[] {
    
    
    if(toBuscar.length === 0)
    return foros.slice( page, page + 4 )

    const filter = foros.filter( o =>{
      const title = o.title.toLowerCase()
      const buscar = toBuscar.toLowerCase()
      return title.includes( buscar )
    })

    return filter.slice( page, page + 4 )
  }

}
