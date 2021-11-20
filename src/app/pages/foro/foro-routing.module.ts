import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { MainComponent } from '../main/main.component';
import { PrincipalComponent } from './principal/principal.component';
import { ForoInfoComponent } from './foro-info/foro-info.component';
import { AddForoComponent } from './add-foro/add-foro.component';
import { Notuser2Guard } from '../../guards/notuser2.guard';

const routes: Routes = [
  {
    path:'',
    component: MainComponent,
    children:[
      {
        path: 'busqueda', component: PrincipalComponent
      },
      {
        path: 'info/:id', component: ForoInfoComponent
      },
      {
        path: 'agregar', component: AddForoComponent, 
        canActivate: [Notuser2Guard], canLoad: [Notuser2Guard]
      },
      {
        path: '**', redirectTo: 'busqueda'
      }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ForoRoutingModule { }
