import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { ForoResponse } from '../interfaces/ForoResponse.interface';
import { Observable } from 'rxjs';
import { ComentarioResponse } from '../interfaces/ComentarioResponse.interface';

@Injectable({
  providedIn: 'root'
})
export class ForoService {
  url = environment.url

  constructor(private http: HttpClient) { }

  getForos():Observable<ForoResponse>{
    return this.http.get<ForoResponse>(`${this.url}/foro/get`)
  }
  getForoById(id:number){
    return this.http.get(`${this.url}/foro/get/${id}`)
  }
  getComentariosByForoId(id:number): Observable<ComentarioResponse>{
    return this.http.get<ComentarioResponse>(`${this.url}/foro/getcomentarios/${id}`)
  }
}
