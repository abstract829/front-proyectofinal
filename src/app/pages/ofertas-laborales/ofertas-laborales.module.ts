import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { OfertasLaboralesRoutingModule } from './ofertas-laborales-routing.module';
import { MainComponent } from '../main/main.component';
import { SharedModule } from '../../shared/shared.module';
import { OfertaComponent } from './oferta/oferta.component';
import { OfertaInfoComponent } from './oferta-info/oferta-info.component';
import { PrincipalComponent } from './principal/principal.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { AddOfertaComponent } from './add-oferta/add-oferta.component';
import { PaginacionOfertasPipe } from '../../pipes/paginacion-ofertas.pipe';


@NgModule({
  declarations: [
    MainComponent,
    OfertaComponent,
    OfertaInfoComponent,
    PrincipalComponent,
    AddOfertaComponent,
    PaginacionOfertasPipe
  ],
  imports: [
    CommonModule,
    OfertasLaboralesRoutingModule,
    SharedModule,
    FormsModule,
    ReactiveFormsModule
  ]
})
export class OfertasLaboralesModule { }
