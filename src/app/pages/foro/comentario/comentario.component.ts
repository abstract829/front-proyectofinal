import { Component, Input, OnInit } from '@angular/core';
import { Usuario } from 'src/app/interfaces/Usuario.interface';
import { Comentario } from '../../../interfaces/Comentario.interface';
import { AuthService } from '../../../services/auth.service';
import { ForoService } from '../../../services/foro.service';

@Component({
  selector: 'app-comentario',
  templateUrl: './comentario.component.html',
  styleUrls: ['./comentario.component.scss']
})
export class ComentarioComponent implements OnInit {
  @Input() comentario !: Comentario
  user !: Usuario
  get logedUser(){
    return this.authService.user
  }
  constructor(private authService: AuthService,
              private foroService: ForoService) { }

  ngOnInit(): void {
    this.authService.getUserById(this.comentario.iduser).subscribe((resp:any) => {
      this.user = resp.user
    })
  }
  delComentario(){
    console.log(this.comentario)
    this.foroService.delComentario(this.comentario).subscribe((resp:any) => {
      if(resp.ok){
        window.location.reload()
      }
    })
  }
}
