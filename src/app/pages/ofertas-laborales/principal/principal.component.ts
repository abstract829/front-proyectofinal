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
  
  ofertas : Oferta[] = []
  toBuscar : string = ''
  min : number = 0
  max : number = 9999999
  page : number = 0
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
