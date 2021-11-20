import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ForoRoutingModule } from './foro-routing.module';
import { PrincipalComponent } from './principal/principal.component';
import { ForoComponent } from './foro/foro.component';
import { ForoInfoComponent } from './foro-info/foro-info.component';
import { ComentarioComponent } from './comentario/comentario.component';
import { AddForoComponent } from './add-foro/add-foro.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { PaginacionForoPipe } from '../../pipes/paginacion-foro.pipe';


@NgModule({
  declarations: [
    PrincipalComponent,
    ForoComponent,
    ForoInfoComponent,
    ComentarioComponent,
    AddForoComponent,
    PaginacionForoPipe
  ],
  imports: [
    CommonModule,
    ForoRoutingModule,
    FormsModule,
    ReactiveFormsModule
  ]
})
export class ForoModule { }
