import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { MiperfilComponent } from './miperfil/miperfil.component';
import { MainComponent } from '../main/main.component';

const routes: Routes = [
  {
    path:'',
    component: MainComponent,
    children:[
      {path:'miperfil', component:MiperfilComponent},
      {path:'**', redirectTo : 'miperfil'}
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class PerfilRoutingModule { }
