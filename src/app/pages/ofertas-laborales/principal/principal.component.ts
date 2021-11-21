import { Component, OnChanges, OnInit } from '@angular/core';
import { Oferta } from 'src/app/interfaces/Oferta.interface';
import { OfertasService } from 'src/app/services/ofertas.service';
import { AuthService } from '../../../services/auth.service';
@Component({
  selector: 'app-principal',
  templateUrl: './principal.component.html',
  styleUrls: ['./principal.component.scss']
})
export class PrincipalComponent implements OnInit{
  get partTime(){
    return this.ofertasService.partTime
  }
  get fullTime(){
    return this.ofertasService.fullTime
  }
  get horas(){
    return this.ofertasService.horas
  }
  ofertas : Oferta[] = []
  get ofertass(){
    const filtro = this.ofertas.filter( o => (Number(o.salario_min) >= Number(this.min)) )
    const filtro2 =  filtro.filter( o=> (o.tipo_jornada == 1 && this.fullTime || o.tipo_jornada == 2 && this.partTime || o.tipo_jornada == 3 && this.horas))
    return filtro2.filter( o => o.categoria == this.categorias)
  }

  toBuscar : string = ''
  min : number = 0
  page : number = 0
  categoria: number = 1
  get categorias(){
    return this.categoria
  }
  get user(){
    return this.as.user
  }
  constructor(private ofertasService : OfertasService,
              private as: AuthService) { }
  
  ngOnInit(): void {
    this.ofertasService.getOfertas().subscribe( resp => {
      this.ofertas = resp.ofertas!
      })
  }
  toggleJornada(id:number){
    this.ofertasService.toggleJornada(id)
  }
  nextPage(){
    if(this.page + 4 > this.ofertas.length) {
      return
    }
    this.page += 4
  }
  backPage(){
    if(this.page > 0){
      this.page -= 4
    }
  }

}
