import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuthGuard } from './guards/auth.guard';

const routes: Routes = [
  {
    path:'auth',
    loadChildren: () => import('./auth/auth.module').then( m => m.AuthModule )
  },
  {
    path:'ofertas',
    loadChildren: () => import('./pages/ofertas-laborales/ofertas-laborales.module').then( m => m.OfertasLaboralesModule ),
    canLoad: [AuthGuard], canActivate: [AuthGuard]
  },
  {
    path:'foro',
    loadChildren: () => import('./pages/foro/foro.module').then( m => m.ForoModule ),
    canLoad: [AuthGuard], canActivate: [AuthGuard]
  },
  {
    path:'perfil',
    loadChildren: () => import('./pages/perfil/perfil.module').then( m => m.PerfilModule ),
    canLoad: [AuthGuard], canActivate: [AuthGuard]
  }
  ,
  {
    path: '**',
    redirectTo: 'auth'
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
