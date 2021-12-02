import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { OfertasResponse } from '../interfaces/OfertasResponse.interface';
import { environment } from 'src/environments/environment';
import { Observable } from 'rxjs';
import { Oferta } from '../interfaces/Oferta.interface';

@Injectable({
  providedIn: 'root'
})
export class OfertasService {
  url = environment.url
  partTime : boolean = true
  fullTime : boolean = true
  horas: boolean = true
  constructor(private http: HttpClient) { }

  getOfertas(): Observable<OfertasResponse>{
    return this.http.get<OfertasResponse>(`${this.url}/ofertas/get`)
  }

  getOfertaById(id:number): Observable<OfertasResponse>{
    return this.http.get<OfertasResponse>(`${this.url}/ofertas/byid/${id}`)
  }

  addOferta(oferta: Oferta){
    return this.http.post(`${this.url}/ofertas/agregar`, oferta)
  }
  delOferta(id:number){
    return this.http.delete(`${this.url}/ofertas/eliminar/${ id }`)
  }

  toggleJornada(id:number){
    if(id == 1) this.partTime = !this.partTime
    if(id == 2) this.fullTime = !this.fullTime
    if(id == 3) this.horas = !this.horas

  }
}
