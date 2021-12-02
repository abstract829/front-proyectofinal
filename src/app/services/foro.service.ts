import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { ForoResponse } from '../interfaces/ForoResponse.interface';
import { Observable } from 'rxjs';
import { ComentarioResponse } from '../interfaces/ComentarioResponse.interface';
import { Comentario } from '../interfaces/Comentario.interface';
import { Foro } from '../interfaces/Foro.interface';

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
  addComentario(send: any){
    return this.http.post(`${this.url}/foro/addcomentario/`, send)
  }
  delComentario(id:number){
    return this.http.delete(`${this.url}/foro/delcomentario/${id}`)
  }
  addForo(foro : Foro){
    return this.http.post(`${this.url}/foro/addforo/`, foro)
  }
  delForo(id: number){
    return this.http.delete(`${this.url}/foro/delforo/${id}`)
  }
  addLike(iduser:number,idcomentario:number){
    return this.http.post(`${this.url}/foro/addlike`, {iduser,idcomentario})
  }
  getLikes(id:number){
    return this.http.get(`${this.url}/foro/likes/${id}`)

  }
}
