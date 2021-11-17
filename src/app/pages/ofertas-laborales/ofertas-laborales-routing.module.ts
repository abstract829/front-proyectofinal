import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { MainComponent } from '../main/main.component';
import { OfertaInfoComponent } from './oferta-info/oferta-info.component';
import { PrincipalComponent } from './principal/principal.component';
import { AddOfertaComponent } from './add-oferta/add-oferta.component';

const routes: Routes = [
  {
    path:'',
    component: MainComponent,
    children:[
      {path: 'busqueda', component: PrincipalComponent},
      {path: 'info/:id', component: OfertaInfoComponent},
      {path: 'agregar', component: AddOfertaComponent},
      {path: '**', redirectTo: 'busqueda'}
    ]
  }
  
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class OfertasLaboralesRoutingModule { }
