import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { MainComponent } from '../main/main.component';
import { PrincipalComponent } from './principal/principal.component';
import { ForoInfoComponent } from './foro-info/foro-info.component';

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
