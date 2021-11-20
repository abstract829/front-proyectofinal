import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, CanLoad, Route, Router, RouterStateSnapshot, UrlSegment, UrlTree } from '@angular/router';
import { Observable } from 'rxjs';
import { AuthService } from '../services/auth.service';

@Injectable({
  providedIn: 'root'
})
export class User2Guard implements CanActivate, CanLoad {
  get user(){
    return this.authService.user
  }
  constructor(private authService : AuthService,
    private router : Router){}
  canActivate():boolean {
    if(this.user.tipo_user == 2){
      return true
    }else{
      this.router.navigateByUrl('/ofertas/busqueda')
      return false
    }
  }
  canLoad():boolean {
    if(this.user.tipo_user == 2){
      return true
    }else{
      this.router.navigateByUrl('/ofertas/busqueda')
      return false
    }
  }
}
