import { Injectable } from '@angular/core';
import { CanActivate, CanLoad, Router} from '@angular/router';
import { Observable } from 'rxjs';
import { tap } from 'rxjs/operators';
import { AuthService } from '../services/auth.service';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate, CanLoad {
  constructor(private auth: AuthService, private router: Router){}
  canActivate(): Observable<boolean> |  boolean  {
    return this.auth.renovarToken()
      .pipe(
        tap( valid =>{
          if(!valid){
            this.router.navigateByUrl('/auth')
          }
        })
      )
  }
  canLoad(): Observable<boolean> |  boolean  {
    return this.auth.renovarToken()
    .pipe(
      tap( valid =>{
        if(!valid){
          this.router.navigateByUrl('/auth')
        }
      })
    )
}
  
}
