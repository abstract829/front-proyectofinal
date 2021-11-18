import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ForoRoutingModule } from './foro-routing.module';
import { PrincipalComponent } from './principal/principal.component';
import { ForoComponent } from './foro/foro.component';
import { ForoInfoComponent } from './foro-info/foro-info.component';
import { ComentarioComponent } from './comentario/comentario.component';


@NgModule({
  declarations: [
    PrincipalComponent,
    ForoComponent,
    ForoInfoComponent,
    ComentarioComponent
  ],
  imports: [
    CommonModule,
    ForoRoutingModule
  ]
})
export class ForoModule { }
