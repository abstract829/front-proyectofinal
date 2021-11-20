import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, CanLoad, Route, RouterStateSnapshot, UrlSegment, UrlTree, Router } from '@angular/router';
import { Observable } from 'rxjs';
import { AuthService } from '../services/auth.service';

@Injectable({
  providedIn: 'root'
})
export class Notuser2Guard implements CanActivate {
  get user(){
    return this.authService.user
  }
  constructor(private authService : AuthService,
              private router : Router){}
  canActivate():boolean {
    if(this.user.tipo_user != 2){
      return true
    }else{
      this.router.navigateByUrl('/foro/busqueda')
      return false
    }
  }
  canLoad():boolean {
    if(this.user.tipo_user != 2){
      return true
    }else{
      this.router.navigateByUrl('/foro/busqueda')
      return false
    }
  }
  
}
