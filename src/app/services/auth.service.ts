import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/internal/Observable';
import { environment } from '../../environments/environment';
import { AuthResponse } from '../interfaces/AuthResponse.interface';
import { Usuario } from '../interfaces/Usuario.interface';
import { catchError, map } from 'rxjs/operators'
import { of } from 'rxjs';
@Injectable({
  providedIn: 'root'
})
export class AuthService {
  url = environment.url
  user !: Usuario
  token !: string
  constructor(private http : HttpClient) { }
  crearUsuario(user: Usuario){
    return this.http.post(`${this.url}/auth/crear`, user)
  }
  verifyEmail(email : string): Observable<AuthResponse>{
    return this.http.post<AuthResponse>(`${this.url}/auth/verifyUser`, {email})
  }
  editarUsuario(user: Usuario){
    return this.http.post(`${this.url}/auth/editar`, user)
  }
  renovarToken():any{
    const headers = new HttpHeaders()
    .set('x-token', localStorage.getItem('token')!)
    

    return this.http.get(`${this.url}/auth/renew`, {headers})
    .pipe(
      map((resp: any) =>{
        this.user = resp.user
        return resp.ok
      }),
      catchError( err => of(false))
    )
  }
}
