import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { PerfilRoutingModule } from './perfil-routing.module';
import { MiperfilComponent } from './miperfil/miperfil.component';
import { ReactiveFormsModule } from '@angular/forms';


@NgModule({
  declarations: [
    MiperfilComponent
  ],
  imports: [
    CommonModule,
    PerfilRoutingModule,
    ReactiveFormsModule
  ]
})
export class PerfilModule { }
